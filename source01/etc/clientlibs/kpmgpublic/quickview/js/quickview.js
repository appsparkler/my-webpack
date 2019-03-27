define(['jquery', 'tracking'],
        function ($, Tracking) {
            'use strict';
            var QuickView = function (elem) {
                // Keep the following line at the bottom of the QuickView function
                var trck = new Tracking(elem, 'QuickView');
                $(document).trigger('template.loaded');
            };
            $(function () {
                var module = new QuickView();
            });
            return QuickView;
        }
);