/* global s */
define(['jquery', 'tracking'],
        function ($, Tracking) {
            'use strict';
            var GoogleMap = function (elem) {
                var trck = new Tracking(elem, 'GoogleMap');
                $(document).trigger('template.loaded');
            };
            return GoogleMap;
        }
);