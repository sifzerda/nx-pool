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
    const maxPower = 0.03;

    let stick = { x: 0, y: 0, angle: 0 };

    const ballRadius = 14;

    const rayCircleIntersect = (origin, dir, center, radius) => {
      const oc = Vector.sub(origin, center);
      const a = Vector.dot(dir, dir);
      const b = 2 * Vector.dot(oc, dir);
      const c = Vector.dot(oc, oc) - radius * radius;
      const discriminant = b * b - 4 * a * c;

      if (discriminant < 0) return null;

      const t = (-b - Math.sqrt(discriminant)) / (2 * a);
      if (t > 0) return t;
      return null;
    };

    const createScene = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

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

      const t = 60;
      const boundaries = [
        Bodies.rectangle(width / 2, -t / 2, width, t, { isStatic: true }),
        Bodies.rectangle(width / 2, height + t / 2, width, t, { isStatic: true }),
        Bodies.rectangle(-t / 2, height / 2, t, height, { isStatic: true }),
        Bodies.rectangle(width + t / 2, height / 2, t, height, { isStatic: true }),
      ];
      World.add(world, boundaries);

      cueBall = Bodies.circle(width * 0.25, height / 2, ballRadius, {
        restitution: 0.95,
        friction: 0.002,
        frictionAir: 0.005,
        render: { fillStyle: "#ffffff" },
      });

      World.add(world, cueBall);

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

      Mouse.create(render.canvas);

      render.canvas.addEventListener("mousedown", (e) => {
        const rect = render.canvas.getBoundingClientRect();
        const mousePos = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };

        const dist = Vector.magnitude(Vector.sub(cueBall.position, mousePos));
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

      Events.on(engine, "beforeUpdate", () => {
        for (let i = balls.length - 1; i >= 0; i--) {
          const b = balls[i];
          const speed = Math.hypot(b.velocity.x, b.velocity.y);

          if (speed > 3) b.frictionAir = 0.01;
          else if (speed > 1) b.frictionAir = 0.006;
          else b.frictionAir = 0.002;

          if (speed < 0.05) {
            Body.setVelocity(b, { x: 0, y: 0 });
          }
        }
      });

      Events.on(render, "afterRender", () => {
        const ctx = render.context;
        const w = render.options.width;
        const h = render.options.height;

        if (aiming) {
          ctx.save();
          ctx.translate(stick.x, stick.y);
          ctx.rotate(stick.angle);
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(-120 / 2, -2, 120, 4);
          ctx.restore();

          const barWidth = 140;
          const barHeight = 10;

          ctx.fillStyle = "rgba(255,255,255,0.1)";
          ctx.fillRect(20, 20, barWidth, barHeight);

          ctx.fillStyle = "#22d3ee";
          ctx.fillRect(20, 20, barWidth * (power / maxPower), barHeight);

          ctx.strokeStyle = "#ffffff";
          ctx.strokeRect(20, 20, barWidth, barHeight);

          // 🎯 advanced predictive aiming (ball collision + reflection)
          const start = cueBall.position;
          let dir = aimVector;

          let hitPoint = null;
          let hitBall = null;
          let minT = Infinity;

          // find first ball collision
          for (const b of balls) {
            const t = rayCircleIntersect(start, dir, b.position, ballRadius);
            if (t && t < minT) {
              minT = t;
              hitBall = b;
            }
          }

          ctx.save();
          ctx.beginPath();
          ctx.setLineDash([6, 6]);
          ctx.strokeStyle = "rgba(34,211,238,0.9)";
          ctx.lineWidth = 2;

          const startX = start.x;
          const startY = start.y;

          let firstEndX = startX + dir.x * 800;
          let firstEndY = startY + dir.y * 800;

          if (hitBall) {
            hitPoint = {
              x: start.x + dir.x * minT,
              y: start.y + dir.y * minT,
            };

            ctx.moveTo(startX, startY);
            ctx.lineTo(hitPoint.x, hitPoint.y);

            // reflection
            const normal = Vector.normalise(Vector.sub(hitPoint, hitBall.position));
            let reflect = Vector.sub(dir, Vector.mult(normal, 2 * Vector.dot(dir, normal)));
            reflect = Vector.normalise(reflect);

            const secondEnd = {
              x: hitPoint.x + reflect.x * 500,
              y: hitPoint.y + reflect.y * 500,
            };

            ctx.lineTo(hitPoint.x, hitPoint.y);
            ctx.lineTo(secondEnd.x, secondEnd.y);
          } else {
            ctx.moveTo(startX, startY);
            ctx.lineTo(firstEndX, firstEndY);
          }

          ctx.stroke();
          ctx.restore();
        }
      });
    };

    createScene();

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
