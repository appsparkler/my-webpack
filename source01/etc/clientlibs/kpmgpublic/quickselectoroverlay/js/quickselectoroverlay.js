/* global s */
define(['jquery', 'tracking'],
        function ($, Tracking) {
            'use strict';
            var QuickSelectorOverlay = function (elem) {
                // Keep the following line at the bottom of the QuickSelectorOverlay function
                var trck = new Tracking(elem, 'QuickSelectorOverlay');
                $(document).trigger('template.loaded');
            };
            return QuickSelectorOverlay;
        }
);