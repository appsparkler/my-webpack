/* global s */
define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';
        var SocialTab = function(elem) {

            $('.tabs-container',elem).find('a.tablink').first().addClass('current');
            $('.tabs-container',elem).find('a.tablink').next().hide();
            $('.tabs-container',elem).find('a.tablink').first().next().show();
            $('.tabs-container',elem).find('a.tablink.current').children('.resp-arrow').removeClass('icon-chevron-down').addClass('icon-chevron-up');
            $('.tabs-container',elem).find('a.tablink').on('click', function(e) {
                e.preventDefault();
                var _this = $(this);
                if(_this.hasClass('current')) {
                    _this.children('.resp-arrow').removeClass('icon-chevron-up');
                    _this.children('.resp-arrow').addClass('icon-chevron-down');
                    _this.removeClass('current');
                    _this.next().hide();
                } else {
                    _this.parent().parent().find('a.tablink').removeClass('current');
                    _this.parent().parent().find('a.tablink').next().hide();
                    _this.parent().parent().find('a.tablink').children('.resp-arrow').removeClass('icon-chevron-up').addClass('icon-chevron-down');
                    _this.children('.resp-arrow').removeClass('icon-chevron-down');
                    _this.children('.resp-arrow').addClass('icon-chevron-up');
                    _this.next().show();
                    _this.addClass('current');
                }
            });


            $('.socialtab .two-tabs a.tablink.first').on('keydown', function(e) {               
                if (e.keyCode === 13) {
                    $(".socialtab .tablink.first").addClass('current');
                    $(".socialtab .tablink.second").removeClass('current');
                    $(".socialtab .tablink.third").removeClass('current');
                    $('#blogs', elem).hide();
                    $("#dashboard", elem).show();
                    $("#widgetbuilder", elem).hide();
                    window.se1.trigger('focus');
                    e.preventDefault();
                }
            });

            $('.socialtab .two-tabs a.tablink.second').on('keydown', function(e) {               
                if (e.keyCode === 13) {
                    $(".socialtab .tablink.first").removeClass('current');
                    $(".socialtab .tablink.second").addClass('current');
                    $(".socialtab .tablink.third").removeClass('current');
                    $('#blogs', elem).hide();
                    $("#dashboard", elem).hide();
                    $("#widgetbuilder", elem).show();
                    window.se2.trigger('focus');
                    e.preventDefault();
                }
            });


            $(".socialtab a.tablink.first").on('keydown', function(e) {
                if (e.shiftKey && e.keyCode === 9) {
                    $(this).removeClass("focusOutline");
                    if (!$(this).siblings().hasClass('current')) {
                        $(".socialtab .tablink.first").addClass('current');
                        $(".socialtab .tablink.second").removeClass('current');
                        $(".socialtab .tablink.third").removeClass('current');
                        e.preventDefault();
                    }
                   
                }
            });
            $('.socialtab .three-tabs a.tablink.first').on('keydown', function(e) {
                if (e.keyCode === 13) {
                    //alert('first');     
                    $(".socialtab .tablink.first").addClass('current');
                    $(".socialtab .tablink.second").removeClass('current');
                    $(".socialtab .tablink.third").removeClass('current');
                    $('#blogs', elem).show();
                    $("#dashboard", elem).hide();
                    $("#widgetbuilder", elem).hide();
                    e.preventDefault();
                }
            });
            $('.socialtab .three-tabs a.tablink.second').on('keydown', function(e) {
                if (e.keyCode === 13) {
                    $(".socialtab .tablink.first").removeClass('current');
                    $(".socialtab .tablink.second").addClass('current');
                    $(".socialtab .tablink.third").removeClass('current');
                    $('#blogs', elem).hide();
                    $("#dashboard", elem).show();
                    $("#widgetbuilder", elem).hide();
                    e.preventDefault();
                }
            });
            $('.socialtab .three-tabs a.tablink.third').on('keydown', function(e) {
                if (e.keyCode === 13) {
                    $(".socialtab .tablink.first").removeClass('current');
                    $(".socialtab .tablink.second").removeClass('current');
                    $(".socialtab .tablink.third").addClass('current');
                    $('#blogs', elem).hide();
                    $("#dashboard", elem).hide();
                    $("#widgetbuilder", elem).show();
                    e.preventDefault();
                }
            });

     
            function tabClickHandler(e) {
                e.preventDefault();
                var _this = $(e.target);

                if (_this.hasClass('icon-chevron-right')) {
                    _this = _this.parents('a');
                }
                if (_this.hasClass('current')) {
                    _this.next().hide();
                    _this.removeClass('current');
                } else {
                    $('.custom-tab-content', elem).hide();
                    _this.next().show();
                    $('a.tablink', elem).removeClass('current');
                    _this.addClass('current');
                }
            }       

            // Keep the following line at the bottom of the SocialTab function
            var trck = new Tracking(elem, 'SocialTab');
            $(document).trigger('template.loaded');
        };
        return SocialTab;
    }
);