initPageClass = function () {
  $('.page').css('min-height', window.innerHeight);
  $('.slideshow-image').css('height', window.innerHeight * 0.65);
  $('#myCanvas').prop('width', window.innerWidth);
  $('#myCanvas').prop('height', window.innerHeight * 0.5);
  initSoundBars();
};
$(window).resize(initPageClass);

initSlideshowCaptions = function() {
  $('#websume-carousel').on('slid.bs.carousel', function () {
    var current = $('.carousel-inner .item.active').prop('id');
    $('.ss-desc.active').removeClass('active');
    $('#desc-' + current).addClass('active');
  });
};

initSkills = function() {
  var source = $('#skill-icons-template').html();
  var template = Handlebars.compile(source);
  var context = { icons: [
    {file : "angular.png", desc : "AngularJS | A front-end JavaScript framework designed by Google"},
    {file : "coffeescript.png", desc: "CoffeeScript | Object-oriented scripting language that compiles into JavaScript"},
    {file:"emberjs.png", desc : "EmberJS | A front-end framework designed for ambitious web applications. Uses Handlebars.js for templating"},
    {file:"git.png", desc : "Git | Distributed version control software used by millions including GitHub"},
    {file:"javascript.png", desc: "JavaScript | The language of the internet...specifically web browsers"},
    {file:"xcode.png", desc: "iOS Development | Objective C and Swift are the unique languages used to create iOS apps"},
    {file:"android.png", desc : "Android Development | Using Java and the ADT package are necessary when coding Android apps"},
    {file:"rails.png", desc : "Ruby on Rails | A web framework that uses Ruby to dominate some of the best web 2.0 apps on the market"},
    {file:"ruby.png", desc : "Ruby | A powerful object oriented scripting language used in Ruby on Rails"},
    {file:"terminal.png", desc: "Linux/Unix Terminal | A necessity of any web developer is to know the command line."}] };
  var html = template(context);
  $('#skill-icons').html(html);
  $('[data-toggle="tooltip"]').tooltip();
}

initScroll = function() {
	var scrollToTarget = function(el, ms) {
		var speed = (ms) ? ms :600;
		$('html,body').animate({scrollTop: $(el).offset().top}, speed);
	};
	$('.navbar-nav li a').click(function(ev){
		ev.preventDefault();
		target = $(this).data('target');
		scrollToTarget(target);
	});
}

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
    this.amplitude = this.random(10,100);
    this.period = this.random(500, 2000);
    this.next = 0;

    this.BASE = 120;
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
    var width = 30;
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
  initSlideshowCaptions();
  initSkills();
	initScroll();
  initSoundBars();

});
