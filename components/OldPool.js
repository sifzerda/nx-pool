import { useState, useEffect, useRef } from 'react';
import Matter, { Engine, Render, World, Bodies, Body, Events } from 'matter-js';

import PoolTable from '../components/Table';
//import stickPic from '../public/poolStick.png';

const initialBalls = [
  { id: 1, suit: 'solid', color: '#F3FF00' },
  { id: 2, suit: 'solid', color: '#00C0FF' },
  { id: 3, suit: 'solid', color: '#FF3854' },
  { id: 4, suit: 'solid', color: '#BD00FF' },
  { id: 5, suit: 'solid', color: '#FFAF00' },
  { id: 6, suit: 'solid', color: '#0EFF00' },
  { id: 7, suit: 'solid', color: '#A98D00' },
  { id: 8, suit: 'neither', color: '#000000' },
  { id: 9, suit: 'stripe', color: '#FFCE00' },
  { id: 10, suit: 'stripe', color: '#001DDA' },
  { id: 11, suit: 'stripe', color: '#D11400' },
  { id: 12, suit: 'stripe', color: '#49007E' },
  { id: 13, suit: 'stripe', color: '#FF6100' },
  { id: 14, suit: 'stripe', color: '#009017' },
  { id: 15, suit: 'stripe', color: '#7B643E' },
];

