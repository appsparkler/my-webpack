/* global s */
define(['jquery', 'tracking'],
        function ($, Tracking) {
            'use strict';
            var Tagcloud = function (elem) {
                var trck = new Tracking(elem, 'Tagcloud');
                $(document).trigger('template.loaded');
            };
            return Tagcloud;
        }
);