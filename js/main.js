initPageClass = function () {
  $('.page').css('min-height', window.innerHeight);
  $('.slideshow-image').css('height', window.innerHeight * 0.65);
  $('#myCanvas').prop('width', window.innerWidth);
  $('#myCanvas').prop('height', window.innerHeight * 0.5);
  initSoundBars();
};
$(window).resize(initPageClass);

initSoundBars = function() {
  window.requestAnimFrame = (function(callback) {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  })();
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');
  var bars = new Array();

  Bar = function(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.color = color;
    this.startTime = (new Date()).getTime();
    this.amplitude = this.random(10,120);
    this.period = this.random(500, 3000);
    this.next = 0;

    this.BASE = 90;
  }
  Bar.prototype.random= function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  Bar.prototype.update = function() {
    var time = (new Date()).getTime() - this.startTime;
    this.next = this.amplitude * Math.sin(time *2 * Math.PI / this.period);

    // Height is measured down, so we negative it
    this.height = -1 * (Math.abs(this.next) + this.BASE);
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.closePath();
    context.fillStyle = this.color;
    context.fill();
  }

  function animateBars() {
    // Find how many rects can fit in the width of the canvas
    var width = 20;
    var num_rect = canvas.width / width;

    // supposed to draw num_rect number of oscillating rects
    // but doesn't...?
    for(var i = 0; i < num_rect; i++){
      var x, y, height;
      x = i*width;
      y = canvas.height;
      height= -50;
      var rect = new Bar(x, y, width, height, '#eee');
      bars.push(rect);
    }
    animate();
  }

  function animate() {
    // update
    context.clearRect(0, 0, canvas.width, canvas.height);

    for(var i = 0; i < bars.length; i++) {
      var bar = bars[i];
      bar.update();
    }
    // request new frame
    requestAnimFrame(animate);
  }

  animateBars();
}

$(document).ready( function() {
  initPageClass();
  initSoundBars();
});
