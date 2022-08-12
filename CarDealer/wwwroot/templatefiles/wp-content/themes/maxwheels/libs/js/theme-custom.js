jQuery.noConflict();
jQuery(function($) {
    "use strict";
const multipleSwiperSlides = function() {
	let sliderMain = document.querySelectorAll('.swiper-container.js-slider--main')
	let sliderNav  = document.querySelectorAll('.swiper-container.js-slider--nav')

  // Arrays to hold swiper instances
	let mainArray  = [];
	let navArray   = [];

	// Slider Main
	sliderMain.forEach(function(element, i) {
		// Push swiper instance to array
		mainArray.push(
			new Swiper(element, {
				loop: true,
				loopedSlides: 3,
			})
		);
	});

	// Slider Nav
	sliderNav.forEach(function(element, i) {
		var self = sliderNav;
		// Push swiper instance to array
		navArray.push(
			new Swiper(element, {
				slidesPerView: 3,
				loop: true,
				loopedSlides: 3,
				slideToClickedSlide: true,
        spaceBetween: 5,
        navigation: {
          nextEl: self[i].querySelector('.swiper-button-next'),
          prevEl: self[i].querySelector('.swiper-button-prev')
        }
			})
		);
	});

	const checkOnPage = function() {
		if (sliderMain.length > 0 && sliderNav.length > 0) {
			let numberOfSlides = mainArray.length || navArray.length || 0;
	
			if (mainArray.length !== navArray.length) {
				console.warn('multipleSwiperSlides: Number of main slides and nav slides is different. Expect incorrect behaviour.');
			}
	
			for (let i = 0; i < numberOfSlides ; i++ ) {
				mainArray[i].controller.control = navArray[i];
				navArray[i].controller.control  = mainArray[i];
			}
	
			console.log('multipleSwiperSlides: Things should be working fine. B)');
		}
	}

	checkOnPage();
}
multipleSwiperSlides();

$('.mw-currency-switch').on('change', function () 
{
	 var curr_rate = $(this).val();
	 var date = new Date();
	 date.setTime(date.getTime()+(12 * 60 * 60 * 1000));
	 Cookies.set('mw_currency_rate', curr_rate, {expires:date});
	 window.location.reload();
});

	

	if ($('.mw-product-counter').length) {
		$('.mw-product-counter').each(function () {
			var countDate = $(this).data('countdown-time'); // getting date
			$(this).countdown(countDate, function (event) {
				$(this).html('<li> <div class="timer-countdown-box"> <span class="timer-days">' + event.strftime('%D') + '</span> <span class="timer-div">Days</span> </div> </li> <li> <div class="timer-countdown-box"> <span class="timer-hours">' + event.strftime('%H') + '</span> <span class="timer-div color-1">Hours</span> </div> </li> <li> <div class="timer-countdown-box"> <span class="timer-minutes">' + event.strftime('%M') + '</span> <span class="timer-div color-2">Minutes</span> </div> </li> <li> <div class="timer-countdown-box"> <span class="timer-seconds">' + event.strftime('%S') + '</span> <span class="timer-div color-3">Seconds</span> </div> </li>');
			});
		}).on('finish.countdown', function () {
			$(this).hide();
			$('.single-countdown-mw').hide();
		});
	}
	
	
	
	
if ($('.swiper-container').is('.mw-swipe'))
{
  var siperslider = $(".swiper-container");
  if (siperslider.length > 0) {
	var swiperAnimation = new SwiperAnimation();
	var swiper = new Swiper(".swiper-container", {
	  init : true,
	  direction: "horizontal",
	  effect: "slide",
	  loop: true,
	  keyboard: {
		enabled: true,
		onlyInViewport: true
	  },
	  navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
	  pagination: {
		  el: '.swiper-pagination',
		  clickable: true,
		   type: 'fraction',
	  },
	  on: {
		init: function() {
		  swiperAnimation.init(this).animate();
		},
		slideChange: function() {
		  swiperAnimation.init(this).animate();
		}
	  }
	});
  }
}
	
	
	
	
	
	
	
	$(".sel-class").on('click', function (e) {
		 $('.filters-nav li button').removeClass('active-grid').addClass("make-me-dark");
		 $(this).addClass('active-grid');
		 $('input[name="layout-type"]').val($(this).val());
	});  
	

	$(".mydata-attr").on('click', function (e) {
		e.preventDefault();	
  		var myurl = $(this).attr("data-url");
		window.location.href = myurl;
		return false;
	});
	
 $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if(scroll < 300){
			$('.make-me-trans').removeClass('i_am_scroll')
          //  $('.make-me-trans .position-fixed').css('background', 'transparent');
			
        } else{
			$('.make-me-trans').addClass('i_am_scroll')
          //  $('.make-me-trans  .position-fixed').css('background', 'linear-gradient(to right, #32408f 70%, #7684cf)');
        }
    });
    
    
 window.paceOptions = {
  elements: false,
  restartOnPushState: false,
  restartOnRequestAfter: false,
  ajax: {
        trackMethods: ['GET', 'POST', 'PUT', 'DELETE', 'REMOVE'],
        trackWebSockets: true,
        ignoreURLs: []
      }
}
    
var rtl_mode;
if($('input[name=is_rtl]').val() == 1)
{
    rtl_mode = true;
} else
{
    rtl_mode = false;
}

	
	if ($('ul.product-categories').length > 0) {
	
		$( "<div class='woo-cat-toggle'></div>" ).insertAfter( ".product-categories > .cat-item.cat-parent > a" );
		$( ".woo-cat-toggle" ).click(function () {
			$(this).toggleClass("cat-popped");
			$(this).parent().find('.children').slideToggle();
		});
		if($('.product-categories li.cat-parent.current-cat-parent'))
		{
			$('li.current-cat-parent').find('.children').slideToggle();
			$('li.current-cat-parent').find('.woo-cat-toggle').addClass('cat-popped');
		}
	}


	if ($('.woocommerce  .mw-shop-detial .quantity:not(.hidden)').length > 0) {
	
	 $('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>').insertAfter('.quantity input');
    $('.quantity').each(function() {
      var spinner = $(this),
        input = spinner.find('input[type="number"]'),
        btnUp = spinner.find('.quantity-up'),
        btnDown = spinner.find('.quantity-down'),
        min = input.attr('min'),
        max = input.attr('max');
		btnUp.on('click', function (e) {
		e.preventDefault();	
        var oldValue = parseFloat(input.val());
		if(isNaN(oldValue)) {
			var oldValue = 0;
		}
        if (oldValue >= max && max!='') {
          var newVal = oldValue;
        } else {
          var newVal = oldValue + 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

      btnDown.on('click', function (e) {
		  e.preventDefault();	
        var oldValue = parseFloat(input.val());
		 if(isNaN(oldValue)) {
			var oldValue = 0;
		}
        if (oldValue <= min && min!='') {
          var newVal = oldValue;
        } else {
          var newVal = oldValue - 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

    });
	}
	
	

	
if ( $( ".js-range-slider-price-home" ).length )
{
    var $servicesRange = $(".js-range-slider-price-home"),
    $servicesInputFrom = $(".js-input-from"),
    $servicesInputTo = $(".js-input-to"),
    instance,
    min = $(this).prop("value"),
    max = $(this).prop("value"),
    from = 0,
    to = 0;
    $servicesRange.ionRangeSlider({
        skin: "round",
        type: "double",
        onStart: updateInputs,
        onChange: updateInputs,
    });
    instance = $servicesRange.data("ionRangeSlider");
    function updateInputs (data) {
        from = data.from;
        to = data.to;
        $servicesInputFrom.prop("value", from);
        $servicesInputTo.prop("value", to);	
    }
    $servicesInputFrom.on("input", function () {
        var val = $(this).prop("value");
        // validate
        if (val < min) {
            val = min;
        } else if (val > to) {
            val = to;
        }
        instance.update({
            from: val
        });
    });
    $servicesInputTo.on("input", function () {
        var val = $(this).prop("value");
        // validate
        if (val < from) {
            val = from;
        } else if (val > max) {
            val = max;
        }
        instance.update({
            to: val
        });
    });
} 

if ( $( ".js-range-slider-mileage-home" ).length > 0)
{
     $(".js-range-slider-mileage-home").ionRangeSlider({
            skin: "round",
    });    
}

$(".toggle-password").on('click', function (e) {
		e.preventDefault();	
		$(this).toggleClass("fa-eye fa-eye-slash");
  var input = $($(this).attr("data-bs-toggle"));
  if (input.attr("type") === "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
});	
	
	
	//$('[data-toggle="popover"]').popover();
 //$('[data-toggle="tooltip"]').tooltip();
 
	
	
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
});
	
 if($('.txt-dec').length > 0){
	$("a.txt-dec").YouTubePopUp( { autoplay: 0 } );
  }

if($('.ab1').length > 0){
$('.ab1').countUp({
            time: 1500,
        });
}
if($('.ag-counter').length > 0){
$('.ag-counter').countUp({
            time: 1500,
        });
}
 if($('.cl-class').length > 0){
	$(document).ready(function(){
		$(".menu-des a.cl-class").on('click', function (e) {
		e.preventDefault();	
		$( "a.cl-class" ).removeClass('acmenu-pro-6');	
		  $(this).addClass('acmenu-pro-6');
			event.preventDefault();
			$("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top-100 }, 1200);
		});
	});
}
 

if ($('.featured-slider-prop').length)
{
	$('.featured-slider-prop').owlCarousel({
		dots: false,
		nav: true,
		rtl: rtl_mode,
		navText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"],
		animateOut: 'fadeOut',
		animateIn: 'fadeIn',
		items: 1,
	});
}
if ($('.car-slider').length)
{	
	$('.car-slider').owlCarousel({
		loop:true,
		margin:20,
		autoplay:true,	
		rtl: rtl_mode,
		nav:true,
		navText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"],
		responsive:{
			0:{
				items:1
			},
			600:{
				items:2
			},
			1000:{
				items:4
			}
		}
	});
}
if ($('.mw-cats-slider').length)
{	
	$('.mw-cats-slider').owlCarousel({
		loop:true,
		margin:10,
		autoplay:true,	
		rtl: rtl_mode,
		nav:false,
		dots:true,
		navText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"],
		responsive:{
			0:{
				items:1
			},
			600:{
				items:2
			},
			1000:{
				items:4
			}
		}
	});
}
if ($('.featured-makes-cry').length)
{	
	$('.featured-makes-cry').owlCarousel({
		stagePadding: 200,
    loop:true,
    margin:0,
    lazyLoad: true,
		rtl: rtl_mode,
    nav:false,
		autoplay: true,
                smartSpeed: 1500,
                dots:true, 
  responsive:{
        0:{
            items:1,
            stagePadding: 60
        },
        600:{
            items:1,
            stagePadding: 100
        },
        1000:{
            items:1,
            stagePadding: 200
        },
        1200:{
            items:1,
            stagePadding: 250
        },
        1400:{
            items:1,
            stagePadding: 300
        },
        1600:{
            items:1,
            stagePadding: 350
        },
        1800:{
            items:2,
            stagePadding: 315
        }
    }
	});
}
if ($('.my-car').length)
{	
	$('.my-car').owlCarousel({
		loop:true,
		margin:0,
		autoplay:true,
		autoplayHoverPause:true,
		nav:false,
		rtl: rtl_mode,
		items:1
	});
}
if ($('.testimonial-4').length)
{	
	$('.testimonial-4').owlCarousel({
		loop:true,
		margin:0,
		autoplay:true,
		autoplayHoverPause:true,
		nav:false,
		rtl: rtl_mode,
		items:1
	});
}	
if ($('.trending-words').length)
{	
	$('.trending-words').owlCarousel({
		margin:0,
		autoplayHoverPause:true,
		rtl: rtl_mode,
		dots: false,
		nav:true,
		navText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"],
		responsive:{
			0:{
				items:3
			},
			600:{
				items:3
			},
			1000:{
				items:6
			}
		}
	});
}
	
if ($('.shop-banner-slider').length)
{
	$('.shop-banner-slider').owlCarousel({
		rtl: rtl_mode,
		loop: true,
		margin: 10,
		center: true,
		items: 1,
		animateOut: 'fadeOut',
		animateIn: 'fadeIn',
		autoplay:true,
    autoplayTimeout:3500,
    autoplayHoverPause:true
	});
}

if ($('.full-width-testimonials').length)
{
	$('.full-width-testimonials').owlCarousel({
		dots: false,
		nav: true,
		rtl: rtl_mode,
		navText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"],
		items: 1,
	});
}
if ($('.dealers-slide').length)
{
	$('.dealers-slide').owlCarousel({
		dots: false,
		nav: true,
		rtl: rtl_mode,
		navText: ["<i class='fas fa-long-arrow-alt-left'></i>", "<i class='fas fa-long-arrow-alt-right'></i>"],
		items: 1,
		autoplay:true,
		autoplayTimeout:2500,
		autoplayHoverPause:true,
		loop:true,
		lazyLoad: true,
		margin:0,
	});
}

$(".currency-dropdown .dropdown-menu .dropdown-item").on('click', function () {
  var selText = $(this).text();
  $(this).parents().find('.dropdown-toggle').html(selText);
});

/*  Team-Slider-Owl-carousel  */
if($('.prop-types-carsol').length){
        $('.prop-types-carsol').owlCarousel({
			dots: false,
            loop:true,
            margin:30,
            nav:true,
            rtl: rtl_mode,
			smartSpeed:1200,
            navText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"],
            responsive: {
                0: {
                    items: 1,
                    center: false
                },
                480:{
                    items:1,
                    center: false
                },
                520:{
                    items:2,
                    center: false
                },
                600: {
                    items: 2,
                    center: false
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 4
                }
            }
        });
 }

$( window ).on( 'elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction( 'frontend/element_ready/testimonial-one.default', function($scope, $){
       if ($('.full-width-testimonials').length)
		{
			$('.full-width-testimonials').owlCarousel({
				dots: false,
				nav: true,
				rtl: rtl_mode,
				navText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"],
				items: 1,
			});
		}
    });
 });



if($('.social-ads').length > 0){
$('.social-ads').owlCarousel({
    loop:true,
	autoplay:true,
	dots:false,
	autoplayTimeout:3000,
	smartSpeed:1200,
    nav:false,
    rtl: rtl_mode,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
    responsive:{
        0:{
            items:1,
        },
        500:{
            items:3,
        },
		800:{
            items:4,
        },
        1200:{
            items:7,
        }
    }
});
}

if($('.testimonial-classic').length > 0){
$('.testimonial-classic').owlCarousel({
					loop:true,
					autoplay:true,
					dots:false,
					autoplayTimeout:5000,
					smartSpeed:1200,
					autoplayHoverPause:true,
					nav:false,
	margin:20,
    rtl: rtl_mode,
					responsive:{
						0:{
							items:1,
						},
						500:{
							items:1,
						},
						800:{
							items:2,
						},
						1000:{
							items:2,
						},
						1200:{
							items:3,
						}
					}
				});
				}


$( window ).on( 'elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction( 'frontend/element_ready/partners-all.default', function($scope, $){
       if($('.social-ads').length > 0){
$('.social-ads').owlCarousel({
    loop:true,
	autoplay:true,
	dots:false,
	autoplayTimeout:3000,
	smartSpeed:1200,
    nav:false,
    rtl: rtl_mode,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
    responsive:{
        0:{
            items:1,
        },
        500:{
            items:3,
        },
		800:{
            items:4,
        },
        1200:{
            items:6,
        }
    }
});
}
    });
 });

