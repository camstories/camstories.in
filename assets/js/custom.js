/*--------------------- Copyright (c) 2020 -----------------------
[Master Javascript]
Project: Wedding - Responsive HTML Template 
Version: 1.0.0
Assigned to: 
-------------------------------------------------------------------*/
(function($) {
    "use strict";
    /*-----------------------------------------------------
    	Function  Start
    -----------------------------------------------------*/
    var Wedding = {
        initialised: false,
        version: 1.0,
        mobile: false,
        init: function() {
            if (!this.initialised) {
                this.initialised = true;
            } else {
                return;
            }
            /*-----------------------------------------------------
            	Function Calling
            -----------------------------------------------------*/
            this.preLoader();
            this.searchBox();
            this.wowAnimation();
            this.navMenu();
            this.focusText();
            this.counter();
            this.topButton();
            this.tiltAnimation();
            this.popupGallery();
            this.wedSlider();
            this.wedingService();
            this.wedTestimonial();
            this.wedBlogSlider();
            this.StickyHeader();
            this.singlePageScroll();
        },

        /*-----------------------------------------------------
        	Fix Preloader
        -----------------------------------------------------*/
        preLoader: function() {
            $(window).on('load', function() {
                $(".preloader_wrapper").removeClass('preloader_active');
            });
            jQuery(window).on('load', function() {
                setTimeout(function() {
                    jQuery('.preloader_open').addClass('loaded');
                }, 100);
            });
        },

        /*-----------------------------------------------------
        	Fix Search Bar & Cart
        -----------------------------------------------------*/
        searchBox: function() {
            $('.searchBtn').on("click", function() {
                $('.searchBox').addClass('show');
            });
            $('.closeBtn').on("click", function() {
                $('.searchBox').removeClass('show');
            });
            $('.searchBox').on("click", function() {
                $('.searchBox').removeClass('show');
            });
            $(".search_bar_inner").on('click', function() {
                event.stopPropagation();
            });
        },

        /*-----------------------------------------------------
        	Fix Animation 
        -----------------------------------------------------*/
        wowAnimation: function() {
            new WOW().init();
        },

        /*-----------------------------------------------------
        	Fix Mobile Menu 
        -----------------------------------------------------*/
        navMenu: function() {
            var w = window.innerWidth;
            if (w <= 991) {
                $(".main_menu_wrapper>ul li").on('click', function() {
                    $(this).find('ul.sub_menu').slideToggle();
                    $(this).toggleClass("open");
                });
                $(".menu_btn").on('click', function(e) {
                    event.stopPropagation();
                    $(".main_menu_wrapper, .menu_btn_wrap").toggleClass("open");
                });
                $("body").on('click', function() {
                    $(".main_menu_wrapper, .menu_btn_wrap").removeClass("open");
                });
            }
        },

        /*-----------------------------------------------------
        	Fix  On focus Placeholder
        -----------------------------------------------------*/
        focusText: function() {
            var place = '';
            $('input,textarea').focus(function() {
                place = $(this).attr('placeholder');
                $(this).attr('placeholder', '');
            }).blur(function() {
                $(this).attr('placeholder', place);
            });
        },

        /*-----------------------------------------------------
        	Fix Counter
        -----------------------------------------------------*/
        counter: function() {
            if ($('.counter_holder').length > 0) {
                var a = 0;
                $(window).scroll(function() {
                    var topScroll = $('.counter_holder').offset().top - window.innerHeight;
                    if (a == 0 && $(window).scrollTop() > topScroll) {
                        $('.count_no').each(function() {
                            var $this = $(this),
                                countTo = $this.attr('data-count');
                            $({
                                countNum: $this.text()
                            }).animate({
                                countNum: countTo
                            }, {
                                duration: 5000,
                                easing: 'swing',
                                step: function() {
                                    $this.text(Math.floor(this.countNum));
                                },
                                complete: function() {
                                    $this.text(this.countNum);
                                }
                            });
                        });
                        a = 1;
                    }
                });
            };
        },

        /*-----------------------------------------------------
        	Fix GoToTopButton
        -----------------------------------------------------*/
        topButton: function() {
            var scrollToTopButton = $("#scroll");
            $(window).on('scroll', function() {
                if ($(this).scrollTop() < 500) {
                    scrollToTopButton.removeClass("activeButton");
                } else {
                    scrollToTopButton.addClass("activeButton");
                }
            });
            $('#scroll').click(function() {
                $("html, body").animate({
                    scrollTop: 0
                }, 2000);
                return false;
            });

        },

        /*-----------------------------------------------------
        	Fix Image Animation
        -----------------------------------------------------*/
        tiltAnimation: function() {
            var tiltAnimation = $('.parallax')
            if (tiltAnimation.length) {
                tiltAnimation.tilt({
                    max: 12,
                    speed: 1e3,
                    easing: 'cubic-bezier(.03,.98,.52,.99)',
                    transition: !1,
                    perspective: 1e3,
                    scale: 1
                })
            }
        },

        /*-----------------------------------------------------
        	Fix Gallery Magnific Popup
        -----------------------------------------------------*/
        popupGallery: function() {
            jQuery(document).ready(function() {
                $('.popup_gallery, .popup_gallery1, .popup_gallery2, .popup_gallery3').magnificPopup({
                    delegate: 'a',
                    type: 'image',
                    tLoading: 'Loading image #%curr%...',
                    mainClass: 'mfp-img-mobile',
                    gallery: {
                        enabled: true,
                        navigateByImgClick: true,
                        preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
                    },
                    image: {
                        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                        titleSrc: function(item) {
                            return item.el.attr('title') + '<small></small>';
                        }
                    }
                });
            });
        },

        /*-----------------------------------------------------
        	Fix Weding Slider 
        -----------------------------------------------------*/
        wedSlider: function() {
            var wedSlider = new Swiper('.married_slider.swiper-container', {
                autoHeight: false,
                autoplay: true,
                spaceBetween: 30,
                slidesPerView: 4,
                loop: true,
                speed: 3000,
                centeredSlides: false,
                autoplay: {
                    delay: 2000,
                },
                navigation: {
                    nextEl: '.next',
                    prevEl: '.prev',
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 15,
                    },
                    575: {
                        slidesPerView: 1,
                        spaceBetween: 15,
                    },
                    767: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 1,
                        spaceBetween: 30,
                    },
                    992: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    1200: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                },
            });
        },

        /*-----------------------------------------------------
        Fix Weding Service Slider 
        -----------------------------------------------------*/
        wedingService: function() {
            var wedingService = new Swiper('.swiper-container.wedingService', {
                autoHeight: false,
                autoplay: false,
                slidesPerView: 1,
                loop: true,
                spaceBetween: 30,
                centeredSlides: false,
                speed: 3000,
                autoplay: {
                    delay: 3000,
                },
                pagination: {
                    el: '.bullets',
                    clickable: true,
                },
            });
        },
        /*-----------------------------------------------------
        	Fix Weding Slider 
        -----------------------------------------------------*/
        wedTestimonial: function() {
            var wedTestimonial = new Swiper('.wedTestimonial.swiper-container', {
                autoHeight: false,
                autoplay: true,
                spaceBetween: 0,
                slidesPerView: 1,
                effect: 'fade',
                loop: true,
                speed: 1500,
                centeredSlides: false,
                autoplay: {
                    delay: 2000,
                },
                navigation: {
                    nextEl: '.prev',
                    prevEl: '.next',
                },
            });
        },
        /*-----------------------------------------------------
        	Fix Weding Blog Slider 
        -----------------------------------------------------*/
        wedBlogSlider: function() {
            var wedBlogSlider = new Swiper('.wedBlog.swiper-container', {
                autoHeight: false,
                autoplay: true,
                spaceBetween: 30,
                slidesPerView: 3,
                loop: true,
                speed: 2000,
                centeredSlides: false,
                autoplay: {
                    delay: 1500,
                },
                pagination: {
                    el: '.bullets',
                    clickable: true,
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 15,
                    },
                    575: {
                        slidesPerView: 1,
                        spaceBetween: 15,
                    },
                    767: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 1,
                        spaceBetween: 30,
                    },
                    992: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    1200: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                },
            });
        },

        /*-----------------------------------------------------
        	Fix  Sticky Header
        -----------------------------------------------------*/
        StickyHeader: function() {
            var header = $("header");
            $(window).scroll(function() {
                var scroll = $(window).scrollTop();
                if (scroll >= 500 && $(this).width() > 991) {
                    header.addClass("fixed_header animated fadeInDown");
                } else {
                    header.removeClass('fixed_header animated fadeInDown');
                }
            });
        },

        /*-----------------------------------------------------
        	Fix Scrolling 
        -----------------------------------------------------*/
        singlePageScroll: function() {
            var pluginName = 'ScrollIt',
                pluginVersion = '1.0.3';

            /*
             * OPTIONS
             */
            var defaults = {
                upKey: 38,
                downKey: 40,
                easing: 'linear',
                scrollTime: 600,
                activeClass: 'active',
                onPageChange: null,
                topOffset: -70
            };

            $.scrollIt = function(options) {

                /*
                 * DECLARATIONS
                 */
                var settings = $.extend(defaults, options),
                    active = 0,
                    lastIndex = $('[data-scroll-index]:last').attr('data-scroll-index');

                /*
                 * METHODS
                 */

                /**
                 * navigate
                 *
                 * sets up navigation animation
                 */
                var navigate = function(ndx) {
                    if (ndx < 0 || ndx > lastIndex) { return; }

                    var targetTop = $('[data-scroll-index=' + ndx + ']').offset().top + settings.topOffset + 1;
                    $('html,body').animate({
                        scrollTop: targetTop,
                        easing: settings.easing
                    }, settings.scrollTime);
                };

                /**
                 * doScroll
                 *
                 * runs navigation() when criteria are met
                 */
                var doScroll = function(e) {
                    var target = $(e.target).closest("[href]").attr('href') ||
                        $(e.target).closest("[data-scroll-goto]").attr('data-scroll-goto');
                    navigate(parseInt(target, 10));
                };

                /**
                 * keyNavigation
                 *
                 * sets up keyboard navigation behavior
                 */
                var keyNavigation = function(e) {
                    var key = e.which;
                    if ($('html,body').is(':animated') && (key == settings.upKey || key == settings.downKey)) {
                        return false;
                    }
                    if (key == settings.upKey && active > 0) {
                        navigate(parseInt(active, 10) - 1);
                        return false;
                    } else if (key == settings.downKey && active < lastIndex) {
                        navigate(parseInt(active, 10) + 1);
                        return false;
                    }
                    return true;
                };

                /**
                 * updateActive
                 *
                 * sets the currently active item
                 */
                var updateActive = function(ndx) {
                    if (settings.onPageChange && ndx && (active != ndx)) { settings.onPageChange(ndx); }

                    active = ndx;
                    $('[href]').removeClass(settings.activeClass);
                    $('[href=' + ndx + ']').addClass(settings.activeClass);
                };

                /**
                 * watchActive
                 *
                 * watches currently active item and updates accordingly
                 */
                var watchActive = function() {
                    var winTop = $(window).scrollTop();

                    var visible = $('[data-scroll-index]').filter(function(ndx, div) {
                        return winTop >= $(div).offset().top + settings.topOffset &&
                            winTop < $(div).offset().top + (settings.topOffset) + $(div).outerHeight();
                    });
                    var newActive = visible.first().attr('data-scroll-index');
                    updateActive(newActive);
                };

                /*
                 * runs methods
                 */
                $(window).on('scroll', watchActive).scroll();

                $(window).on('keydown', keyNavigation);

                $('.wed_single_index_menu').on('click', '[href], [data-scroll-goto]', function(e) {
                    e.preventDefault();
                    doScroll(e);
                });

            };

            $(function() { $.scrollIt(); });
        },

    };

    Wedding.init();

})(jQuery);

