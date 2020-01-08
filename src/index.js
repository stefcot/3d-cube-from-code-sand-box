import "./styles.css";
const tweenFunctions = require("tween-functions");

document.getElementById("app").innerHTML = `
  <div class="viewport" id="viewport">
    <main class="pages" id="pages">
      <section class="page page--home">
        <h1>Home page</h1>
        <p><b>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua.</b></p>
        <p>Ut enim ad minim veniam, quis nostrud 
        exercitation ullamco laboris nisi ut aliquip ex ea 
        commodo consequat.</p>
        <p>Duis aute irure dolor in reprehenderit 
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, 
        sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <ul class="arrows">
          <li id="home_left-btn" class="arrow arrow-left"></li>
          <li id="home_right-btn" class="arrow arrow-right"></li>
        </ul>
      </section>
      <section class="page page--about">
        <h1>About us</h1>
        <p><b>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua.</b></p>
        <p>Duis aute irure dolor in reprehenderit 
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, 
        sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua.</p>
        <p>Ut enim ad minim veniam, quis nostrud 
        exercitation ullamco laboris nisi ut aliquip ex ea 
        commodo consequat.</p>
      </section>
      <section class="page page--links">
        <h1>Links</h1>
        <p><b>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua.</b></p>
        <ul>
          <li>
            <a href="">Lorem ipsum dolor sit amet</a>
          </li>
          <li>
            <a href="">Duis aute irure dolor in reprehenderit</a>
          </li>
          <li>
            <a href="">Ut enim ad minim veniam</a>
          </li>
        </ul>
        <p>Ut enim ad minim veniam, quis nostrud 
        exercitation ullamco laboris nisi ut aliquip ex ea 
        commodo consequat.</p>
      </section>
    </main>
  </div>
`;

const MAX_ANGLE = 30;
const FRICTION = 0.09;

const viewport = document.getElementById("viewport");
const pages = document.getElementById("pages");
const viewportHeight = viewport.offsetHeight;
const viewportWidth = viewport.offsetWidth;
const rect = viewport.getBoundingClientRect();

const position = { x: 0, y: 0 };
const current = { x: 0, y: 0 };

let eventPosX;
let eventPosY;
//let pageAngles = { home: 0, about: 90, product: -90 };
//let angle = 0;

/**
 *
 * @param {*} baseWidth
 * @param {*} position
 */
function getRatio(baseWidth, position) {
  const divider = baseWidth / 2;
  return (position - divider) / divider;
}

/**
 *
 * @param {*} baseWidth
 * @param {*} position
 * @param {*} maxAngle
 */
function getAngle(baseWidth, position, maxAngle) {
  const ratio = getRatio(baseWidth, position);
  return ratio * maxAngle;
}

/**
 * Collects informaions for rendering step
 *
 * @param {*} ev
 */
function onMouseMove(ev) {
  eventPosX = ev.clientX;
  eventPosY = ev.clientY;

  position.x = eventPosX - rect.left;
  position.y = eventPosY - rect.top;
}

/**
 * Supposed to give some friction effect/inertia to the animation
 */
function update() {
  const Xangle = getAngle(viewportWidth, current.x, MAX_ANGLE) * -1;
  const Yangle = getAngle(viewportHeight, current.y, MAX_ANGLE);

  pages.style.transform = `rotateX(${Yangle}deg) rotateY(${Xangle}deg) translate(-50%, -50%)`;
}

/**
 *
 */
function render() {
  requestAnimationFrame(render);

  current.x += parseFloat((position.x - current.x) * FRICTION);
  current.y += parseFloat((position.y - current.y) * FRICTION);

  update();
}

viewport.addEventListener("mousemove", onMouseMove);
document.getElementById("home_left-btn").addEventListener("click", () => {
  tweenFunctions.easeInQuad(1, 0, 50, 5);
  console.log(pages.style.transform);
});

render();