if($('.floor-plan').length > 0){

$('.floor-plan li').first().addClass('open');
	$('.floor-plan li .floor-plan-content').first().css('display','block').slideDown(400);
    $('.floor-plan-title').on('click', function(event) {
        event.preventDefault();
        if ($(this).parents('li').hasClass('open')) {
            $(this).parents('li').removeClass('open').find('.floor-plan-content').slideUp(400);
        } else {
            $(this).parents('.floor-plan').find('.floor-plan-content').not($(this).parents('li').find('.floor-plan-content')).slideUp(400);
            $(this).parents('.floor-plan').find('> li').not($(this).parents('li')).removeClass('open');
            $(this).parents('li').addClass('open').find('.floor-plan-content').slideDown(400);
        }
    });
}

	if($('.myflex').length > 0) {
		jQuery('.slides').addClass('flexslider-fix-rtl');
	$('.myflex').flexslider({
			animation: "slide",
			controlNav: "thumbnails",
		rtl: rtl_mode,
		     start: function() {jQuery('.slides').removeClass('flexslider-fix-rtl');
		}
	});
	}

 $('.show-on-click').on('click', function () {
    $('.auth-dropdown').css('display', 'block');
});			
$(document).mouseup(function (e){
	var drop_counter = $(".auth-dropdown");
	if (!drop_counter.is(e.target) && drop_counter.has(e.target).length === 0){
		drop_counter.fadeOut();
	}
}); 


	   $(window).on('scroll', function () {
            if ($(this).scrollTop() > 300) {
                $('.scroll-top').fadeIn(300);
            } else {
                $('.scroll-top').fadeOut(300);
            }
        });
        $('.scroll-top').on('click', function (event) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, 1000);
        });
		
		
		
		$("input[name$='assign-listing']").on('click', function (event) {
			  var selected_radio = $(this).val();
			  if(selected_radio == 1)
			  {
				 $(".sel-agent").removeClass('none');
				 $(".just-agent").attr('data-validation','required');
			  }
			  else
			  {
				  $(".just-agent").attr('data-validation',''); 
			  }
		});
	
	
	
	 
	
	$('.check_featured').on('change', function(){
		var featp = parseFloat($(this).attr("data-featp"));
		var sfee = parseFloat($('input:hidden[name=submission_fee]').val());
		this.value = this.checked ? 1 : 0;
		$('input[name=is_featuredz]').val(this.value);
		
		if( $(this).is(':checked') ) {
			var total = featp + sfee;
			$(".atcive-pric").html(total);
		}
		else
		{
			$(".atcive-pric").html(sfee);
		}
	});
    
    if($('input[name=is_rtl]').val() == 1)
    {
        var $container = $('.grid');
        $container.imagesLoaded(function(){
          $container.masonry({
            itemSelector : '.grid-item',
            percentPosition: true,
            layoutMode: 'masonry',
            transitionDuration: '0.7s',
            isOriginLeft : false,
          });
        });
    }
    else
    {
        var $container = $('.grid');
        $container.imagesLoaded(function(){
          $container.masonry({
            itemSelector : '.grid-item',
            percentPosition: true,
            layoutMode: 'masonry',
            transitionDuration: '0.7s',
          });
        });
    }
	
	$('.theme-selects').select2({
		 width:'100%',
		 theme: "classic",
	});
	$('.theme-selects-role').select2({
		width:'100%',
		theme: "classic",
	});
	$('.theme-selects-role').select2({
		dropdownParent: $('#check_userrole')
	});

 $('.mw-currency-switch').select2({
    minimumResultsForSearch: -1,
	 width:'100%',
	 theme: "classic",
   //  dropdownCssClass: "mw-currz"

});	


$('.wp-block-archives-dropdown select, .wp-block-categories select, .blog-sidebar .widget select, .woocommerce-ordering .orderby').select2({
	 width:'100%',
	 theme: "classic",
});


$('.sort-selects').select2({
	 width:'100%',
	 theme: "classic",
	 minimumResultsForSearch: -1
});

$('.theme-selects-group').select2({
	 width:'50%',
	 theme: "classic"
});

$('.search-selects').select2({
	 width:'100%',
	 theme: "classic",
	 allowClear: true,
});

$('.woocommerce .maxwheels-shop-detail select').select2({
     
	 width:'100%',
	 theme: "classic",
    placeholder: 'Select an option'
});
    

// Expending/Collapsing advance search content
    $(document).on('click', '.show-additional-features', function () {
        if ($(this).find('.far').hasClass('fa-minus-circle')) {
            $(this).find('.far').removeClass('fa-minus-circle');
            $(this).find('.far').addClass('fa-plus-circle');
        } else {
            $(this).find('.far').removeClass('fa-plus-circle');
            $(this).find('.far').addClass('fa-minus-circle');
        }
    });



$('.mw-datepicker').datepicker({
	language: {
		days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
		months: ['January','February','March','April','May','June', 'July','August','September','October','November','December'],
		monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		today: 'Today',
		clear: 'Clear',
	},
	timepicker: true,
	timeFormat: 'hh:ii',
	dateFormat: 'dd/mm/yyyy',
	minDate: new Date()
});


	$('.sidebar').on('show.bs.collapse', '.collapse', function() {
		$('.sidebar').find('.collapse.show').collapse('hide');
    });
	
	$('[data-toggle="minimize"]').on("click", function() {
		$('body').toggleClass('sidebar-icon-only');
    });
	
	$('[data-toggle="offcanvas"]').on("click", function() {
		$('.sidebar-offcanvas').toggleClass('active')
    });

	$('.icon-on-off').click(function () {
			e.preventDefault();
			$(".sidebar").toggleClass("toggled");
	});


