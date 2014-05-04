initPageClass = function () {
  $('.page').css('min-height', window.innerHeight);
  
}
$(window).resize(initPageClass);


$(document).ready( function() {
  initPageClass();
  
  
});