function OldPool() {
  const [engine] = useState(Engine.create());
  const [cueBall, setCueBall] = useState(null);
  const [cueStick, setCueStick] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [initialMousePosition, setInitialMousePosition] = useState({ x: 0, y: 0 });
  const [pocketedBalls, setPocketedBalls] = useState([]);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [aimLine, setAimLine] = useState(null);

  const gameRef = useRef();
  const initialStickOffset = -399;
  const stickSlideBack = 370;
  const aimLineOffset = 100;

  // Start the game immediately
  const gameStarted = true;

  // TIMER
  useEffect(() => {
    const interval = setInterval(() => setTimer(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // GAME INITIALIZATION
  useEffect(() => {
    engine.world.gravity.y = 0;

    const render = Render.create({
      element: gameRef.current,
      engine,
      options: { width: 1500, height: 680, wireframes: false },
    });
    Render.run(render);
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // CUE BALL
    const cueBallRadius = 15;
    const cueBallX = render.options.width / 4;
    const cueBallY = render.options.height / 2;

    const cueBallBody = Bodies.circle(cueBallX, cueBallY, cueBallRadius, {
      label: 'ball',
      restitution: 0.9,
      friction: 0.005,
      density: 0.01,
      angularDamping: 0.1,
      render: { fillStyle: '#ffffff', strokeStyle: '#000', lineWidth: 2 },
    });
    setCueBall(cueBallBody);
    World.add(engine.world, cueBallBody);

    // OTHER BALLS
    const createBall = (x, y, color, id) =>
      Bodies.circle(x, y, cueBallRadius, {
        label: 'ball',
        restitution: 0.9,
        friction: 0.005,
        density: 0.01,
        angularDamping: 0.1,
        render: { fillStyle: color, strokeStyle: '#000', lineWidth: 2 },
        id,
      });

    const ballSpacing = cueBallRadius * 2 + 2;
    const pyramidBaseX = (render.options.width / 4) * 2.6;
    const pyramidBaseY = render.options.height / 2;
    const balls = [];

    balls.push(createBall(pyramidBaseX, pyramidBaseY, initialBalls[0].color, initialBalls[0].id));

    let currentRow = 1;
    let ballIndex = 1;

    while (ballIndex < initialBalls.length) {
      for (let i = 0; i <= currentRow; i++) {
        const x = pyramidBaseX + currentRow * ballSpacing * Math.cos(Math.PI / 6);
        const y = pyramidBaseY - currentRow * ballSpacing * Math.sin(Math.PI / 6) + i * ballSpacing;
        balls.push(createBall(x, y, initialBalls[ballIndex].color, initialBalls[ballIndex].id));
        ballIndex++;
        if (ballIndex >= initialBalls.length) break;
      }
      currentRow++;
    }

    World.add(engine.world, balls);

    // CUE STICK
    const stickLength = 400;
    const stickThickness = 8;
    const cueStickBody = Bodies.rectangle(
      cueBallX + initialStickOffset,
      cueBallY,
      stickLength,
      stickThickness,
      {
        isStatic: true,
        isSensor: true,
        render: { fillStyle: '#d4a373', strokeStyle: '#8b4513', lineWidth: 2, sprite: { texture: '/poolStick.png', xScale: 0.7, yScale: 0.7 } },
      }
    );
    setCueStick(cueStickBody);
    World.add(engine.world, cueStickBody);

    // BALL COLLISION
    Events.on(engine, 'collisionStart', (event) => {
      event.pairs.forEach(pair => {
        const { bodyA, bodyB } = pair;
        const ball = (bodyA.label === 'ball' && bodyA) || (bodyB.label === 'ball' && bodyB);
        const pocketSensor = (bodyA.label === 'pocketSensor' && bodyA) || (bodyB.label === 'pocketSensor' && bodyB);

        if (ball && pocketSensor) {
          setPocketedBalls(prev => [...prev, ball.id]);
          setScore(prev => prev + 100);
          World.remove(engine.world, ball);
        }
      });
    });

    return () => {
      Render.stop(render);
      World.clear(engine.world);
      Engine.clear(engine);
      Events.off(engine, 'collisionStart');
    };
  }, [engine]);

  // CHECK IF ALL BALLS POCKETED
  useEffect(() => {
    if (pocketedBalls.length === initialBalls.length) {
      console.log('All balls pocketed!');
    }
  }, [pocketedBalls]);

  // STICK DRAGGING
  useEffect(() => {
    if (!cueStick || !cueBall || !isDragging) return;
    const angle = Math.atan2(cueBall.position.y - mousePosition.y, cueBall.position.x - mousePosition.x);
    const stickX = cueBall.position.x - Math.cos(angle) * stickSlideBack;
    const stickY = cueBall.position.y - Math.sin(angle) * stickSlideBack;
    Body.setPosition(cueStick, { x: stickX, y: stickY });
    Body.setAngle(cueStick, angle);
  }, [cueStick, cueBall, isDragging, mousePosition]);

  // MOUSE EVENTS
  const handleMouseDown = (event) => {
    const rect = gameRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setInitialMousePosition({ x, y });
    if (Matter.Bounds.contains(cueBall.bounds, { x, y })) setIsDragging(true);
    setMousePosition({ x, y });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    const dx = initialMousePosition.x - mousePosition.x;
    const dy = initialMousePosition.y - mousePosition.y;
    const power = Math.sqrt(dx * dx + dy * dy) * 0.05;
    const angle = Math.atan2(dy, dx);
    Body.setVelocity(cueBall, { x: power * Math.cos(angle), y: power * Math.sin(angle) });
    setIsDragging(false);
  };

  useEffect(() => {
    const handleMove = (event) => {
      const rect = gameRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setMousePosition({ x, y });

      if (isDragging) {
        const angle = Math.atan2(cueBall.position.y - y, cueBall.position.x - x);
        const offsetX = Math.cos(angle) * aimLineOffset;
        const offsetY = Math.sin(angle) * aimLineOffset;
        setAimLine({ start: cueBall.position, end: { x: cueBall.position.x + offsetX, y: cueBall.position.y + offsetY } });
      } else setAimLine(null);

      if (cueStick) {
        const angle = Math.atan2(cueBall.position.y - y, cueBall.position.x - x);
        Body.setPosition(cueStick, { x: cueBall.position.x + initialStickOffset * Math.cos(angle), y: cueBall.position.y + initialStickOffset * Math.sin(angle) });
        Body.setAngle(cueStick, angle);
      }
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, cueBall, cueStick, mousePosition]);

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  return (
    <div>
      <div className="score-timer-container">
        <div className="timer"><h3>Elapsed Time: {formatTime(timer)}</h3></div>
        <div className="score"><h3>Score: {score}</h3></div>
      </div>

      <div className="pocketed-balls">
        <h3>Pocketed Balls:</h3>
        <div className="pocketed-balls-container">
          {initialBalls.map(ball => {
            const isPocketed = pocketedBalls.includes(ball.id);
            return (
              <div key={ball.id} className="pocketed-ball" style={{
                width: '30px', height: '30px', borderRadius: '50%',
                backgroundColor: isPocketed ? ball.color : '#000',
                margin: '5px', display: 'inline-block', border: '2px solid #000'
              }} />
            );
          })}
        </div>
      </div>

      <div className="game-container" ref={gameRef} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
        <PoolTable engine={engine} />

        {aimLine && (
          <svg className="aim-line">
            <line x1={aimLine.start.x} y1={aimLine.start.y} x2={aimLine.end.x} y2={aimLine.end.y} stroke="green" strokeWidth="2" />
          </svg>
        )}
      </div>
    </div>
  );
}

export default OldPool;