if ($('.prop-datepicker').length > 0)
{	
	$('.prop-datepicker').datepicker({
		language: {
		days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
		months: ['January','February','March','April','May','June', 'July','August','September','October','November','December'],
		monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		today: 'Today',
		clear: 'Clear',
			},
		timepicker: false
	});
}
	
	if(typeof(get_strings) !== 'undefined' && get_strings !== null)
	{
        
		$.fn.hidePhoneNum = function(options) {

		var settings = $.extend({
			showNumber: 7,
			linkClass: 'tel-link'
		}, options);

		return this.each(function() {
			var telNum = $(this).data("tel"),
					htmlNum = $(this).html(),
					myRegex = /[\s-\(\()]/g,
					telNewNum = telNum.replace(myRegex, '');

			$(this).html(telNum.substr(0, settings.showNumber) + " " + 'XXXXX ' + htmlNum);

			$(this).find('a').on('click', function(e) {
				e.preventDefault();
				$(this).parent().html("<a class='mw-num-show' href='tel:"+telNewNum+"' class='"+settings.linkClass+"'>"+telNum+"</a>")
			})

		});
	};
        $('.mw-show-phone').hidePhoneNum();
        
        if ($('.click-reveal').is('.phonenumber'))
        {	 
            $(document).ready(function() {
                var phonenumbers = [];
                $(".phonenumber").each(function(i) {
                    var text_string = get_strings.click_reveal;
                    var hashes = '***** ';
                    phonenumbers.push($(this).text());
                    var newcontent = $(this).text().substr(0, $(this).text().length - 4)  + hashes + text_string;
                    $(this).text(newcontent);
                    $(this).bind("click", function() {
                    if ($(this).text() == phonenumbers[i]) {
                        $(this).text(phonenumbers[i].substr(0, phonenumbers[i].length - 4) + hashes + text_string);
                    } else {
                    $(".phonenumber").each(function(x) {
                        if ($(this).text() == phonenumbers[x]) {
                           $(this).text(phonenumbers[x].substr(0, phonenumbers[x].length - 4)+ hashes + text_string);
                        }
                    });            
                    $(this).text(phonenumbers[i]);
                    }
                 });
                });
            });
        }
        
        var myinput = document.querySelector("#myphone");
        if(typeof(myinput) !== 'undefined' && myinput !== null)
	    {
           if(typeof(get_strings.all_numbers) !== 'undefined' && get_strings.all_numbers !== '')
           {
                window.intlTelInput(myinput, {
                    onlyCountries: [get_strings.all_numbers],
                    utilsScript: get_strings.t_path+"/libs/js/utils.js",
                });
           }
           else
           {
                window.intlTelInput(myinput, {
                    utilsScript: get_strings.t_path+"/libs/js/utils.js",
                });
           }
       }
     
		if ($('.my_distance_slider').length > 0)
		{
			$('.my_distance_slider').nstSlider({
				  "left_grip_selector": ".leftGrip",
				  "value_changed_callback": function (cause, leftValue) {
					$(this).parent().find('.leftLabel').text(leftValue);
					$('input[name="distance"]').val(leftValue);
				  }
			});
		}
		$(document.body).on('click', '.get-my-location', function(e){
				e.preventDefault();
				var button = $(this);
				button.find('i').addClass('fas fa-spin fa-spinner clr-white');
				button.attr("disabled", true);
				if ("geolocation" in navigator)
				{ 
					navigator.geolocation.getCurrentPosition(get_desired_location, show_error_codes, {enableHighAccuracy: true}); 
				}
				else{
					notify('info', get_strings.whoops, get_strings.geolocation);
					
				}
				return false;
			});	
		function get_desired_location(position)
		{
				$('.get-my-location').find('i').removeClass('fas fa-spin fa-spinner clr-white');
				$('.get-my-location').find('i').addClass('fas fa-location-arrow');
				$('input[name="latt"]').val(position.coords.latitude);
				$('input[name="long"]').val(position.coords.longitude);
				$('.radius-dropdown').slideDown('slow');
		}		
		function show_error_codes(error){
		   switch(error.code) {
				case error.PERMISSION_DENIED:
					//notify('info', get_strings.whoops, get_strings.p_denied);
					break;
				case error.POSITION_UNAVAILABLE:
				//	notify('info', get_strings.whoops, get_strings.p_unava);
					break;
				case error.TIMEOUT:
					//notify('info', get_strings.whoops, get_strings.req_timeout);
					break;
				case error.UNKNOWN_ERROR:
					//notify('info', get_strings.whoops, get_strings.unknow_error);
					break;
			}
			$('.get-my-location').find('i').removeClass('fas fa-spin fa-spinner clr-white');
			$('.get-my-location').find('i').addClass('fas fa-location-arrow');
		}
		

			if (get_strings.authorization != "" && get_strings.authorization == 1) {
				notify('error', get_strings.whoops, get_strings.auth_warning);
			}

			if (get_strings.is_reset != "" && get_strings.is_reset == 1) {
				if (get_strings.reset_status.status == false) {
					notify('error', get_strings.whoops, get_strings.reset_status.r_msg);
				} else {
					notify('success', get_strings.congratulations, get_strings.reset_status.r_msg);
					$('input[name=requested_user_id]').val(get_strings.reset_status.requested_id);
					var myModal = new bootstrap.Modal(document.getElementById("mynewpass"), {});
					myModal.show();
				}
			}
		if(get_strings.dont_have_role !="" && get_strings.dont_have_role == 1)
		{
			var openmodal = new bootstrap.Modal(document.getElementById("check_userrole"), {});
			openmodal.show();
		}
		
		
		$('#asd').on('click', function(){
		$.post(get_strings.ajax_url,{action : 'mw_user_payments_paypal', collect_data:$( "form[name='paypal_form']").serialize()}).done( function(response) 
		{
			//window.location.href = response;
			alert(response);
		});
	});
		
		



	


	$(document.body).on('click', '.fav-prop', function(e){
		e.preventDefault();
		var button = $(this);
	    button.find('i').addClass('fas fa-spin fa-spinner');
		button.attr("disabled", true);
		var fav_listing = $(this).data("fav-id");
		$.post(get_strings.ajax_url,{action : 'mw_listing_bookmarks',fav_listing: fav_listing,security:get_strings.ajax_nonce}).done(function(response) 
		{
			 button.find('i').removeClass('fas fa-spin fa-spinner');
			 button.find('i').addClass('far fa-heart');
			 button.attr("disabled", false);
			 if ( true === response.success )
			 {
				 notify('success', get_strings.congratulations, response.data.message);
			 }
			 else{
				notify('error', get_strings.whoops, response.data.message); 
			 }
		});
		return false;
	});
        
        
$(document.body).on('click', '.fav-comp', function(e){
		e.preventDefault();
		var button = $(this);
	    button.find('i').addClass('fas fa-spin fa-spinner');
		button.attr("disabled", true);
		var compare_listing = $(this).data("compare-id");
		$.post(get_strings.ajax_url,{action : 'mw_listing_compare',compare_listing: compare_listing,security:get_strings.ajax_nonce}).done(function(response) 
		{
			 button.find('i').removeClass('fas fa-spin fa-spinner');
			 button.find('i').addClass('fas fa-random');
			 button.attr("disabled", false);
			 if ( true === response.success )
			 {
                 $("#compare-toolbox").addClass('toolbox-open');
				$(".dynamic_compare").html(response.data.compare_list);
			 }
			 else{
				$(".dynamic_compare").html(response.data.custom_msg);
			 }
		});
		return false;
});
        
        $(document.body).on('click', '.remove_compare_list', function(e){
            e.preventDefault();
            var button = $(this);
            button.find('i').removeClass('fas fa-times');
            button.find('i').addClass('fas fa-spin fa-spinner');
		    button.attr("disabled", true);
            var compare_listing = $(this).data("property-id");
            $.post(get_strings.ajax_url,{action : 'mw_listing_compare',compare_listing: compare_listing,security:get_strings.ajax_nonce}).done(function(response) 
            {
                 button.find('i').removeClass('fas fa-spin fa-spinner');
                 button.find('i').addClass('fas fa-times');
                 button.attr("disabled", false);
                 if ( true === response.success )
                 {
                     $("#compare-toolbox").addClass('toolbox-open');
                    $(".dynamic_compare").html(response.data.compare_list);
                 }
                 else{
				    $(".dynamic_compare").html(response.data.custom_msg);
                 }
            });
            return false;
        });

      // Toggles Theme Settings Tray
      $('#compare-toolbox .panel-heading').on('click', function() {
        $('#compare-toolbox').toggleClass('toolbox-open');
      });
      
        
     $(document.body).on('click', '.clear-all-compare', function(e){
        e.preventDefault();
        $.post(get_strings.ajax_url,{action : 'mw_listing_compare_clear'}).done(function(response) 
        {
            if ( true === response.success )
			 {
				$(".dynamic_compare").html(response.data.compare_list);
			 }
        });
     });


$(".for-radius-get").on('click', function () {	
	$(this).buttonLoader('start');
	$(this).attr("disabled", true);
	if ("geolocation" in navigator){ 
		navigator.geolocation.getCurrentPosition(show_location, show_error, {enableHighAccuracy: true}); 
		
	}else{
		notify('info', get_strings.whoops, get_strings.geolocation);
	}
});
function show_location(position)
{
    $('input[name="latitude"]').val(position.coords.latitude);
    $('input[name="longitude"]').val(position.coords.longitude);
    $('.only-for-radius').slideDown('slow');
    $('.sonu-button').buttonLoader('stop');
    $(".sonu-button").attr("disabled", false);
}	    

    //Error Callback
function show_error(error){
   switch(error.code) {
        case error.PERMISSION_DENIED:
			//notify('info', get_strings.whoops, get_strings.p_denied);
            break;
        case error.POSITION_UNAVAILABLE:
			//notify('info', get_strings.whoops, get_strings.p_unava);
            break;
        case error.TIMEOUT:
			//notify('info', get_strings.whoops, get_strings.req_timeout);
            break;
        case error.UNKNOWN_ERROR:
			//notify('info', get_strings.whoops, get_strings.unknow_error);
            break;
    }
	$('.sonu-button').buttonLoader('stop');
	$(".sonu-button").attr("disabled", false);
}
 	

	$(document.body).on('click', '.track-reaction', function(e){
		  e.preventDefault();
		  var reaction_id = $(this).data("reaction");
          var c_id = $(this).data("cid");
		  var listing_id = $(this).data("listingid");
		  $(".reaction-loader-" + c_id).show();
		  $.post(get_strings.ajax_url,{action : 'mw_listing_reactions',r_id: reaction_id,c_id:c_id,security:get_strings.ajax_nonce,listing_id:listing_id}).done(function(response) 
		 {
			 $(".reaction-loader-" + c_id).hide();
			 if ( true === response.success )
			 {
				 $('.reaction-count-'+c_id+'-'+reaction_id).html('('+response.data.totalcount+')');
			 }
			 else{
				notify('error', get_strings.whoops, response.data.message); 
			 }
		 });
		 return false;
	});	

	
	
	
		
	$(document.body).on("click",".fetch_dynamic_results", function()
	{
		var find_button = $(this);
		var data_div = $(this).parent().parent().find(".dynamic_loading");
		var button_div = $(this).parent().parent().find(".fetch-more-records");
		var page = parseInt($(this).attr("data-page"))+1;
		var record_limit = $(this).attr("data-limit");
		var listingtype = $(this).attr("data-listingtype");
		var orderby = $(this).attr("data-orderby");
		var layouttype = $(this).attr("data-layouttype");
		var typestatus = $(this).attr("data-typestatus");
		var location_id = $(this).attr("data-locationid");
		var category = $(this).attr("data-category");
		var max_pages = $(this).attr("data-maxpages");
		var col_type = $(this).attr("data-coltype");
		find_button.buttonLoader('start');
		find_button.attr("disabled", true);
		$.post(get_strings.ajax_url, {action: 'mw_loadmore_listings', page_no: page,limit:record_limit,type:listingtype,order:orderby,layout:layouttype,typestatus:typestatus,location_id:location_id,col_type:col_type,cats:category}).done(function (response)
        {
			find_button.buttonLoader('stop');
			find_button.attr("disabled", false);
			if (true === response.success) 
			{
				find_button.attr('data-page',page);
				data_div.append(response.data.listings);
				if (page == parseInt(max_pages))
				{
					button_div.remove();
				}
			}
			else
			{
				find_button.buttonLoader('stop');
			    find_button.attr("disabled", false);
			}
			
		});
	});
		
	/* For My Plans */
	$(document.body).on('click', '.mw-woo-plans', function(e){
		e.preventDefault();
		 var plan_id = $(this).attr("data-plan-id");
         var qunatity = $(this).attr('data-plan-qty');
         var pack_ref = $(this).attr('data-plan-type');
         $(this).buttonLoader('start');
         $(this).attr("disabled", true);
         $.post(get_strings.ajax_url, {action: 'mw_plan_cart', plan_id: plan_id,qunatity:qunatity,pack_ref:pack_ref,security:get_strings.ajax_nonce}).done(function (response)
         {
			Pace.restart();
			$('.sonu-button-' +plan_id+'').buttonLoader('stop');
			$('.sonu-button-' +plan_id+'').attr("disabled", false);
			if (true === response.success) 
			{
                notify('success', get_strings.congratulations, response.data.message);
                window.location	=	response.data.referral;
			}
			else
			{
                notify('error', get_strings.whoops, response.data.message); 
			}
		});
        return false; 
	});	
        
    /* Delete My Favourites */
	$(document.body).on('click', '.mw-woo-packs', function(e){
		e.preventDefault();
		 var package_id = $(this).attr("data-product-id");
         var qunatity = $(this).attr('data-product-qty');
         var pack_ref = $(this).attr('data-package-type');
         $(this).buttonLoader('start');
         $(this).attr("disabled", true);
         $.post(get_strings.ajax_url, {action: 'mw_package_cart', package_id: package_id,qunatity:qunatity,pack_ref:pack_ref,security:get_strings.ajax_nonce}).done(function (response)
         {
			$('.sonu-button-' +package_id+'').buttonLoader('stop');
			$('.sonu-button-' +package_id+'').attr("disabled", false);
			if (true === response.success) 
			{
                notify('success', get_strings.congratulations, response.data.message);
                window.location	=	response.data.referral;
			}
			else
			{
                notify('error', get_strings.whoops, response.data.message); 
			}
		});
        return false; 
	});

	$(document.body).on("click",".fetch_dynamic_agencies", function(e)
	{
		e.preventDefault();
		var pageag = parseInt($(this).attr("data-page"))+1;
		var record_limit = $(this).attr("data-limit");
		var listingtype = $(this).attr("data-listingtype");
		var orderby = $(this).attr("data-orderby");
		var layouttype = $(this).attr("data-layouttype");
		var category = $(this).attr("data-category");
		var max_pages = $(this).attr("data-maxpages");
		var max_cols = $(this).attr("data-coltype");
		$('.agency-btnload').buttonLoader('start');
		$(".agency-btnload").attr("disabled", true);
		$.post(get_strings.ajax_url, {action: 'mw_loadmore_agencies', page_no: pageag,limit:record_limit,type:listingtype,order:orderby,layout:layouttype,cats:category,max_cols:max_cols}).done(function (response)
        {
			$('.agency-btnload').buttonLoader('stop');
			$(".agency-btnload").attr("disabled", false);
			if (true === response.success) 
			{
				$('.fetch_dynamic_agencies').attr('data-page',pageag);
				$(".dynamic_loading_agencies").append(response.data.listings);
				if (pageag == parseInt(max_pages))
				{
					
					$(".fetch-more-records").hide();
				}
				reloadMasonry();
			}
			else
			{
				$(".fetch-more-records").hide();
			}
		});
		return false; 
	});
	
	

	  
	  /* Delete Submitted Reviews */
	  $('.delete-my-sub-rev').on('click', function()
	  {
		  var mw_id = $(this).attr("data-property-id");
		  var comment_id = $(this).attr("data-comment-id");
		  $.confirm({
				title: get_strings.conf,
				theme: 'material',
				animation: 'scale',
				content: get_strings.content,
				closeAnimation: 'scale',
				closeIcon: true,
				type: 'orange',
				buttons: {
					'confirm': {
						text: get_strings.ok, 
						action: function () {
							$.post(get_strings.ajax_url,	{action : 'delete_my_comment', mw_id:mw_id,comment_id:comment_id,security:get_strings.ajax_nonce}).done( function(response) 
							{
								if ( true === response.success ) {
									$("#"+comment_id).fadeOut("slow");
									notify('success', get_strings.congratulations, response.data.message);
								}
								else {
									notify('error', get_strings.whoops, response.data.message); 
								}
							});
						}
					},
					cancle: {
						text: get_strings.cancle,
					}
				}
			});
		  return false;			
	  });
	  

		if ($('#timezone').is('.my-zones'))
    {
        var tzones = get_strings.t_path + "/libs/js/zones.json";
        $.get(tzones, function (data)
        {
            typeof $.typeahead === 'function' && $.typeahead({
                input: ".myzones-t",
                minLength: 0,
                emptyTemplate: get_strings.no_r_for + "{{query}}",
                searchOnFocus: true,
                blurOnTab: true,
                order: "asc",
                hint: true,
                source: data,
                debug: false,
            });
        }, 'json');
    }
	
	  
  	if ($('.for_single_pages').is('.short-multi'))
    {
		var type = $("input[name='widget_type']").val();
        $('.short-multi').typeahead({
            minLength: 1,
            hint: true,
            maxItem: 15,
            order: "asc",
            dynamic: true,
            delay: 200,
            emptyTemplate: get_strings.no_r_for + "{{query}}",
            source: {
                listings: {
                    href: "{{link}}",
                    display: ["with_title"],
                    ajax: [{type: "GET", url: get_strings.ajax_url, data: {q: '{{query}}', type:type, action: 'fetch_suggestions_widget'}}, "data.listings"],
                    template: '<span class="row">' + '<span class="search-avatar">' + '<img src="{{img}}" alt="{{with_title}}" >' + "</span>" + '<span class="l-title">{{with_title}} </span>' + "</span>",
                },
            },
        });
    }
	
	if ($('.mw_get_smple').is('.is_smple'))
    {
        $('.is_smple').typeahead({
            minLength: 1,
            hint: true,
            maxItem: 15,
            order: "asc",
            dynamic: true,
            delay: 200,
            emptyTemplate: get_strings.no_r_for + "{{query}}",
            source: {
                listings: {
                    href: "{{link}}",
                    display: ["with_title"],
                    ajax: [{type: "GET", url: get_strings.ajax_url, data: {q: '{{query}}',action: 'fetch_suggestions_shortcode'}}, "data.listings"],
                    template: '<span class="row">' + '<span class="search-avatar">' + '<img src="{{img}}" alt="{{with_title}}" >' + "</span>" + '<span class="l-title">{{with_title}} </span>' + "</span>",
                },
            },
        });
    }
	
	if ($('.agent_get_smple').is('.is_ag_search'))
    {
        $('.is_ag_search').typeahead({
            minLength: 1,
            hint: true,
            maxItem: 15,
            order: "asc",
            dynamic: true,
            delay: 200,
            emptyTemplate: get_strings.no_r_for + "{{query}}",
            source: {
                listings: {
                    href: "{{link}}",
                    display: ["with_title"],
                    ajax: [{type: "GET", url: get_strings.ajax_url, data: {q: '{{query}}',action: 'fetch_suggestions_shortcode_agents'}}, "data.listings"],
                    template: '<span class="row">' + '<span class="search-avatar">' + '<img src="{{img}}" alt="{{with_title}}" >' + "</span>" + '<span class="l-title">{{with_title}} </span>' + "</span>",
                },
            },
        });
    }
	
	if ($('.agency_get_smple').is('.is_agency_search'))
    {
        $('.is_agency_search').typeahead({
            minLength: 1,
            hint: true,
            maxItem: 15,
            order: "asc",
            dynamic: true,
            delay: 200,
            emptyTemplate: get_strings.no_r_for + "{{query}}",
            source: {
                listings: {
                    href: "{{link}}",
                    display: ["with_title"],
                    ajax: [{type: "GET", url: get_strings.ajax_url, data: {q: '{{query}}',action: 'fetch_suggestions_shortcode_agency'}}, "data.listings"],
                    template: '<span class="row">' + '<span class="search-avatar">' + '<img src="{{img}}" alt="{{with_title}}" >' + "</span>" + '<span class="l-title">{{with_title}} </span>' + "</span>",
                },
            },
        });
    }
	  
	 
	  
	  if($('.mw_get_propz ').is('.for_dash'))
	  {
			$('.mw_get_propz').typeahead({
				minLength: 1,
				hint: true,
				maxItem: 15,
				order: "asc",
				dynamic: true,
				delay: 200,
				emptyTemplate: get_strings.no_r_for + "{{query}}",
				source: {
					listings: {
						display: ["with_title"],
						ajax: [{type: "post",url: get_strings.ajax_url,data:{ q: '{{query}}', action: 'my_propz', form:$( "form#se" ).serialize()}},"data.listings"],
						template:  '<span class="row">' +'<span class="search-avatar">' +'<img src="{{img}}" alt="{{with_title}}" >' +"</span>" +'<span class="l-title">{{with_title}} </span>'+"</span>",
					}
				},
			});
		}
		
		if($('.mw_agentz ').is('.for_dash'))
	    {
			$('.mw_agentz').typeahead({
				minLength: 1,
				hint: true,
				maxItem: 15,
				order: "asc",
				dynamic: true,
				delay: 200,
				emptyTemplate: get_strings.no_r_for + "{{query}}",
				source: {
					listings: {
						display: ["with_title"],
						ajax: [{type: "post",url: get_strings.ajax_url,data:{ q: '{{query}}', action: 'my_agentz'}},"data.listings"],
						template:  '<span class="row">' +'<span class="search-avatar my-agenz">' +'<img src="{{img}}" alt="{{with_title}}" >' +"</span>" +'<span class="l-title">{{with_title}} </span>'+"</span>",
					}
				},
			});
		}
		
		
	if ($('.for_main_hero').is('.specific_search'))
    {
        $('.for_main_hero').typeahead({
            minLength: 1,
            hint: true,
            maxItem: 15,
            order: "asc",
            dynamic: true,
            delay: 200,
            emptyTemplate: get_strings.no_r_for + "{{query}}",
            source: {
                listings: {
                    href: "{{link}}",
                    display: ["with_title"],
                    ajax: [{type: "GET", url: get_strings.ajax_url, data: {q: '{{query}}', action: 'fetch_suggestions'}}, "data.listings"],
                    template: '<span class="search-avatar">' + '<img src="{{img}}" alt="{{with_title}}" >' + "</span>" + '<span class="l-title">{{with_title}} </span>',
                },
                categories: {
                    display: ["cat_name"],
                    ajax: [{type: "GET", url: get_strings.ajax_url, data: {q: '{{query}}', action: 'fetch_suggestions'}}, "data.categories"],
                    template: '<span class="search-catz"><i class="clr-yal fas fa-tag"></i></span> <span>{{cat_name}}</span>',
                },
            },
            callback: {
                onCancel: function (node, event) {
                    $("input[name='by_title']").val('');
                    $("input[name='category']").val('');
                },
                onResult: function (node, q, result, resultCount) {
                    if (q === "")
                        return;
                    if (result.length > 0) {
                        $("input[name='by_title']").val(q);
                        $("input[name='category']").val('');
                    } else {
                        $("input[name='by_title']").val(q);
                        $("input[name='category']").val('');
                    }
                },
                onClickAfter: function (node, a, item, event) {
                    $("iinput[name='category']").val('');
                    $("input[name='by_title']").val('');
                    if (item.group === "categories")
                    {
                        $("input[name='by_title']").val('');
                        $("input[name='category']").val(item.id);
                    } 
					else
                    {
                        $("input[name='category']").val('');
                        $("input[name='by_title']").val('');
                    }
                }
            }
        });
    }

		
		var myLanguage = {
		 	errorTitle: get_strings.submission_fail,
		};
		
		
		

		/*Dashboard Review Reply */
		$(document.body).on('submit', '.dashboard-review', function(e){
				e.preventDefault();
				var comment_id = $(this).attr("data-comment-id");
				$('.sonu-button-'+comment_id).buttonLoader('start');
				$(".sonu-button-"+comment_id).attr("disabled", true);	
				$.post(get_strings.ajax_url,{action : 'mw_listing_rating_reply', comment_id:comment_id, collect_data:$(this).serialize()}).done( function(response) 
				{
					$('.sonu-button-'+comment_id).buttonLoader('stop');
					$(".sonu-button-"+comment_id).attr("disabled", false);
					if (true === response.success) {
						notify('success', get_strings.congratulations, response.data.message);
						window.location.reload(true);
					}
					else {
						 notify('error', get_strings.whoops, response.data.message);
					}
				});
				
		});
		/*Dashboard Review Update */
		$(document.body).on('submit', '.mw_updatemy_reply', function(e){
			e.preventDefault();
			var comment_id = $(this).attr("data-comment-id");
			$('.sonu-button-'+comment_id).buttonLoader('start');
			$(".sonu-button-"+comment_id).attr("disabled", true);
			$.post(get_strings.ajax_url,{action : 'mw_update_submitted_reply', comment_id:comment_id, collect_data:$(this).serialize()}).done( function(response) 
				{
					$('.sonu-button-'+comment_id).buttonLoader('stop');
					$(".sonu-button-"+comment_id).attr("disabled", false);
					if (true === response.success) {
						notify('success', get_strings.congratulations, response.data.message);
						window.location.reload(true);
					}
					else {
						 notify('error', get_strings.whoops, response.data.message);
					}
				});
				
		});
		
		/*Dashboard Profile Submiited Review Update */
		$(document.body).on('submit', '.mw_updatemy_profilereply', function(e){
			e.preventDefault();
			var comment_id = $(this).attr("data-comment-id");
			$('.sonu-button-'+comment_id).buttonLoader('start');
			$(".sonu-button-"+comment_id).attr("disabled", true);
			$.post(get_strings.ajax_url,{action : 'mw_profile_update_submitted_reply', comment_id:comment_id, collect_data:$(this).serialize()}).done( function(response) 
				{
					$('.sonu-button-'+comment_id).buttonLoader('stop');
					$(".sonu-button-"+comment_id).attr("disabled", false);
					if (true === response.success) {
						notify('success', get_strings.congratulations, response.data.message);
						window.location.reload(true);
					}
					else {
						 notify('error', get_strings.whoops, response.data.message);
					}
				});
				
		});
		
		$('.parent-make').on('change', function ()
		{
			$('.ajax-spinner.mw-sec').addClass('fas fa-circle-notch fa-spin');
			$(".second-cat-level .select2-selection--single").css("opacity", ".6");
			var cat_parent = $(this).val();
			$("input[name=category]").val(cat_parent);
			$.post(get_strings.ajax_url,{action : 'mw_get_categores', cat_parent:cat_parent}).done( function(response) 
			{
				$('.ajax-spinner.mw-sec').removeClass('fas fa-circle-notch fa-spin');
				$(".second-cat-level .select2-selection--single").css("opacity", "1"); 
				if (true === response.success) {
					$('.make-model').prop("disabled", false);
					$('.make-model').html(response.data.result);
				}
				else
				{
					$('.make-model').prop("disabled", true);
				}
			});
			
		});
		$('.model-second').on('change', function ()
		{
			var model_cat_parent = $(this).val();
			$("input[name=category]").val(model_cat_parent);
		});
		
		/*Sechudle a tour */
		$.validate({
				form : '#mw_schedule_tour',
				modules : 'sanitize',
				validateOnBlur : false, 
				errorMessagePosition : 'top',
				scrollToTopOnError : true, 
				language : myLanguage,
				onSuccess : function() {
				$('.sonu-button').buttonLoader('start');
				$(".sonu-button").attr("disabled", true);	
				$.post(get_strings.ajax_url,{action : 'mw_schedule_tour', collect_data:$( "form[name='schedule_tour']").serialize()}).done( function(response) 
				{
					$("#mw_schedule_tour")[0].reset();
					$('.sonu-button').buttonLoader('stop');
					$(".sonu-button").attr("disabled", false);
					if (true === response.success) {
						notify('success', get_strings.congratulations, response.data.message);
					}
					else {
						 notify('error', get_strings.whoops, response.data.message);
					}
				});
				  return false;
				}
			});	
		
		/*Single Pafe Sidebar Contact */
		$.validate({
				form : '#mw_contact_author',
				modules : 'sanitize',
				validateOnBlur : false, 
				errorMessagePosition : 'top',
				scrollToTopOnError : true, 
				language : myLanguage,
				onSuccess : function() {
				$('.sonu-button-contact').buttonLoader('start');
				$(".sonu-button-contact").attr("disabled", true);	
				$.post(get_strings.ajax_url,{action : 'mw_contact_author', collect_data:$( "form[name='contact_author']").serialize()}).done( function(response) 
				{
					
					$('.sonu-button-contact').buttonLoader('stop');
					$(".sonu-button-contact").attr("disabled", false);
					if (true === response.success) {
						$("#mw_contact_author")[0].reset();
						notify('success', get_strings.congratulations, response.data.message);
					}
					else {
						 notify('error', get_strings.whoops, response.data.message);
					}
				});
				  return false;
				}
			});	
			
		/*Single Page Sidebar Agent-User-Agency Contact */
		$.validate({
			    form : '#make_an_offer',
				validateOnBlur : false, 
				errorMessagePosition : 'false',
				scrollToTopOnError : false, 
				showErrorDialogs : false,
				language : myLanguage,
				onSuccess : function() {
				$('.make-button').buttonLoader('start');
				$(".make-button").attr("disabled", true);	
				$.post(get_strings.ajax_url,{action : 'mw_make_an_offer', collect_data:$( "form[name='make_an_offer']").serialize()}).done( function(response) 
				{
					$('.make-button').buttonLoader('stop');
					$(".make-button").attr("disabled", false);
					if (true === response.success) {
						$("#make_an_offer")[0].reset();
						notify('success', get_strings.congratulations, response.data.message);
					}
					else {
						 notify('error', get_strings.whoops, response.data.message);
					}
				});
				  return false;
				}
			});	
		  $.validate({
			    form : '#sch_an_offer',
				validateOnBlur : false, 
				errorMessagePosition : 'false',
				scrollToTopOnError : false, 
				showErrorDialogs : false,
				language : myLanguage,
				onSuccess : function() {
				$('.sch-button').buttonLoader('start');
				$(".sch-button").attr("disabled", true);	
				$.post(get_strings.ajax_url,{action : 'mw_sch_an_offer', collect_data:$( "form[name='sch_an_offer']").serialize()}).done( function(response) 
				{
					$('.sch-button').buttonLoader('stop');
					$(".sch-button").attr("disabled", false);
					if (true === response.success) {
						$("#sch_an_offer")[0].reset();
						notify('success', get_strings.congratulations, response.data.message);
					}
					else {
						 notify('error', get_strings.whoops, response.data.message);
					}
				});
				  return false;
				}
			});	
			
		$.validate({
			    form : '#mw_singlecontact_author',
				validateOnBlur : false, 
				errorMessagePosition : 'top',
				scrollToTopOnError : true, 
				showErrorDialogs : false,
				language : myLanguage,
				onSuccess : function() {
				$('.sonu-button').buttonLoader('start');
				$(".sonu-button").attr("disabled", true);	
				$.post(get_strings.ajax_url,{action : 'mw_singlecontact_author', collect_data:$( "form[name='contact_author']").serialize()}).done( function(response) 
				{
					
					$('.sonu-button').buttonLoader('stop');
					$(".sonu-button").attr("disabled", false);
					if (true === response.success) {
						$("#mw_singlecontact_author")[0].reset();
						notify('success', get_strings.congratulations, response.data.message);
					}
					else {
						 notify('error', get_strings.whoops, response.data.message);
					}
				});
				  return false;
				}
			});	
			
		/*Listing Review */
		$.validate({
				form : '#mw_listing_rating',
				modules : 'sanitize',
				validateOnBlur : false, 
				errorMessagePosition : 'top',
				scrollToTopOnError : true, 
				language : myLanguage,
				onSuccess : function() {
				$('.review-button').buttonLoader('start');
				$(".review-button").attr("disabled", true);	
				$.post(get_strings.ajax_url,{action : 'mw_listing_rating', collect_data:$( "form[name='listing_rating']").serialize()}).done( function(response) 
				{
					$("#mw_listing_rating")[0].reset();
					$('.review-button').buttonLoader('stop');
					$(".review-button").attr("disabled", false);
					if (true === response.success) {
						notify('success', get_strings.congratulations, response.data.message);
						window.location.reload(true);
					}
					else {
						 notify('error', get_strings.whoops, response.data.message);
					}
				});
				  return false;
				}
			});
			
		/*Agency(Agent) Review */
		$.validate({
				form : '#agency_agent_rating',
				modules : 'sanitize',
				validateOnBlur : false, 
				errorMessagePosition : 'top',
				scrollToTopOnError : true, 
				language : myLanguage,
				onSuccess : function() {
				$('.review-button').buttonLoader('start');
				$(".review-button").attr("disabled", true);	
				$.post(get_strings.ajax_url,{action : 'save_my_feedback_rating', collect_data:$( "form[name='agency_agent_rating']").serialize()}).done( function(response) 
				{
					$('.review-button').buttonLoader('stop');
					$(".review-button").attr("disabled", false);
					if (true === response.success) {
						$("#agency_agent_rating")[0].reset();
						notify('success', get_strings.congratulations, response.data.message);
						window.location.reload(true);
					}
					else {
						 notify('error', get_strings.whoops, response.data.message);
					}
				});
				  return false;
				}
			});


		/*Agent Registration*/
		$.validate({
				form : '#agent_submission',
				modules : 'sanitize',
				validateOnBlur : false, 
				errorMessagePosition : 'top',
				scrollToTopOnError : true, 
				language : myLanguage,
				onSuccess : function() {
				$.post(get_strings.ajax_url,{action : 'mw_user_registration', collect_data:$( "form[name='agent_submission']").serialize()}).done( function(response) 
				{
                    
					if (true === response.success) {
						notify('success', get_strings.congratulations, response.data.message);
						window.location.reload(true);
					}
					else {
						 notify('error', get_strings.whoops, response.data.message);
					}
				});
				  return false;
				}
			});
			
		
		if ($( ".custom-fields-theme-selects" ).length > 0) {$('.custom-fields-theme-selects').select2({ width:'100%',theme: "classic"});}
		if ($( ".custom-range-slider" ).length > 0){$(".custom-range-slider").ionRangeSlider({skin: "round"});}
		
		/*Agent Up*/	
		$.validate({
				form : '#agent_update',
				modules : 'sanitize',
				validateOnBlur : false, 
				errorMessagePosition : 'top',
				scrollToTopOnError : true, 
				language : myLanguage,
				onSuccess : function() {
				$('.sonu-button').buttonLoader('start');
				$(".sonu-button").attr("disabled", true);
					
				$.post(get_strings.ajax_url,{action : 'mw_agent_update', collect_data:$( "form[name='agent_update']").serialize()}).done( function(response) 
				{
					$('.sonu-button').buttonLoader('stop');
					$(".sonu-button").attr("disabled", false);
					if (true === response.success) {
						notify('success', get_strings.congratulations, response.data.message);
						window.location.reload(true);
					}
					else {
						notify('error', get_strings.whoops, response.data.message);
					}
				});
				  return false;
				}
			});
			
		
        
            $('#cat_parent').on('change', function ()
            {
				$('.theme-row.mw-1 .wrap').LoadingOverlay("show");
                var cat_parent = $(this).val();
                $.post(get_strings.ajax_url,{action : 'mw_get_categores', cat_parent:cat_parent}).done( function(response) 
                {
                    $("#level-1").val('');
                    $("#level-2").val('');
                    $("#level-3").val('');
                    $('.theme-row.mw-1 .wrap').LoadingOverlay("hide");
                    if (true === response.success) {
                    
                        $('#cat-level-1').css("display", "block");
                        $('#level-1').html(response.data.result);
                        $('#cat-level-2').css("display", "none");
                        $('#cat-level-3').css("display", "none");
                    }
                    else
                    {
                        $('#cat-level-1').css("display", "none");
                        $('#cat-level-2').css("display", "none");
                        $('#cat-level-3').css("display", "none");
                    }
                });
				//fields
				$.post(get_strings.ajax_url,{action : 'mw_get_custom', cat_parent:cat_parent}).done( function(response) 
				{
					$('.mx-custom-fields').css("display", "block");
					$('.mx-custom-fields').LoadingOverlay("show");
					if (true === response.success) {
						$('.mx-custom-fields').LoadingOverlay("hide");
						$('.mx-custom-fields').css("display", "block");
                        $('#dynamic-custom-fields').html(response.data.fields);
						if ($( ".custom-fields-theme-selects" ).length > 0) {$('.custom-fields-theme-selects').select2({ width:'100%',theme: "classic"});}
						if ($( ".custom-range-slider" ).length > 0){$(".custom-range-slider").ionRangeSlider({skin: "round"});}
					}
					else
					{
						$('.mx-custom-fields').LoadingOverlay("hide");
						$('.mx-custom-fields').css("display", "none");
					}
				});
            });
        
            $('#level-1').on('change', function ()
            {
				$('#cat-level-3').css("display", "none");
                $('.theme-row.mw-2 .wrap').LoadingOverlay("show");
                var cat_parent = $(this).val();
                $.post(get_strings.ajax_url,{action : 'mw_get_categores', cat_parent:cat_parent}).done( function(response) 
                {
                    $("#level-2").val('');
                    $("#level-3").val('');
                    $('.theme-row.mw-2 .wrap').LoadingOverlay("hide");
                    if (true === response.success) {
                    
                        $('#cat-level-2').css("display", "block");
                        $('#level-2').html(response.data.result);
                    }
                    else
                    {
                        $('#cat-level-2').css("display", "none");
                        $('#cat-level-3').css("display", "none");
                    }
                });
				//fields
				$.post(get_strings.ajax_url,{action : 'mw_get_custom', cat_parent:cat_parent}).done( function(response) 
				{
					$('.mx-custom-fields').css("display", "block");
					$('.mx-custom-fields').LoadingOverlay("show");
					if (true === response.success) {
						$('.mx-custom-fields').LoadingOverlay("hide");
						$('.mx-custom-fields').css("display", "block");
                        $('#dynamic-custom-fields').html(response.data.fields);
						if ($( ".custom-fields-theme-selects" ).length > 0) {$('.custom-fields-theme-selects').select2({ width:'100%',theme: "classic"});}
						if ($( ".custom-range-slider" ).length > 0){$(".custom-range-slider").ionRangeSlider({skin: "round"});}
					}
					else
					{
						$('.mx-custom-fields').LoadingOverlay("hide");
						$('.mx-custom-fields').css("display", "none");
					}
				});

            });
        
            $('#level-2').on('change', function ()
            {
                $('.theme-row.mw-3 .wrap').LoadingOverlay("show");
                var cat_parent = $(this).val();
                $.post(get_strings.ajax_url,{action : 'mw_get_categores', cat_parent:cat_parent}).done( function(response) 
                {
                    $("#level-3").val('');
                    $('.theme-row.mw-3 .wrap').LoadingOverlay("hide");
                    if (true === response.success) {
                    
                        $('#cat-level-3').css("display", "block");
                        $('#level-3').html(response.data.result);
                    }
                    else
                    {
                        $('#cat-level-3').css("display", "none");
                    }
                });
				//fields
				$.post(get_strings.ajax_url,{action : 'mw_get_custom', cat_parent:cat_parent}).done( function(response) 
				{
					$('.mx-custom-fields').css("display", "block");
					$('.mx-custom-fields').LoadingOverlay("show");
					if (true === response.success) {
						$('.mx-custom-fields').LoadingOverlay("hide");
						$('.mx-custom-fields').css("display", "block");
                        $('#dynamic-custom-fields').html(response.data.fields);
						if ($( ".custom-fields-theme-selects" ).length > 0) {$('.custom-fields-theme-selects').select2({ width:'100%',theme: "classic"});}
						if ($( ".custom-range-slider" ).length > 0){$(".custom-range-slider").ionRangeSlider({skin: "round"});}
					}
					else
					{
						$('.mx-custom-fields').LoadingOverlay("hide");
						$('.mx-custom-fields').css("display", "none");
					}
				});

            });
			
			/*User Registration*/
			$.validate({
				form : '#signupForm',
				modules : 'sanitize',
				validateOnBlur : false, 
				 showErrorDialogs : false, 
				language : myLanguage,
				onSuccess : function() {
				$('.sonu-button').buttonLoader('start');
				$(".sonu-button").attr("disabled", true);
				$.post(get_strings.ajax_url,{action : 'mw_user_registration', collect_data:$( "form[name='signupForm']").serialize()}).done( function(response) 
				{
                    Pace.restart();
					$('.sonu-button').buttonLoader('stop');
					$(".sonu-button").attr("disabled", false);
					if (true === response.success) {
						notify('success', get_strings.congratulations, response.data.message);
						window.location = response.data.page_link;
					}
					else {
						notify('error', get_strings.whoops, response.data.message);
					}
				});
				  return false;
				}
			});
			
			/*User Login*/
			$.validate({
				form : '#signinForm',
				modules : 'sanitize',
				validateOnBlur : false, 
				 showErrorDialogs : false, 
				language : myLanguage,
				onSuccess : function() {
				$('.sonu-button').buttonLoader('start');
				$(".sonu-button").attr("disabled", true);
				$.post(get_strings.ajax_url,{action : 'mw_user_login', collect_data:$( "form[name='signinForm']").serialize()}).done( function(response) 
				{
					$('.sonu-button').buttonLoader('stop');
					$(".sonu-button").attr("disabled", false);
					if (true === response.success) {
						notify('success', get_strings.congratulations, response.data.message);
						window.location = response.data.page_link;
					}
					else {
						notify('error', get_strings.whoops, response.data.message);
					}
				});
				  return false;
				}
			});
			
			/*Forgot Password*/
			$.validate({
				form : '#forgetPass',
				modules : 'sanitize',
				validateOnBlur : false, 
				showErrorDialogs : false, 
				language : myLanguage,
				onSuccess : function() {
				$('.btn-reset').buttonLoader('start');
				$(".btn-reset").attr("disabled", true);
				$.post(get_strings.ajax_url,{action : 'mw_forgot_pass', collect_data:$( "form[name='forgetPass']").serialize()}).done( function(response) 
				{
					$("#forgetPass")[0].reset();
        			
					$('.btn-reset').buttonLoader('stop');
					$(".btn-reset").attr("disabled", false);
					if (true === response.success) {
						$("#resetmypass").modal("hide");
						notify('success', get_strings.congratulations, response.data.message);
					}
					else {
						notify('error', get_strings.whoops, response.data.message);
					}
					
				});
				  return false;
				}
			});
			/*Reset My New Password */
			$.validate({
				form : '#mynewPass',
				modules : 'sanitize',
				validateOnBlur : false, 
				showErrorDialogs : false, 
				language : myLanguage,
				onSuccess : function() {
				$('.btn-reset-new').buttonLoader('start');
				$(".btn-reset-new").attr("disabled", true);
				$.post(get_strings.ajax_url,{action : 'mw_forgot_pass_new', collect_data:$( "form[name='mynewPass']").serialize()}).done( function(response) 
				{
					$("#mynewPass")[0].reset();
        			
					$('.btn-reset-new').buttonLoader('stop');
					$(".btn-reset-new").attr("disabled", false);
					if (true === response.success) {
						$("#mynewpass").modal("hide");
						notify('success', get_strings.congratulations, response.data.message);
					}
					else {
						notify('error', get_strings.whoops, response.data.message);
					}
				});
				  return false;
				}
			});
			/*User Roles Update */
			$.validate({
				form : '#myuser_type',
				modules : 'sanitize',
				validateOnBlur : false,
				showErrorDialogs : false,
				language : myLanguage,
				onSuccess : function() {
				$('.btn-role').buttonLoader('start');
				$(".btn-role").attr("disabled", true);
				$.post(get_strings.ajax_url,{action : 'mw_usertype_new', collect_data:$( "#myuser_type").serialize()}).done( function(response)
				{
					$("#myuser_type")[0].reset();
        			
					$('.btn-role').buttonLoader('stop');
					$(".btn-role").attr("disabled", false);
					if (true === response.success) {
						$("#check_userrole").modal("hide");
						notify('success', get_strings.congratulations, response.data.message);
						window.location = response.data.page_link;
					}
					else {
						notify('error', get_strings.whoops, response.data.message);
					}
				});
				  return false;
				}
			});

		
		/*Checking Hello*/
		if (typeof hello != 'undefined')
		{
			if(typeof(get_strings.social_logins) !== 'undefined' && get_strings.social_logins !== null && get_strings.social_logins == 1)
			{
				$(document.body).on("click", '.btn-face', function ()
    			{
					hello.on('auth.login', function(auth)
					{
						console.log(auth);
						$('.fb-btn').buttonLoader('start');
						$(".fb-btn").attr("disabled", true);
						 hello(auth.network).api('me').then(function(r)
						 {
							 $.post(get_strings.ajax_url,{action : 'mw_user_registration_social',email:r.email,name:r.name,token:auth.access_token}).done( function(response) 
							 {
								$('.fb-btn').buttonLoader('stop');
								$(".fb-btn").attr("disabled", false);
								if (true === response.success) {
									notify('success', get_strings.congratulations, response.data.message);
									window.location = response.data.page_link;
								}
								else {
									notify('error', get_strings.whoops, response.data.message);
								}
							 });
							 // return false;
							
						 },function(e)
						 {
							$('.fb-btn').buttonLoader('stop');
							$(".fb-btn").attr("disabled", false);
							notify('error', get_strings.whoops, e.error.message);
    					 });
					});
					 return false;
				});
				
				$(document.body).on("click", '.btn-google', function ()
    			{
					hello.on('auth.login', function(auth)
					{
						//console.log(auth);
						$('.gog-btn').buttonLoader('start');
						$(".gog-btn").attr("disabled", true);
						 hello(auth.network).api('me').then(function(r)
						 {
                             var access_token = hello(auth.network).getAuthResponse().access_token;
                             var sb_network = hello(auth.network).getAuthResponse().network;
							 $.post(get_strings.ajax_url,{action : 'mw_user_registration_social',email:r.email,name:r.name,access_token:access_token,sb_network:sb_network}).done( function(response) 
							 {
								$('.gog-btn').buttonLoader('stop');
								$(".gog-btn").attr("disabled", false);
								if (true === response.success) {
									notify('success', get_strings.congratulations, response.data.message);
									window.location = response.data.page_link;
								}
								else {
									notify('error', get_strings.whoops, response.data.message);
								}
							 });
							 // return false;
							
						 },function(e)
						 {
							$('.gog-btn').buttonLoader('stop');
							$(".gog-btn").attr("disabled", false);
							notify('error', get_strings.whoops, e.error.message);
    					 });
					});
					 return false;
				});
				if(get_strings.fb_key !="" && get_strings.google_key =="")
				{
					hello.init({facebook: get_strings.fb_key}, 
					{
						redirect_uri: get_strings.redirect_url,
					});
				}
				else if(get_strings.google_key !="" && get_strings.fb_key =="")
				{
					hello.init({google: get_strings.google_key}, 
					{
						redirect_uri: get_strings.redirect_url,
					});
				}
				else
				{
					hello.init({facebook: get_strings.fb_key,google: get_strings.google_key,}, 
					{
						redirect_uri: get_strings.redirect_url,
					});
				}
			}
		}
		
		/*Location On Agency Agent Buyer Detail*/
		var chk_singlemapcontainer =  document.getElementById('detial_map_single');
		if (typeof(chk_singlemapcontainer) !== 'undefined' && chk_singlemapcontainer !== null && get_strings.is_map_enabled == 1)
		{
			var map_lat =  get_strings.map_latt;
			var map_long = get_strings.map_long;
			if(get_strings.map_type == 'open_street')
			{
					var single_detailmap = L.map(chk_singlemapcontainer).setView([map_lat,map_long], 13);
						L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
						 maxZoom: 18,
					}).addTo(single_detailmap);
					var custom_icon = L.icon({
						iconUrl: get_strings.p_path+'libs/images/map-marker.png',
						iconSize: [50, 50],
        			});
					single_detailmap.scrollWheelZoom.disable();
					L.marker([map_lat,map_long],{draggable: false,icon: custom_icon}).addTo(single_detailmap); 
					single_detailmap.invalidateSize();
			}
			if(get_strings.map_type == 'google_map' && get_strings.gapp_keyz !='')
			{
				 google.maps.event.addDomListener(window, 'load', places_google_map_single(map_lat,map_long));
				 function places_google_map_single(map_lat,map_long)
				 {
					if(map_lat !=="" && map_long !=="")
					{
						var map_center_positionr = new google.maps.LatLng(map_lat,map_long);
						var mapOptions = {
							zoom: 13,
							center: map_center_positionr,
							disableDefaultUI: false
						};
						var map = new google.maps.Map(chk_singlemapcontainer, mapOptions);
						var get_markers = new google.maps.Marker({
							position: map_center_positionr,
							map: map,
							icon: get_strings.p_path+'libs/images/map-marker.png',
							labelAnchor: new google.maps.Point(1, 1),
							draggable: false,
							animation: google.maps.Animation.DROP,
						});
					}
				 }
			 }
			if(get_strings.map_type == 'mapbox')
			{
				 if (typeof(get_strings.acc_keyz) !== 'undefined' && get_strings.acc_keyz !== '')
				 {
					 places_mapbox_map_single(map_lat,map_long);
					 function places_mapbox_map_single(map_lat,map_long)
					 {
						if(map_lat !=="" && map_long !=="")
						{
							mapboxgl.accessToken = get_strings.acc_keyz;	
							var mapz = new mapboxgl.Map({
								container: chk_singlemapcontainer,
								style: 'mapbox://styles/mapbox/streets-v11',
								center: [map_long, map_lat],
								zoom: 13
							});
							var mapbox_marker = new mapboxgl.Marker({draggable: false, color: 'orange'}).setLngLat([map_long, map_lat]).addTo(mapz);
						}
					 }
				 }
			 }
		}
		
		
		/*Location On Single Detail*/
		var chk_mapcontainer =  document.getElementById('maxwheels_map_single');
		if (typeof(chk_mapcontainer) !== 'undefined' && chk_mapcontainer !== null && get_strings.is_map_enabled == 1)
		{
			 var map_lat =  get_strings.map_latt_listing;
			 var map_long = get_strings.map_long_listing;
			 if(get_strings.map_type == 'open_street')
			 {
					var singlemap = L.map(chk_mapcontainer).setView([map_lat,map_long], 13);
						L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
						 maxZoom: 18,
					}).addTo(singlemap);
					var custom_icon = L.icon({
						iconUrl: get_strings.p_path+'libs/images/map-marker.png',
						iconSize: [50, 50],
        			});
					singlemap.scrollWheelZoom.disable();
					L.marker([map_lat,map_long],{draggable: false,icon: custom_icon}).addTo(singlemap); 
					singlemap.invalidateSize();
			 }
			 if(get_strings.map_type == 'mapbox')
			 {
				 if (typeof(get_strings.acc_keyz) !== 'undefined' && get_strings.acc_keyz !== '')
				 {
					 places_mapbox_map_single(map_lat,map_long);
					 function places_mapbox_map_single(map_lat,map_long)
					 {
						if(map_lat !=="" && map_long !=="")
						{
							mapboxgl.accessToken = get_strings.acc_keyz;	
							var mapz = new mapboxgl.Map({
								container: chk_mapcontainer,
								style: 'mapbox://styles/mapbox/streets-v11',
								center: [map_long, map_lat],
								zoom: 13
							});
							var mapbox_marker = new mapboxgl.Marker({draggable: false, color: 'orange'}).setLngLat([map_long, map_lat]).addTo(mapz);
						}
					 }
				 }
			 }
		}
		
		/*Generate Maps*/
		var chk_container =  document.getElementById('mw_map');
		if (typeof(chk_container) !== 'undefined' && chk_container !== null && get_strings.is_map_enabled == 1)
		{
			 var map_lat =  get_strings.map_latt_listing;
			 var map_long = get_strings.map_long_listing;
			 var listing_latt = parseFloat($('#mw_latt').val());
        	 var listing_long = parseFloat($('#mw_long').val());
			 if(listing_latt && listing_long)
			 {
				 map_lat = listing_latt;
				 map_long = listing_long;
			 }
					if(get_strings.map_type == 'open_street')
					{
						var mymap = L.map(chk_container).setView([map_lat,map_long], 13);
						L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
						maxZoom: 18,
					}).addTo(mymap);
					var custom_icon = L.icon({
						iconUrl: get_strings.p_path+'libs/images/map-marker.png',
						iconSize: [50, 50],
        			});
					var markerz = L.marker([map_lat,map_long],{draggable: true,icon: custom_icon}).addTo(mymap);
					var searchControl 	=	new L.Control.Search({
						url: '//nominatim.openstreetmap.org/search?format=json&q={s}',
						jsonpParam: 'json_callback',
						propertyName: 'display_name',
						propertyLoc: ['lat','lon'],
						marker: markerz,
						autoCollapse: false,
						autoType: true,
						minLength: 2,
						initial: false,
						collapsed: false
					});
					searchControl.on('search:locationfound', function(obj) {
						//console.log(obj.latlng);
						var lt	=	obj.latlng + '';
						var res = lt.split( "LatLng(" );
						res = res[1].split( ")" );
						res = res[0].split( "," );
						document.getElementById('mw_latt').value = res[0];
						document.getElementById('mw_long').value = res[1];
					});
					mymap.addControl( searchControl );
					markerz.on('dragend', function (e) {
					  document.getElementById('mw_latt').value = markerz.getLatLng().lat;
					  document.getElementById('mw_long').value = markerz.getLatLng().lng;
					});
				}
					if(get_strings.map_type == 'google_map' && get_strings.gapp_keyz !='')
					{
						google.maps.event.addDomListener(window, 'load', places_google_map(map_lat,map_long));
						//return false;
					}
					if(get_strings.map_type == 'mapbox')
					{
						if (typeof(get_strings.acc_keyz) !== 'undefined' && get_strings.acc_keyz !== '')
						{
							places_mapbox_map(map_lat,map_long);
						}
					}
		}





		/*sidebar Map*/
		var chk_sidebarmap =  document.getElementById('sidebar_map');
		if (typeof(chk_sidebarmap) !== 'undefined' && chk_sidebarmap !== null && get_strings.is_map_enabled == 1)
		{
			var map_lat =  get_strings.map_latt_dealer;
			var map_long = get_strings.map_long_dealer;
			if(get_strings.map_type == 'open_street')
			{
				var single_detailmap = L.map(chk_sidebarmap).setView([map_lat,map_long], 13);
				L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					maxZoom: 18,
				}).addTo(single_detailmap);
				var custom_icon = L.icon({
					iconUrl: get_strings.p_path+'libs/images/map-marker.png',
					iconSize: [50, 50],
				});
				single_detailmap.scrollWheelZoom.disable();
				L.marker([map_lat,map_long],{draggable: false,icon: custom_icon}).addTo(single_detailmap);
				single_detailmap.invalidateSize();
			}
			if(get_strings.map_type == 'google_map' && get_strings.gapp_keyz !='')
			{
				google.maps.event.addDomListener(window, 'load', places_google_map_single(map_lat,map_long));
				function places_google_map_single(map_lat,map_long)
				{
					if(map_lat !=="" && map_long !=="")
					{
						var map_center_positionr = new google.maps.LatLng(map_lat,map_long);
						var mapOptions = {
							zoom: 13,
							center: map_center_positionr,
							disableDefaultUI: false
						};
						var map = new google.maps.Map(chk_sidebarmap, mapOptions);
						var get_markers = new google.maps.Marker({
							position: map_center_positionr,
							map: map,
							icon: get_strings.p_path+'libs/images/map-marker.png',
							labelAnchor: new google.maps.Point(1, 1),
							draggable: false,
							animation: google.maps.Animation.DROP,
						});
					}
				}
			}
			if(get_strings.map_type == 'mapbox')
			{
				if (typeof(get_strings.acc_keyz) !== 'undefined' && get_strings.acc_keyz !== '')
				{
					places_mapbox_map_single(map_lat,map_long);
					function places_mapbox_map_single(map_lat,map_long)
					{
						if(map_lat !=="" && map_long !=="")
						{
							mapboxgl.accessToken = get_strings.acc_keyz;
							var mapz = new mapboxgl.Map({
								container: chk_sidebarmap,
								style: 'mapbox://styles/mapbox/streets-v11',
								center: [map_long, map_lat],
								zoom: 13
							});
							var mapbox_marker = new mapboxgl.Marker({draggable: false, color: 'orange'}).setLngLat([map_long, map_lat]).addTo(mapz);
						}
					}
				}
			}
		}


		
		function places_google_map(map_lat,map_long)
		{
			if(map_lat !=="" && map_long !=="")
			{
				var map_center_positionr = new google.maps.LatLng(map_lat,map_long);
				var mapOptions = {
					zoom: 13,
					center: map_center_positionr,
					disableDefaultUI: false
				};
				var map = new google.maps.Map(chk_container, mapOptions);
				var get_markers = new google.maps.Marker({
					position: map_center_positionr,
					map: map,
					icon: get_strings.p_path+'libs/images/map-marker.png',
					labelAnchor: new google.maps.Point(1, 1),
					draggable: true,
					animation: google.maps.Animation.DROP,
				});
				var  geocoder = new google.maps.Geocoder();
				google.maps.event.addListener(get_markers, "dragend", function (event) {
				geocoder.geocode({latLng: get_markers.getPosition()}, function(responses) {
					//console.log(google.maps.GeocoderStatus);
					 if (responses && responses.length > 0) {
						$('#mw_address').val(responses[0].formatted_address);
						$('#mw_latt').val( get_markers.getPosition().lat() );
						$('#mw_long').val( get_markers.getPosition().lng() );
						return false;
					}	 
				 });
				});
				var places_input =  document.getElementById('mw_address');
				var autocomplete = new google.maps.places.Autocomplete(places_input);
				autocomplete.bindTo('bounds', map);
				google.maps.event.addListener(autocomplete, 'place_changed', function() {
					var fetch_places = autocomplete.getPlace();
					//console.log(fetch_places);
					if (!fetch_places.geometry) {
						return;
					}
					if (fetch_places.geometry.viewport) {
						map.fitBounds(fetch_places.geometry.viewport);
					} else {
						map.setCenter(fetch_places.geometry.location);
						map.setZoom(13);
					}
					get_markers.setPosition(fetch_places.geometry.location);
					get_markers.setVisible(true);
					$('#mw_latt').val( get_markers.getPosition().lat() );
					$('#mw_long').val( get_markers.getPosition().lng() );
				});
			}
		}
			
			
		function places_mapbox_map(map_lat,map_long)
		{
			if(map_lat !=="" && map_long !=="")
			{
					mapboxgl.accessToken = get_strings.acc_keyz;	
							var mapz = new mapboxgl.Map({
								container: chk_container,
								style: 'mapbox://styles/mapbox/streets-v11',
								center: [map_long, map_lat],
								zoom: 13
							});
							var mapbox_marker = new mapboxgl.Marker({draggable: true, color: 'orange'}).setLngLat([map_long, map_lat]).addTo(mapz);
							function onDragEnd() {
								var lngLat = mapbox_marker.getLngLat();
								document.getElementById('mw_latt').value = lngLat.lat;
								document.getElementById('mw_long').value = lngLat.lng;
							}
							mapbox_marker.on('dragend', onDragEnd);
							var geocoder = new MapboxGeocoder({
									accessToken: mapboxgl.accessToken,
									zoom: 13,
									marker: {
										color: 'orange',
										draggable: true
									},
									mapboxgl: mapboxgl
						  });
							mapz.addControl(geocoder);
								  mapz.on('load', function() {
								  geocoder.on('result', function(e) {
									  geocoder.mapMarker.on('dragend', function(e)
									  {
									  	 //console.log(e.target.getLngLat());
										 document.getElementById('mw_latt').value = e.target.getLngLat().lat;
										 document.getElementById('mw_long').value = e.target.getLngLat().lng;
								  	  });
									// console.log(e.result); 
								  document.getElementById('mw_address').value = e.result.place_name;
								  document.getElementById('mw_latt').value = e.result.center[1];
								  document.getElementById('mw_long').value = e.result.center[0];
								  mapbox_marker.remove();
							  });
							});
			}
		}	
		
		
		/*get user current location*/
		if(typeof get_strings.ip_type != 'undefined' && get_strings.ip_type !="")
		{
		     $('.get-loc  i.detect-me').on('click', function(e) {
				 e.preventDefault();
				 $(this).addClass('fa-spinner fa-spin extra-spin');
				 $(this).removeClass('fa-location-arrow');
				 if(get_strings.ip_type == "geo_ip")
				 {
					 $.ajax({url: "https://geolocation-db.com/jsonp",jsonpCallback: "callback",dataType: "jsonp",success: function( location ) {
							 $("#mw_address").val(location.city + ", " + location.country_name);
							 if (typeof (chk_container) !== 'undefined' && chk_container !== null && get_strings.is_map_enabled == 1) {
								 if (document.getElementById('mw_latt') !== null || document.getElementById('mw_latt') === undefined) {
									 document.getElementById('mw_latt').value = location.latitude;
								 }
								 if (document.getElementById('mw_long') !== null || document.getElementById('mw_long') === undefined) {
									 document.getElementById('mw_long').value = location.longitude;
								 }
								 if (get_strings.map_type == "open_street") {
									 mymap.setView(new L.LatLng(location.latitude, location.longitude), 13);
									 markerz.setLatLng([location.latitude, location.longitude]);
								 }
								 if (get_strings.map_type == 'google_map' && get_strings.gapp_keyz != '') {
									 google.maps.event.addDomListener(window, 'load', places_google_map(location.latitude, location.longitude));
								 }
								 if (get_strings.map_type == 'mapbox' && get_strings.acc_keyz !== '') {
									 places_mapbox_map(location.latitude, location.longitude);
								 }
							 }
							 $('.get-loc i.detect-me').removeClass('fa-spinner fa-spin extra-spin');
							 $('.get-loc i.detect-me').addClass('fa-location-arrow');
						 }
					 });
				 }
				 else
				 {
					$.get("https://ipapi.co/json", function(location) {
						  $("#mw_address").val(location.city + ", " + location.country_name );
						 if (typeof(chk_container) !== 'undefined' && chk_container !== null && get_strings.is_map_enabled == 1)
						{
							 if(document.getElementById('mw_latt') !== null || document.getElementById('mw_latt') === undefined)
							 {
								  document.getElementById('mw_latt').value = location.latitude;
							 }
							 if(document.getElementById('mw_long') !== null || document.getElementById('mw_long') === undefined)
							 {
								  document.getElementById('mw_long').value = location.longitude;
							 }
							 if (get_strings.map_type == "open_street")
							 {
								 mymap.setView(new L.LatLng(location.latitude, location.longitude), 13);
                                 markerz.setLatLng([location.latitude, location.longitude]);
							 }
							 if(get_strings.map_type == 'google_map' && get_strings.gapp_keyz !='')
							 {
								google.maps.event.addDomListener(window, 'load', places_google_map(location.latitude,location.longitude));
							 }
							 if(get_strings.map_type == 'mapbox' && get_strings.acc_keyz !== '')
							 {
								 places_mapbox_map(location.latitude,location.longitude);
							 } 
						  }
						$('.get-loc i.detect-me').removeClass('fa-spinner fa-spin extra-spin');
						$('.get-loc i.detect-me').addClass('fa-location-arrow');
					 }, "json");
				 }
			 });
		}
		
		
      
		
	}
