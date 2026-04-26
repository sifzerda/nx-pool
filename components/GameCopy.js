"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";

export default function PoolDemoPage() {
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

const tableWidth = 800;
const tableHeight = 400;
const boundaryThickness = 50;

// Create renderer
const render = Render.create({
  element: sceneRef.current,
  engine: engine,
  options: {
    width: tableWidth,
    height: tableHeight,
    wireframes: false,
    background: '#0c0c0c',
  },
});

Render.run(render);
const runner = Runner.create();
Runner.run(runner, engine);

// Table boundaries
const boundaries = [
  Bodies.rectangle(tableWidth / 2, -boundaryThickness / 2, tableWidth, boundaryThickness, { isStatic: true }),
  Bodies.rectangle(tableWidth / 2, tableHeight + boundaryThickness / 2, tableWidth, boundaryThickness, { isStatic: true }),
  Bodies.rectangle(-boundaryThickness / 2, tableHeight / 2, boundaryThickness, tableHeight, { isStatic: true }),
  Bodies.rectangle(tableWidth + boundaryThickness / 2, tableHeight / 2, boundaryThickness, tableHeight, { isStatic: true }),
];
World.add(world, boundaries);

// Cue ball
const ballRadius = 15;
const ball = Bodies.circle(400, 200, ballRadius, {
  restitution: 0.9,
  friction: 0.01,
  frictionAir: 0.02,
});
World.add(world, ball);

// Cue stick (visual only, not a physics body)
const stickLength = 120;
let stick = { x: 400, y: 200, angle: 0 };

// Mouse interaction
const mouse = Mouse.create(render.canvas);
let isDragging = false;
const maxForce = 0.15;

render.canvas.addEventListener('mousedown', (e) => {
  const rect = render.canvas.getBoundingClientRect();
  const mousePos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  if (Vector.magnitude(Vector.sub(ball.position, mousePos)) < 50) {
    isDragging = true;
  }
});

render.canvas.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const rect = render.canvas.getBoundingClientRect();
    const mousePos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    stick.x = (ball.position.x + mousePos.x) / 2;
    stick.y = (ball.position.y + mousePos.y) / 2;
    stick.angle = Math.atan2(ball.position.y - mousePos.y, ball.position.x - mousePos.x);
  }
});

render.canvas.addEventListener('mouseup', (e) => {
  if (isDragging) {
    const rect = render.canvas.getBoundingClientRect();
    const mousePos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    let forceMagnitude = Vector.magnitude(Vector.sub(ball.position, mousePos)) * 0.002;
    forceMagnitude = Math.min(forceMagnitude, maxForce);
    const forceVec = Vector.mult(Vector.normalise(Vector.sub(ball.position, mousePos)), forceMagnitude);
    Body.applyForce(ball, ball.position, forceVec);
    isDragging = false;
  }
});

// Keep ball inside table
Events.on(engine, 'beforeUpdate', () => {
  const buffer = ballRadius;
  if (ball.position.x < buffer) Body.setPosition(ball, { x: buffer, y: ball.position.y });
  if (ball.position.x > tableWidth - buffer) Body.setPosition(ball, { x: tableWidth - buffer, y: ball.position.y });
  if (ball.position.y < buffer) Body.setPosition(ball, { x: ball.position.x, y: buffer });
  if (ball.position.y > tableHeight - buffer) Body.setPosition(ball, { x: ball.position.x, y: tableHeight - buffer });
});

// Draw cue stick manually
Events.on(render, 'afterRender', () => {
  const ctx = render.context;
  ctx.save();
  ctx.translate(stick.x, stick.y);
  ctx.rotate(stick.angle);
  ctx.fillStyle = '#fff';
  ctx.fillRect(-stickLength / 2, -2.5, stickLength, 5);
  ctx.restore();
});

return () => {
  Render.stop(render);
  Runner.stop(runner);
  World.clear(world, true);
  Engine.clear(engine);
  render.canvas.remove();
};
 
}, []);

return <div ref={sceneRef}></div>;
}
