/**
 * throttle function that catches and triggers last invocation
 * use time to see if there is a last invocation
 *
 * @param func
 * @param limit
 * @return {Function}
 */
export function throttle(func, limit) {
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
 * @param func
 * @param wait
 * @param immediate
 * @return {Function}
 */
export function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

/**
 * Was supposed to yield some glory and self esteem from that
 * and only got shit and shame instead
 * @param value
 * @param animationStepNumber
 * @return {*[]}
 */
export function computeAnimationSteps(value, animationStepNumber) {
  let steps = [];

  for (let i = 0; i <= animationStepNumber; i++) {
    const t = i / animationStepNumber;
    // here's the easing function
    const y = t > 0.5 ? 4 * Math.pow(t - 1, 3) + 1 : 4 * Math.pow(t, 3);
    // storing steps
    steps.push({ x: value.x * y, y: value.y * y });
  }
  return steps.reverse();
}