function calculate(){
  var value = $('#input_value').val();
  var downPayment = $('#input_down_payment').val();
  var l = value-downPayment;
  var interest = $('#input_interest').val();
  var r = (interest/100)/12;
  var duration = $('#input_duration').val();
  var n = duration; 
/*---- Basic Monthly Payment Calcutation  ----*/
  var P = l*r/ ( 1- Math.pow(1+r,-n) );
  var monthly_rate =  Math.round(r*100 * 100) / 100;
  var monthly_payment =Math.round(P * 100) / 100;
  var total_payment = Math.round(P*n * 100) / 100;
  var total_intrest = Math.round((P*n-l) * 100) / 100;
  var total_to_pay = 	parseFloat(l)+parseFloat(downPayment)+parseFloat(total_intrest);
/*---- Producing results in Card ----*/
  $('.listing-specs').show();
  $('#p-monthly-total').html(monthly_payment);
  $('#p-down-payment').html(downPayment);
  $('#totalPrincipalPaid').html(l);
  $('#totalInterestPaid').html(total_intrest);
  $('#totalamonuttopay').html(total_to_pay);
  
  
}
$('#mw-calculate').on('click', function () {
  calculate();
});


/* Re-initialize*/
function reloadMasonry()
{
	var $item = $('.grid');
    $item.imagesLoaded(function () {
		 $item.isotope();
		$item.masonry('reloadItems');
		$item.isotope('destroy');
        $item.isotope({
            itemSelector: '.grid-item',
            percentPosition: true,
            layoutMode: 'masonry',
            transitionDuration: '0.7s',
            masonry: {
                columnWidth: '.grid-item',
                 originLeft: false
            }
        });
    });
}

/*
	   * Assign role vendor to user on profile page.
		*/
		$('#role_as_vendor').on('click', function () {
			var user_id = $('#role_as_vendor').attr("data-user_id");
			var vendor_approve = $('#role_as_vendor').attr('data-vendor_approve');
			$('#sb_loading').show();
			$.post(get_strings.ajax_url, {
				action: 'sb_change_role_user_to_vendor',
				user_id: user_id,
				vendor_approve: vendor_approve
			}).done(function (response) {
				$('#sb_loading').hide();
				notify('success', get_strings.congratulations, response.data.message);
				location.reload();
			});
		});

	if ($('.sticky-button-featured').length > 0) {
		$(document).on('click', '.feature-update', function () {
			var listing_id = $(this).attr("data-ids");
			$.post(get_strings.ajax_url,{action : 'mw_mark_feature',security:get_strings.ajax_nonce,listings_ids: listing_id }).done( function(response)
			{
				Pace.restart();
				if (true === response.success) {
					notify('success', get_strings.congratulations, response.data.message);
					window.location = response.data.page_link;
				}
				else {
					notify('error', get_strings.whoops, response.data.message);
				}
			});

		});
	}

});



