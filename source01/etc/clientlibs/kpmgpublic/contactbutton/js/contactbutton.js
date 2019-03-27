define(['jquery', 'tracking', 'personalizationUtils'],
    function ($, Tracking, personalizationUtils) {
        'use strict';
      
        var Contactbutton = function (elem) {

            if (personalizationUtils.commonUtils.isMobile()) {
                var maxHeight = 0;
                $(".contactButtonContainer").each(function() {
                    if ($(this).height() > maxHeight) {
                        maxHeight = $(this).height();
                    }
                });
                $(".contactButtonContainer").height(maxHeight);
            }

            $(".module-contactbutton").on('mouseenter', function() {
                    $(this).addClass("hover");
                }).on('mouseleave',  function() {
                    $(this).removeClass("hover");
                }
            );

            // Keep the following lines at the bottom of the Contactbutton function
            var trck = new Tracking(elem, 'Contactbutton');
            $(document).trigger('template.loaded');
        };

        return Contactbutton;

    }

);