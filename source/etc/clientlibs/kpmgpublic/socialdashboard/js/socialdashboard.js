/* global s */
define(['jquery', 'tracking'],
        function ($, Tracking) {
            'use strict';
            var SocialDashBoard = function (elem) {
                // Keep the following line at the bottom of the SocialDashBoard function
                var trck = new Tracking(elem, 'SocialDashBoard');
                $(document).trigger('template.loaded');
            };
            return SocialDashBoard;
        }
);