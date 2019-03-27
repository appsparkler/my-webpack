/* global s */
define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';
        var InlineList = function(elem) {           
            $(".inlinelist-listingGroup", elem).mCustomScrollbar({
                theme: "dark-thick",
                mouseWheelPixels: 500                
            });

            if($(".mCustomScrollBox")) {
                $(".mCustomScrollBox").attr("tabindex","-1");
            }

            var trck = new Tracking(elem, 'InlineList');
            $(document).trigger('template.loaded');
        };
        return InlineList;
    }
);