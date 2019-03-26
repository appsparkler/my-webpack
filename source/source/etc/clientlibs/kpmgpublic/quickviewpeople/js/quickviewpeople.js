define(['jquery', 'tracking'],
        function ($, Tracking) {
            'use strict';
            var QuickViewPeople = function (elem) {
                // Keep the following line at the bottom of the QuickViewPeople function
                var trck = new Tracking(elem, 'QuickViewPeople');
                $(document).trigger('template.loaded');
            };
            $(function () {
                var module = new QuickViewPeople();
            });
            return QuickViewPeople;
        }
);