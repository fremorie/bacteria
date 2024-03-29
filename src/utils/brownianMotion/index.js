import * as utils from "./utils";
import {
  parameters,
  prepareCanvasData,
  derivatives,
  solve,
  initial_state,
  MAX_SPEED,
  feed,
} from "#utils";

function Ball(radius, color) {
  if (radius === undefined) {
    radius = 10;
  }
  if (color === undefined) {
    color = "#ff0000";
  }
  this.x = 0;
  this.y = 0;
  this.radius = radius;
  this.rotation = 0;
  this.scaleX = 1;
  this.scaleY = 1;
  this.color = utils.parseColor(color);
  this.lineWidth = 1;
}

Ball.prototype.draw = function (context) {
  context.save();
  context.translate(this.x, this.y);
  context.rotate(this.rotation);
  context.scale(this.scaleX, this.scaleY);

  context.lineWidth = this.lineWidth;
  context.fillStyle = this.color;
  context.beginPath();
  //x, y, radius, start_angle, end_angle, anti-clockwise
  context.arc(0, 0, this.radius, 0, Math.PI * 2, true);
  context.closePath();
  context.fill();
  if (this.lineWidth > 0) {
    context.stroke();
  }
  context.restore();
};

////// BROWNIAN MOTION ///////

function draw(dot, canvas, context, friction) {
  dot.vx += Math.random() * 0.2 - 0.1;
  dot.vy += Math.random() * 0.2 - 0.1;
  dot.x += dot.vx;
  dot.y += dot.vy;
  dot.vx *= friction;
  dot.vy *= friction;

  if (dot.x > canvas.width) {
    dot.x = canvas.width;
    dot.vx = -dot.vx;
  } else if (dot.x < 0) {
    dot.x = 0;
    dot.vx = -dot.vx;
  }
  if (dot.y > canvas.height) {
    dot.y = canvas.height;
    dot.vy = -dot.vy;
  } else if (dot.y < 0) {
    dot.y = 0;
    dot.vy = -dot.vy;
  }
  dot.draw(context);
}

function generateDots(canvas, numDots, dotRadius, dotColor) {
  const dots = [];

  for (let dot, i = 0; i < numDots; i++) {
    dot = new Ball(dotRadius, dotColor);
    dot.x = Math.random() * canvas.width;
    dot.y = Math.random() * canvas.height;
    dot.vx = 0;
    dot.vy = 0;
    dots.push(dot);
  }

  return dots;
}

function computeScore(X, X0) {
  const score = Math.ceil((X - X0) * 100);
  return Math.max(score, 0);
}

export const drawBrownianMotion = (
  canvas,
  context,
  bacteria = {
    dotColor: "#57BF24",
    dotRadius: 5,
    numDots: 0,
    friction: 0.95,
  },
  glucose = {
    dotColor: "#F9F7A4",
    dotRadius: 3,
    numDots: 0,
    friction: 0.95,
  },
  setOnFeed = () => {},
  setSpeed = () => {},
  setBacteriumCount = (_x) => {},
  setAnimationKey = (_key) => {},
  initialState = initial_state
) => {
  const {
    numDots: numDotsBacteria,
    dotRadius: dotRadiusBacteria,
    dotColor: dotColorBacteria,
  } = bacteria;
  const {
    numDots: numDotsGlucose,
    dotRadius: dotRadiusGlucose,
    dotColor: dotColorGlucose,
  } = glucose;

  let bacteriaDots = generateDots(
    canvas,
    numDotsBacteria,
    dotRadiusBacteria,
    dotColorBacteria
  );

  let glucoseDots = generateDots(
    canvas,
    numDotsGlucose,
    dotRadiusGlucose,
    dotColorGlucose
  );

  let reactorState = initialState;
  let canvasState = prepareCanvasData(reactorState);

  let time = new Date().getTime();

  const simulationSpeed = 0.1;

  setOnFeed({
    feed: () => {
      reactorState = feed(reactorState);
    },
  });

  return function drawFrame() {
    const timeDiff = new Date().getTime() - time;
    time = new Date().getTime();

    setAnimationKey(drawFrame, canvas);

    context.clearRect(0, 0, canvas.width, canvas.height);

    const [nextState, speed] = solve(
      1000,
      timeDiff * simulationSpeed * 1e-6,
      reactorState,
      parameters
    );

    setBacteriumCount(computeScore(nextState.X, initial_state.X));

    const arrowsCount = 5;

    function formatSpeed(key) {
      let abs = Math.abs(speed[key]);
      for (let i = 0; i < MAX_SPEED[key].length; ++i) {
        if (abs < MAX_SPEED[key][i]) {
          if (speed[key] > 0) {
            return +i;
          } else {
            return -i;
          }
        }
      }

      if (speed[key] > 0) {
        return MAX_SPEED[key].length;
      } else {
        return -MAX_SPEED[key].length;
      }
    }

    let speed_indicator = {
      X: formatSpeed("X"),
      S: formatSpeed("S"),
      A: formatSpeed("A"),
      DOTa: formatSpeed("DOTa"),
    };

    setSpeed({
      getSpeed: () => speed_indicator,
    });

    reactorState = nextState;
    canvasState = prepareCanvasData(nextState);

    if (canvasState.bacteriaCount > bacteriaDots.length) {
      let newDots = generateDots(
        canvas,
        canvasState.bacteriaCount - bacteriaDots.length,
        dotRadiusBacteria,
        dotColorBacteria
      );

      if (bacteriaDots.length > 0) {
        for (let i = 0; i < newDots.length; ++i) {
          let j = Math.floor(Math.random() * bacteriaDots.length);
          newDots[i].x =
            (2 * Math.random() - 1) * dotRadiusBacteria + bacteriaDots[j].x;
          newDots[i].y =
            (2 * Math.random() - 1) * dotRadiusBacteria + bacteriaDots[j].y;
        }
      }

      bacteriaDots = [...bacteriaDots, ...newDots];
    }

    if (canvasState.bacteriaCount < bacteriaDots.length) {
      const deleteCount = bacteriaDots.length - canvasState.bacteriaCount;
      bacteriaDots.splice(0, deleteCount);
    }

    if (canvasState.glucoseCount > glucoseDots.length) {
      glucoseDots = [
        ...glucoseDots,
        ...generateDots(
          canvas,
          canvasState.glucoseCount - glucoseDots.length,
          dotRadiusGlucose,
          dotColorGlucose
        ),
      ];
    }

    if (canvasState.glucoseCount < glucoseDots.length) {
      const deleteCount = glucoseDots.length - canvasState.glucoseCount;
      glucoseDots.splice(0, deleteCount);
    }

    const [r, g, b] = canvasState.color;

    context.fillStyle = `rgb(${r}, ${g}, ${b})`;
    context.fillRect(0, 0, canvas.width, canvas.height);

    bacteriaDots.forEach((dot) =>
      draw(dot, canvas, context, bacteria.friction)
    );
    glucoseDots.forEach((dot) => draw(dot, canvas, context, glucose.friction));
  };
};
