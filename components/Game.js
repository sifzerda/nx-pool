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
    let ball;
    let boundaries = [];

    const ballRadius = 15;
    const stickLength = 120;

    let stick = { x: 0, y: 0, angle: 0 };
    let isDragging = false;

    const maxForce = 0.15;

    const createScene = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      // Clear previous world
      World.clear(world);
      Engine.clear(engine);

      // Renderer
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

      // Boundaries
      const t = 50;

      boundaries = [
        Bodies.rectangle(width / 2, -t / 2, width, t, { isStatic: true }),
        Bodies.rectangle(width / 2, height + t / 2, width, t, { isStatic: true }),
        Bodies.rectangle(-t / 2, height / 2, t, height, { isStatic: true }),
        Bodies.rectangle(width + t / 2, height / 2, t, height, { isStatic: true }),
      ];

      World.add(world, boundaries);

      // Ball
      ball = Bodies.circle(width / 2, height / 2, ballRadius, {
        restitution: 0.9,
        friction: 0.01,
        frictionAir: 0.02,
      });

      World.add(world, ball);

      stick = { x: width / 2, y: height / 2, angle: 0 };

      // Mouse
      const mouse = Mouse.create(render.canvas);

      render.canvas.addEventListener("mousedown", (e) => {
        const rect = render.canvas.getBoundingClientRect();
        const mousePos = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };

        if (
          Vector.magnitude(Vector.sub(ball.position, mousePos)) < 50
        ) {
          isDragging = true;
        }
      });

      render.canvas.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        const rect = render.canvas.getBoundingClientRect();
        const mousePos = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };

        stick.x = (ball.position.x + mousePos.x) / 2;
        stick.y = (ball.position.y + mousePos.y) / 2;
        stick.angle = Math.atan2(
          ball.position.y - mousePos.y,
          ball.position.x - mousePos.x
        );
      });

      render.canvas.addEventListener("mouseup", (e) => {
        if (!isDragging) return;

        const rect = render.canvas.getBoundingClientRect();
        const mousePos = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };

        let forceMagnitude =
          Vector.magnitude(Vector.sub(ball.position, mousePos)) * 0.002;

        forceMagnitude = Math.min(forceMagnitude, maxForce);

        const forceVec = Vector.mult(
          Vector.normalise(Vector.sub(ball.position, mousePos)),
          forceMagnitude
        );

        Body.applyForce(ball, ball.position, forceVec);
        isDragging = false;
      });

      // Keep inside bounds
      Events.on(engine, "beforeUpdate", () => {
        const buffer = ballRadius;

        if (ball.position.x < buffer)
          Body.setPosition(ball, { x: buffer, y: ball.position.y });

        if (ball.position.x > width - buffer)
          Body.setPosition(ball, {
            x: width - buffer,
            y: ball.position.y,
          });

        if (ball.position.y < buffer)
          Body.setPosition(ball, { x: ball.position.x, y: buffer });

        if (ball.position.y > height - buffer)
          Body.setPosition(ball, {
            x: ball.position.x,
            y: height - buffer,
          });
      });

      // Cue stick render
      Events.on(render, "afterRender", () => {
        const ctx = render.context;
        ctx.save();
        ctx.translate(stick.x, stick.y);
        ctx.rotate(stick.angle);
        ctx.fillStyle = "#fff";
        ctx.fillRect(-stickLength / 2, -2.5, stickLength, 5);
        ctx.restore();
      });
    };

    createScene();

    // Responsive resize
    const resizeObserver = new ResizeObserver(() => {
      if (render) {
        render.canvas.remove();
      }
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