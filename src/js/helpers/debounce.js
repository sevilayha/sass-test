// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(callback, wait = 15, context = this) {
  let timeout      = null; 
  let callbackArgs = null;
  
  const later = () => callback.apply(context, callbackArgs);
  
  return function() {
    callbackArgs = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }
}