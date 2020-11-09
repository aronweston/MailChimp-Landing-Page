(function ($) {

	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#page-wrapper'),
		$banner = $('#banner'),
		$header = $('#header');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: [null, '480px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		$body.removeClass('is-preload');
	});

	// Mobile?
	if (browser.mobile)
		$body.addClass('is-mobile');
	else {

		breakpoints.on('>medium', function () {
			$body.removeClass('is-mobile');
			$("#input").removeClass("col-7");
			$("#input").addClass("col-12");
		});

		breakpoints.on('<=medium', function () {
			$body.addClass('is-mobile');
		});

	}

	// Scrolly.
	$('.scrolly')
		.scrolly({
			speed: 1500,
			offset: $header.outerHeight()
		});

	//Formalist
	$(function () {
		$('#contactForm').formalist();
	});

	//Flickity Carousel
	var $carousel = $('.main-carousel').flickity({
		// options
		cellAlign: 'center',
		contain: true,
		wrapAround: true,
		imagesLoaded: true,
		selectedAttraction: 0.01,
		friction: 0.20,
		pageDots: false,
		prevNextButtons: false
	});

})(jQuery);