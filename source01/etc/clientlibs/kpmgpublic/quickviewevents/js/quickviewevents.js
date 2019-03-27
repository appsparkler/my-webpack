define(['jquery', 'tracking'],
        function ($, Tracking) {
            'use strict';
            var QuickViewEvents = function (elem) {
                // Keep the following line at the bottom of the QuickViewEvents function
                var trck = new Tracking(elem, 'QuickViewEvents');
                $(document).trigger('template.loaded');
            };
            $(function () {
                var module = new QuickViewEvents();
            });
            return QuickViewEvents;
        }
);