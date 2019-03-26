/* global s */
define(['jquery', 'tracking'],
        function ($, Tracking) {
            'use strict';
            var SubHeading = function (elem) {
                var trck = new Tracking(elem, 'SubHeading');
                $(document).trigger('template.loaded');
            };
            return SubHeading;
        }
);