/* global s */
define(['jquery', 'tracking'],
        function ($, Tracking) {
            'use strict';
            var SocialChannel = function (elem) {
                var trck = new Tracking(elem, 'SocialChannel');
                $(document).trigger('template.loaded');
            };
            return SocialChannel;
        }
);