/* global s */
define(['jquery', 'tracking'],
        function ($, Tracking) {
            'use strict';
            var ContactCredentials = function (elem) {
                if ($(".module-contactcredentials .contactinfo").length === 2){
                    $(".accre > .contact-accr, .optattri > .contact-opt, .education > .contact-edu ").removeClass('col-md-4').addClass('col-md-8');
                }
                var trck = new Tracking(elem, 'ContactCredentials');
                $(document).trigger('template.loaded');
            };
            return ContactCredentials;
        }
);
