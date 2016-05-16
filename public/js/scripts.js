(function($) {
    "use strict";

    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 60
    });

    $('#topNav').affix({
        offset: {
            top: 200
        }
    });

    $(window).bind('resize', function(event) {
        if($('.container').width() == 720)
        {
            if($('#logo-small').hasClass('hidden')){
                $('#logo-small').removeClass('hidden');
                $('#logo').addClass('hidden');
            }
        } else {
            if($('#logo').hasClass('hidden')){
                $('#logo').removeClass('hidden');
                $('#logo-small').addClass('hidden');
            }
        }
    });
    
    $('a.page-scroll').bind('click', function(event) {
        var $ele = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($ele.attr('href')).offset().top - 60)
        }, 1450, 'easeInOutExpo');
        event.preventDefault();
    });
    
    $('.navbar-collapse ul li a').click(function() {
        /* always close responsive nav after click */
        $('.navbar-toggle:visible').click();
    });
})(jQuery);

$(window).scroll(function(){
    $('section').each(function(){
        var pos = $(this).offset().top;
        var topOfWindow = $(window).scrollTop();
        if(pos < topOfWindow + 200){
            $(this).find('.animated.isFadeInLeft').each(function(){
                $(this).removeClass('isFadeInLeft');
                $(this).addClass('fadeInLeft');
            });
            $(this).find('.animated.isFadeInRight').each(function(){
                $(this).removeClass('isFadeInRight');
                $(this).addClass('fadeInRight');
            });
            $(this).find('.animated.isFadeIn').each(function(){
                $(this).removeClass('isFadeIn');
                $(this).addClass('fadeIn');
            });
        }
    });
})