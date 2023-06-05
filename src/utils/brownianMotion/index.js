import * as utils from "./utils";

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
    dot.x = 0;
  } else if (dot.x < 0) {
    dot.x = canvas.width;
  }
  if (dot.y > canvas.height) {
    dot.y = 0;
  } else if (dot.y < 0) {
    dot.y = canvas.height;
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

export const drawBrownianMition = (
  canvas,
  context,
  bacteria = {
    dotColor: "#57BF24",
    dotRadius: 5,
    numDots: 50,
    friction: 0.95,
  },
  glucose = {
    dotColor: "#F9F7A4",
    dotRadius: 3,
    numDots: 20,
    friction: 0.95,
  }
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

  const bacteriaDots = generateDots(
    canvas,
    numDotsBacteria,
    dotRadiusBacteria,
    dotColorBacteria
  );
  const glucoseDots = generateDots(
    canvas,
    numDotsGlucose,
    dotRadiusGlucose,
    dotColorGlucose
  );

  return function drawFrame() {
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);

    bacteriaDots.forEach((dot) =>
      draw(dot, canvas, context, bacteria.friction)
    );
    glucoseDots.forEach((dot) => draw(dot, canvas, context, glucose.friction));
  };
};
