/* global s */
define(['jquery', 'tracking'],
    function ($, Tracking) {
        'use strict';
        var BasicPageTitle = function (elem) {
            var trck = new Tracking(elem, 'BasicPageTitle');

            $(document).trigger('template.loaded');
        };
        return BasicPageTitle;
    }
);