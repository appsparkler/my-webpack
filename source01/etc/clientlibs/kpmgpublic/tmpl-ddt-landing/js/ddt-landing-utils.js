define([], function() {
    'use strict';
    return {
        resizeImagePlaceholders: resizeImagePlaceholders
    };
    // private functions
    function resizeImagePlaceholders() {
        var imagePlaceholders;
        //
        imagePlaceholders = $('img.img-placeholder');
        imagePlaceholders.each(function(idx, img) {
            if ($(img).hasClass('w-100')) {
                var width, scale, scaleHeight;
                //
                scale = $(this).attr('data-scale');
                scaleHeight = scale.split(':')[1];
                width = $(this).width();
                $(this).height(width / scaleHeight);
            }
        });
    }
});