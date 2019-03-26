/* global s */
define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';
        var Authors = function(elem) {
            $(".authors-contact-form", elem).on('keydown', function(e) {
                if (e.which === 13) {
                    $(this).find("span").trigger("click");
                }
            });

            $(".module-authors .authors-contact-form").on('focus', function(e) {
                $(this).addClass('focusOutline');
            });

            $(".module-authors .authors-contact-form").on('blur', function(e) {
                $(this).removeClass('focusOutline');
            });

            var trck = new Tracking(elem, 'Authors');
            $(document).trigger('template.loaded');
        };
        return Authors;
    }
);