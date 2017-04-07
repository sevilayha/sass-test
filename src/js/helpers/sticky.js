// stick all the things
const stickyElements = document.querySelectorAll('.stick-this');
stickyElements.forEach(stickTheThing);

// watch for the footer coming into view. unstick everything
document.addEventListener('scroll', debounce(() => {
  if (isInView('#site__footer')) unstickAllAtBottom();
}, 10));

/**
 * Make an element sticky once it hits the top of the browser
 * @param {node} element The element to stick
 */
function stickTheThing(element) {
  const offsetTop = element.dataset.offsetTop;
  wrapTheStickyThing(element);
  document.addEventListener('scroll', debounce(() => {

    watchScrollForStick(element, offsetTop);
  }, 10));
}

/**
 * Wrap the sticky thing so that we can position relatively.
 * @param {node} element The sticky element that we want
 */
function wrapTheStickyThing(element) {
  const offsetLeft  = element.getBoundingClientRect().left;
  const elementHtml = element.innerHTML;

  element.classList.remove('stick-this');
  element.classList.add('stick-this-wrapper');
  element.style.position = 'relative';
  element.innerHTML = `
    <div class="stick-this" style="left: ${offsetLeft}px">
      ${elementHtml}
    </div>
  `;
}

/**
 * Function to sticky whatever we want.
 * Will only apply the .stuck class. Styling fixed should happen in CSS
 * @param {node} element The element that we want to be sticky
 * @param {number} offset How far off the top of the window we want it to stick
 */
function watchScrollForStick(element, offsetTop = 0) {
  if (isInView('#site__footer')) return;

  const topOfElement = element.getBoundingClientRect().top;
  const stuckThing   = element.querySelector('.stick-this');

  if ((topOfElement - offsetTop) <= 0) {
    if (stuckThing.classList.contains('stuck')) return;

    stuckThing.style.top = `${offsetTop}px`;
    stuckThing.classList.add('stuck');
  } else {
    if (!stuckThing.classList.contains('stuck')) return;

    stuckThing.style.top = 0;
    stuckThing.classList.remove('stuck');
  }
}

/**
 * Once we hit the bottom of the page, destroy all sticky items
 */
function unstickAllAtBottom() {
  const stickyElements = document.querySelectorAll('.stick-this.stuck');

  stickyElements.forEach(element => {
    // const topOfElement     = element.getBoundingClientRect().top;
    // element.style.top      = `${topOfElement}px`;
    // element.style.position = 'absolute';
    element.classList.remove('stuck');
  });
}

/**
 * Check to see if the element is within the viewport
 * @param {node} element The element to check
 */
function isInView(selector) {
  const element = document.querySelector(selector);
  return (element.getBoundingClientRect().top <= window.innerHeight);
}