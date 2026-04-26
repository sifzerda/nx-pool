"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";

export default function Pool() {
  const sceneRef = useRef(null);

  useEffect(() => {
    const {
      Engine,
      Render,
      Runner,
      World,
      Bodies,
      Body,
      Vector,
      Events,
      Mouse,
    } = Matter;

    const engine = Engine.create();
    engine.gravity.y = 0;
    const world = engine.world;

    const container = sceneRef.current;
    if (!container) return;

    let render;
    let runner;

    let cueBall;
    let balls = [];

    let aiming = false;
    let aimVector = { x: 0, y: 0 };
    let power = 0;
    const maxPower = 0.05;

    let stick = { x: 0, y: 0, angle: 0 };

    const ballRadius = 14;

    const createScene = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      // cleanup
      World.clear(world);
      Engine.clear(engine);

      render = Render.create({
        element: container,
        engine,
        options: {
          width,
          height,
          wireframes: false,
          background: "transparent",
        },
      });

      Render.run(render);
      runner = Runner.create();
      Runner.run(runner, engine);

      // boundaries
      const t = 60;
      const boundaries = [
        Bodies.rectangle(width / 2, -t / 2, width, t, { isStatic: true }),
        Bodies.rectangle(width / 2, height + t / 2, width, t, { isStatic: true }),
        Bodies.rectangle(-t / 2, height / 2, t, height, { isStatic: true }),
        Bodies.rectangle(width + t / 2, height / 2, t, height, { isStatic: true }),
      ];
      World.add(world, boundaries);

      // cue ball
      cueBall = Bodies.circle(width * 0.25, height / 2, ballRadius, {
        restitution: 0.95,
        friction: 0.002,
        frictionAir: 0.005,
        render: { fillStyle: "#ffffff" },
      });

      World.add(world, cueBall);

      // rack
      balls = [];
      const startX = width * 0.7;
      const startY = height / 2;
      const r = ballRadius;

      for (let row = 0; row < 5; row++) {
        for (let col = 0; col <= row; col++) {
          const x = startX + row * (r * 2 + 0.5);
          const y = startY + col * (r * 2 + 0.5) - row * r;

          const b = Bodies.circle(x, y, r, {
            restitution: 0.98,
            friction: 0.01,
            frictionAir: 0.02,
            render: {
              fillStyle: `hsl(${Math.random() * 360},70%,60%)`,
            },
          });

          balls.push(b);
        }
      }

      World.add(world, balls);

      // pockets
      const pockets = [
        { x: 0, y: 0 },
        { x: width / 2, y: 0 },
        { x: width, y: 0 },
        { x: 0, y: height },
        { x: width / 2, y: height },
        { x: width, y: height },
      ];

      // mouse
      const mouse = Mouse.create(render.canvas);

      render.canvas.addEventListener("mousedown", (e) => {
        const rect = render.canvas.getBoundingClientRect();
        const mousePos = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };

        const dist = Vector.magnitude(
          Vector.sub(cueBall.position, mousePos)
        );

        if (dist < 60) aiming = true;
      });

      render.canvas.addEventListener("mousemove", (e) => {
        if (!aiming) return;

        const rect = render.canvas.getBoundingClientRect();
        const mousePos = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };

        const dir = Vector.sub(cueBall.position, mousePos);
        const norm = Vector.normalise(dir);

        aimVector = norm;
        power = Math.min(Vector.magnitude(dir) * 0.0012, maxPower);

        stick.x = cueBall.position.x - norm.x * 80;
        stick.y = cueBall.position.y - norm.y * 80;
        stick.angle = Math.atan2(norm.y, norm.x);
      });

      render.canvas.addEventListener("mouseup", () => {
        if (!aiming) return;

        Body.applyForce(cueBall, cueBall.position, {
          x: aimVector.x * power,
          y: aimVector.y * power,
        });

        aiming = false;
        power = 0;
      });

      // pocket detection
      Events.on(engine, "beforeUpdate", () => {
        // --- 1. Pocket detection (your existing logic)
        for (let i = balls.length - 1; i >= 0; i--) {
          const b = balls[i];

          for (const p of pockets) {
            const d = Vector.magnitude(
              Vector.sub(b.position, p)
            );

            if (d < 30) {
              World.remove(world, b);
              balls.splice(i, 1);
              break;
            }
          }
        }

        // --- 2. NEW: Natural roll-out physics
        const allBalls = [cueBall, ...balls];

        allBalls.forEach((b) => {
          const speed = Math.sqrt(
            b.velocity.x * b.velocity.x +
            b.velocity.y * b.velocity.y
          );

          // Dynamic damping
          if (speed > 3) {
            b.frictionAir = 0.01;
          } else if (speed > 1) {
            b.frictionAir = 0.006;
          } else {
            b.frictionAir = 0.002;
          }

          // Smooth stop (no jitter)
          if (speed < 0.05) {
            Body.setVelocity(b, { x: 0, y: 0 });
          }
        });
      });

      // draw cue + power bar
      Events.on(render, "afterRender", () => {
        const ctx = render.context;

        // cue
        if (aiming) {
          ctx.save();
          ctx.translate(stick.x, stick.y);
          ctx.rotate(stick.angle);
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(-120 / 2, -2, 120, 4);
          ctx.restore();
        }

        // power bar
        if (aiming) {
          const barWidth = 140;
          const barHeight = 10;

          ctx.save();
          ctx.fillStyle = "rgba(255,255,255,0.1)";
          ctx.fillRect(20, 20, barWidth, barHeight);

          ctx.fillStyle = "#22d3ee";
          ctx.fillRect(
            20,
            20,
            barWidth * (power / maxPower),
            barHeight
          );

          ctx.strokeStyle = "#ffffff";
          ctx.strokeRect(20, 20, barWidth, barHeight);

          ctx.restore();
        }
      });
    };

    createScene();

    // resize handling
    const resizeObserver = new ResizeObserver(() => {
      if (render?.canvas) render.canvas.remove();
      createScene();
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      Render.stop(render);
      Runner.stop(runner);
      World.clear(world);
      Engine.clear(engine);
      if (render?.canvas) render.canvas.remove();
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      className="w-full h-[420px] md:h-[520px] rounded-3xl overflow-hidden"
    />
  );
}