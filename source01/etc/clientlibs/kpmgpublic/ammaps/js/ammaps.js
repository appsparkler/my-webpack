/* global s */
define(['jquery', 'tracking'],
        function ($, Tracking) {
            'use strict';
            var AmMaps = function (elem) {
                // Keep the following line at the bottom of the Address function
                var trck = new Tracking(elem, 'AmMaps');
                $(document).trigger('template.loaded');
            };
            return AmMaps;
        }
);