/*-----------------------------------------------------
	Fix Contact Form Submission
-----------------------------------------------------*/
// Contact Form Submission
function checkRequire(formId, targetResp) {
    targetResp.html('');
    var email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    var url = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
    var image = /\.(jpe?g|gif|png|PNG|JPE?G)$/;
    var mobile = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
    var facebook = /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/;
    var twitter = /^(https?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9(\.\?)?]/;
    var google_plus = /^(https?:\/\/)?(www\.)?plus.google.com\/[a-zA-Z0-9(\.\?)?]/;
    var check = 0;
    $('#er_msg').remove();
    var target = (typeof formId == 'object') ? $(formId) : $('#' + formId);
    target.find('input , textarea , select').each(function() {
        if ($(this).hasClass('require')) {
            if ($(this).val().trim() == '') {
                check = 1;
                $(this).focus();
                $(this).parent('div').addClass('form_error');
                targetResp.html('You missed out some fields.');
                $(this).addClass('error');
                return false;
            } else {
                $(this).removeClass('error');
                $(this).parent('div').removeClass('form_error');
            }
        }
        if ($(this).val().trim() != '') {
            var valid = $(this).attr('data-valid');
            if (typeof valid != 'undefined') {
                if (!eval(valid).test($(this).val().trim())) {
                    $(this).addClass('error');
                    $(this).focus();
                    check = 1;
                    targetResp.html($(this).attr('data-error'));
                    return false;
                } else {
                    $(this).removeClass('error');
                }
            }
        }
    });
    return check;
}
$(".submitForm").on('click', function() {
    var _this = $(this);
    var targetForm = _this.closest('form');
    var errroTarget = targetForm.find('.response');
    var check = checkRequire(targetForm, errroTarget);

    if (check == 0) {
        var formDetail = new FormData(targetForm[0]);
        formDetail.append('form_type', _this.attr('form-type'));
        $.ajax({
            method: 'post',
            url: 'ajaxmail.php',
            data: formDetail,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(resp) {
            console.log(resp);
            if (resp == 1) {
                targetForm.find('input').val('');
                targetForm.find('textarea').val('');
                errroTarget.html('<p style="color:green;">Mail has been sent successfully.</p>');
            } else {
                errroTarget.html('<p style="color:red;">Something went wrong please try again latter.</p>');
            }
        });
    }
});