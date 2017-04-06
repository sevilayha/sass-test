const stickyElements = document.querySelectorAll('.stick-this');

stickyElements.forEach(element => {
  const parentElement          = document.querySelector(element.dataset.parentElement);
  const offsetLeft             = parentElement.getBoundingClientRect().left;
  const offsetTop              = element.dataset.offsetTop; 

  parentElement.style.position = 'relative';

  document.addEventListener('scroll', () => debounce(stickTheThing(element, offsetTop, offsetLeft), 25));
});

/**
 * Function to sticky whatever we want.
 * Will only apply the .stuck class. Styling fixed should happen in CSS
 * @param {node} element The element that we want to be sticky
 * @param {number} offset How far off the top of the window we want it to stick
 */
function stickTheThing(element, offsetTop = 0, offsetLeft = 0) {
  const topOfElement = element.getBoundingClientRect().top;

  if ((topOfElement - offsetTop) <= 0) {
    console.log('sticking');
    element.classList.add('stuck');
  } else {
    console.log('unsticking');
    element.classList.remove('stuck');
  }
}

/**
 * 
 * @param {node} element Set the left and top of the element so that when it goes fixed, its in the correct spot
 */
function positionTheStuckThing(element, top = 0, left = 0) {
  element.style.left = left;
}