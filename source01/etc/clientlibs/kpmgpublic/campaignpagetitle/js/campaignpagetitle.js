/* global s */
define(['jquery', 'clamp', 'tracking', 'helpers'],
        function ($, $clamp, Tracking, Helpers) {
            'use strict';
            var CampaignPageTitle = function (elem) {
                var $desktopClamp = $('.module-campaignpagetitle .campaign-description.desktop-only'),
                    $mobileClamp = $('.module-campaignpagetitle .campaign-description.mobile-only'),
                    $campaignTitleDesktop = $('.module-campaignpagetitle .campaign-title.desktop-only'),
                    $campaignTitleMobile = $('.module-campaignpagetitle .campaign-title.mobile-only'),
                    $campaignCopy = $('.module-campaignpagetitle .campaign-copy');
                

                $campaignCopy.attr('style', '');
                $campaignCopy.each(function (idx, element) {
                    $(this).dotdotdot({
                        ellipsis: '...',
                        height: 16 * 2,
                        wrap: 'word',
                        fallbackToLetter: false,
                        watch: "window"
                    });
                });
                $(document).on('desktopBreakpoint', function () {
                    $campaignTitleDesktop.attr('style', '');
                    $campaignTitleDesktop.each(function (idx, element) {
                        $(this).dotdotdot({
                            ellipsis: '...',
                            height: 56 * 2,
                            wrap: 'word',
                            fallbackToLetter: false,
                            watch: "window"
                        });
                    });
                });

                $(document).on('mobileBreakpoint', function () {
                    $campaignTitleMobile.attr('style', '');
                    $campaignTitleMobile.each(function (idx, element) {
                        $(this).dotdotdot({
                            ellipsis: '...',
                            height: 38 * 2,
                            wrap: 'word',
                            fallbackToLetter: false,
                            watch: "window"
                        });
                    });
                });

                $(document).on('desktopBreakpoint', function () {
                    $desktopClamp.attr('style', '');
                    $desktopClamp.each(function (idx, element) {
                        $(this).dotdotdot({
                            ellipsis: '...',
                            height: 19 * 5,
                            wrap: 'word',
                            fallbackToLetter: false,
                            watch: "window"
                        });
                    });
                });
                $(document).on('mobileBreakpoint', function () {
                    $mobileClamp.attr('style', '');
                    $mobileClamp.each(function (idx, element) {
                        $(this).dotdotdot({
                            ellipsis: '...',
                            height: 20 * 4,
                            wrap: 'word',
                            fallbackToLetter: false,
                            watch: "window"
                        });
                    });
                });
                $('a.btn-cta', elem).on('click', function () {
                    Helpers.triggerTracking({
                        "bannerImpression": $(this).text()
                    }, "Banner Impression");
                });

                // On load analytics - 
                Helpers.triggerTracking({
                    "bannerImpression": "Campaign Page Title Banner"
                }, "Banner Impression");

                // Keep the following line at the bottom of the CampaignPageTitle function
                var trck = new Tracking(elem, 'CampaignPageTitle');
                $(document).trigger('template.loaded');
            };
            return CampaignPageTitle;
        }
);