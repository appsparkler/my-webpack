/* global s */
define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';
        var ContactList = function(elem) {
            $(".contactlist-contact-form, elem").on('keydown', function(e) {
                if (e.which === 13) {
                    $(this).find("span").trigger("click");
                }
            });

            $(".contactlist-contact-form, elem").on('focus', function(e) {
                $(this).addClass('focusOutline');
            });

            $(".contactlist-contact-form, elem").on('blur', function(e) {
                $(this).removeClass('focusOutline');
            });
            var trck = new Tracking(elem, 'ContactList');
            $(document).trigger('template.loaded');
        };
        return ContactList;
    }
);