define(['jquery', 'tracking', 'helpers', 'personalization', 'personalizationUtils'],
    function($, Tracking, Helpers, personalization, personalizationUtils) {
        'use strict';
        var ddtfullbleedbanner = function(elem) {
            setClickScrollActionOnScollLinks();
            setScrollHandlerOnPage();
            setReturnToTopClickHandler();
            customizeHeaderIfFullBleedBanner();

            // private functions
            function setClickScrollActionOnScollLinks() {
                $('a', elem)
                    .on('click', function(event) {
                        var href = $(this).attr('href');
                        if (href.indexOf('#') === 0) {
                            var target = $(this.getAttribute('href'));
                            event.preventDefault();
                            $('html, body').stop().animate({
                                scrollTop: target.offset().top - 50
                            }, 1000);
                        }
                        trackingFunction(event);
                    });
            }

            function setScrollHandlerOnPage() {
                // ===== Scroll to Top ====
                $(window)
                    .on('scroll',function() {
                        if (!window.kpmg.isMobile) {
                            if ($(this).scrollTop() >= 50) {
                                // If page is scrolled more than 50px
                                $('#return-to-top').fadeIn(600); // Fade in the arrow
                            } else {
                                // Else fade out the arrow
                                $('#return-to-top').fadeOut(600);
                            }
                        }
                    });
            }

            function setReturnToTopClickHandler() {
                $('#return-to-top')
                    .on('click', function() {
                        // When arrow is clicked
                        $('body,html').animate({
                            scrollTop: 0 // Scroll to top of body
                        }, 1000);

                        $(this).trigger('blur');
                    });
            }

            function customizeHeaderIfFullBleedBanner() {
                //To unset the box shadow for header if full bleed banner
                $('header.global-nav').css('box-shadow', 'none');
            }

            function trackingFunction(evt) {
                var analyticsData, trackingObj;
                //
                analyticsData = $(evt.target).data('title');
                trackingObj = {
                    "linkLocationID1": analyticsData,
                    "linkLocationID2": analyticsData,
                    'events': 'event11'
                };
                Helpers.triggerTracking(trackingObj, 'Internal Link');
            }

            $(document).trigger('template.loaded');
        };

        return ddtfullbleedbanner;
    }
);