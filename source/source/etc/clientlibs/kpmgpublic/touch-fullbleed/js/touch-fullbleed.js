define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';

        var TouchFullbleed = function(elem) {

            $("img", elem).each(function(){
                var image = $(this);
                if (image.prop('naturalWidth')=== 0 || image.readyState === 'uninitialized') {
                    $(elem).hide();
                }
            });

            var trck = new Tracking(elem, 'TouchFullbleed');
			$(document).trigger('template.loaded');
        };

        return TouchFullbleed;
    }
);
