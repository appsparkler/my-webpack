/* global s */
define(['jquery', 'tracking'],
        function ($, Tracking) {
            'use strict';
            var Disclaimer = function (elem) {
                // Keep the following line at the bottom of the Disclaimer function
                var trck = new Tracking(elem, 'Disclaimer');
                $(document).trigger('template.loaded');
            };
            return Disclaimer;
        }
);
