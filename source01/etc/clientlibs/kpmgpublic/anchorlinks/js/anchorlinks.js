/* global s */
define(['jquery', 'tracking'],
        function ($, Tracking) {
            'use strict';
            var AnchorLinks = function (elem) {
                // Keep the following line at the bottom of the Address function
                var trck = new Tracking(elem, 'AnchorLinks');
                $(document).trigger('template.loaded');
            };
            return AnchorLinks;
        }
);