/* global s */
define(['jquery', 'tracking'],
        function ($, Tracking) {
            'use strict';
            var AmCharts = function (elem) {
                // Keep the following line at the bottom of the Address function
                var trck = new Tracking(elem, 'AmCharts');
                $(document).trigger('template.loaded');
            };
            return AmCharts;
        }
);