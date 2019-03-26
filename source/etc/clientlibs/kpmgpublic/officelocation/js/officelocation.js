/* global s */
define(['jquery', 'tracking'],
        function ($, Tracking) {
            'use strict';
            var Officelocation = function (elem) {
                // Keep the following line at the bottom of the Officelocation function
                var trck = new Tracking(elem, 'Officelocation');
                $(document).trigger('template.loaded');
            };
            return Officelocation;
        }
);