import { easeOutQuint } from "js-easing-functions";
import "./styles.css";

document.getElementById("app").innerHTML = `
  <div class="viewport" id="viewport">
    <div class="layout" id="layout">
      <h1>Titre</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua.</p>
      <p>Ut enim ad minim veniam, quis nostrud 
      exercitation ullamco laboris nisi ut aliquip ex ea 
      commodo consequat. Duis aute irure dolor in reprehenderit 
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
      Excepteur sint occaecat cupidatat non proident, 
      sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
  </div>
`;

const MAX_ANGLE = 25;
const DURATION = 300;

const viewport = document.getElementById("viewport");
const layout = document.getElementById("layout");
const viewportHeight = viewport.offsetHeight;
const viewportWidth = viewport.offsetWidth;
const rect = viewport.getBoundingClientRect();

const duration = DURATION;
const current = { x: 0, y: 0 };
const diff = { x: 0, y: 0 };
const previous = { x: current.x, y: current.y };

const throttledMouseMove = throttle(onMouseMove, DURATION);

let eventPosX;
let eventPosY;

let startTime = 0;

/**
 * throttle function that catches and triggers last invocation
 * use time to see if there is a last invocation
 *
 * @param {*} func
 * @param {*} limit
 */
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function() {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function() {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

/**
 *
 * @param {*} dimension
 * @param {*} position
 */
function getRatio(dimension, position) {
  const divider = dimension / 2;
  return (position - divider) / divider;
}

/**
 *
 * @param {*} dimension
 * @param {*} position
 * @param {*} maxAngle
 */
function getAngle(dimension, position, maxAngle) {
  const ratio = getRatio(dimension, position);
  const angle = ratio * maxAngle;
  return angle;
}

/**
 * Collects informaions for rendering step
 *
 * @param {*} ev
 */
function onMouseMove(ev) {
  startTime = Date.now();

  previous.x = current.x;
  previous.y = current.y;

  eventPosX = ev.clientX;
  eventPosY = ev.clientY;

  current.x = eventPosX - rect.left;
  current.y = eventPosY - rect.top;

  diff.x = current.x - previous.x;
  diff.y = current.y - previous.y;

  render();
}

/**
 *
 */
function render() {
  const elapsed = Date.now() - startTime;

  const previousXangle = getAngle(viewportWidth, previous.x, MAX_ANGLE) * -1;
  const previousYangle = getAngle(viewportHeight, previous.y, MAX_ANGLE);

  const currentXangle = getAngle(viewportWidth, current.x, MAX_ANGLE) * -1;
  const currentYangle = getAngle(viewportHeight, current.y, MAX_ANGLE);

  console.log(
    "render - previousXangle|currentXangle: ",
    previousXangle,
    currentXangle
  );
  console.log(
    "render - previousYangle|currentYangle: ",
    previousYangle,
    currentYangle
  );

  layout.style.transform = `rotateX(${easeOutQuint(
    elapsed,
    previousYangle,
    currentYangle - previousYangle,
    duration
  )}deg) rotateY(${easeOutQuint(
    elapsed,
    previousXangle,
    currentXangle - previousXangle,
    duration
  )}deg) translate(-50%, -50%)`;

  if (elapsed < duration) {
    requestAnimationFrame(render);
  }
}

viewport.addEventListener("mousemove", throttledMouseMove);
