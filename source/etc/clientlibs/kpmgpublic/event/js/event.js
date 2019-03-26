/* global s */
define(['jquery', 'tracking'],
        function ($, Tracking) {
            'use strict';
            var Event = function (elem) {
                var trck = new Tracking(elem, 'Event');
                $(document).trigger('template.loaded');
            };
            return Event;
        }
);