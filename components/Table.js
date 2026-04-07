import { useEffect } from 'react';
import { Bodies, World } from 'matter-js';

// Pocket positions
const pocketPositions = [
  { x: 119, y: 56 }, // top left 
  { x: 746, y: 50 }, // top middle 
  { x: 1370, y: 60 }, // top right 
  { x: 122, y: 625 }, // bottom left 
  { x: 747, y: 630 }, // bottom middle
  { x: 1370, y: 622 }, // bottom right 
];

function PoolTable({ engine }) {
  useEffect(() => {
    const greenTable = Bodies.rectangle(745, 340, 1295, 590, {
      isStatic: true,
      isSensor: true,
      render: {
        sprite: {
          texture: '/greenTable.png',
          xScale: 1.3,
          yScale: 1.15,
        },
      },
    });

    World.add(engine.world, greenTable);

    // Pool table walls
    const wallThickness = 14;
    const halfWidth = 1500 / 2;
    const halfHeight = 680 / 2;

    const wallConfig = {
      isStatic: true,
      restitution: 1,
      friction: 0,
      render: { visible: false },
    };

    const topWallWidth = halfWidth - 199;
    const topWallLeft = Bodies.rectangle(halfWidth - 317, 62, topWallWidth, wallThickness, wallConfig);
    const topWallRight = Bodies.rectangle(halfWidth + 308, 62, topWallWidth, wallThickness, wallConfig);
    const bottomWallLeft = Bodies.rectangle(halfWidth - 317, 618, topWallWidth, wallThickness, wallConfig);
    const bottomWallRight = Bodies.rectangle(halfWidth + 308, 618, topWallWidth, wallThickness, wallConfig);

    const leftWallHeight = 680 - 180;
    const leftWallXOffset = 257;
    const leftWall = Bodies.rectangle(halfWidth / 2 - leftWallXOffset, halfHeight, wallThickness, leftWallHeight, wallConfig);

    const rightWallHeight = 680 - 180;
    const rightWallXOffset = 998;
    const rightWall = Bodies.rectangle(halfWidth / 2 + rightWallXOffset, halfHeight, wallThickness, rightWallHeight, wallConfig);

    World.add(engine.world, [
      topWallLeft, topWallRight,
      bottomWallLeft, bottomWallRight,
      leftWall,
      rightWall,
    ]);

    // Create pockets
    const pocketRadius = 20;
    const sensorRadius = 10;

    pocketPositions.forEach(pos => {
      const pocket = Bodies.circle(pos.x, pos.y, pocketRadius, {
        label: 'pocket',
        isSensor: true,
        isStatic: true,
        render: { visible: false },
      });

      const pocketSensor = Bodies.circle(pos.x, pos.y, sensorRadius, {
        label: 'pocketSensor',
        isSensor: true,
        isStatic: true,
        render: { visible: false },
      });

      World.add(engine.world, [pocket, pocketSensor]);
    });

    return () => {
      World.remove(engine.world, [
        greenTable,
        topWallLeft, topWallRight,
        bottomWallLeft, bottomWallRight,
        leftWall, rightWall,
      ]);
    };
  }, [engine]);

  return null; // No JSX to render
}

export default PoolTable;