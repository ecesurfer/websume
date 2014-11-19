initPageClass = function () {
  $('.page').css('min-height', window.innerHeight);
  $('.slideshow-image').css('height', window.innerHeight * 0.65);
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
	$('.master-nav li a').click(function(ev){
		ev.preventDefault();
		target = $(this).data('target');
		scrollToTarget(target);
	});
}

initBuildings = function() {

}
$(document).ready( function() {
  initPageClass();
  initSlideshowCaptions();
  initSkills();
	initScroll();
  
});