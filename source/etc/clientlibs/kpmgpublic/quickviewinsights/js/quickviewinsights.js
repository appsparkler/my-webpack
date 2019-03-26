define(['jquery', 'tracking'],
        function ($, Tracking) {
            'use strict';
            var QuickViewInsights = function (elem) {
                // Keep the following line at the bottom of the QuickViewInsights function
                var trck = new Tracking(elem, 'QuickViewInsights');
                $(document).trigger('template.loaded');
            };
            $(function () {
                var module = new QuickViewInsights();
            });
            return QuickViewInsights;
        }
);