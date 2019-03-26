define(['jquery', 'navigation', 'navflyouta', 'navflyoutb', 'navflyoutc', 'footer', 'personalizationUtils', 'jquerymobilereflow'],
        function ($, Navigation, NavFlyoutA, NavFlyoutB, NavFlyoutC, Footer, personalizationUtils) {
            'use strict';
            var TmplAboutlanding = function () {
                var nav = new Navigation(),
                    footer = new Footer(),
                    navflyouta = new NavFlyoutA(),
                    navflyoutb = new NavFlyoutB(),
                    navflyoutc = new NavFlyoutC(),
                    $components = $('.component'),
                    $cell7cell8 = $('.cell7-cell8');
                $.each($components, function (index, val) {
                    var name = $(val).attr('class'),
                        module = name.substring(7, name.indexOf(' '));
                    require([module], function (mod) {
                        mod(val);
                    });
                });

                if(!window.kpmgPersonalize.misc.isAuthor){
                    var lastRow = $('.about-row2 > .col-about-promo section').length ,
                    hasCol6 = $('.about-row2 > .col-about-promo.col-md-6'),
                    hasCol3 = $('.about-row2 > .col-about-promo.col-md-3'), moveflag = 1;
                    if(lastRow === 3){
                        $('.about-row2 > .col-about-promo').removeClass('col-transparent');
                        moveflag = 0;
                    }
                    if(lastRow <= 2 ){
                        $('.about-row2 > .col-about-promo').each(function() {
                            if($(this).has('section').length > 0){
                                $(this).removeClass('col-transparent');
                            }
                            if(lastRow <= 2 ){
                                if($(this).has('section').length < 1 && $(this).hasClass('col-md-3')) {
                                    $(this).remove();
                                }
                                if(hasCol3.has('section').length === 2) {
                                    moveflag = 0;
                                    hasCol6.addClass('col-transparent');
                                }
                            }
                            if(lastRow === 1 && hasCol3.has('section').length === 1 ){
                                if($(this).has('section').length < 1 && $(this).hasClass('col-md-3')) {
                                    $(this).remove();
                                }
                                hasCol6.addClass('col-transparent');
                            }
                        });
                        if(lastRow === 1 && hasCol6.has('section').length === 1){
                            moveflag = 0;
                            $('.about-row2').append("<div class='col-md-3'></div><div class='col-md-3'></div>");
                        }
                        if(moveflag){
                            handleAboutRow2Position(false);
                        }
                    }

                    //Handle cell7, cell8 not authoring scenario
                    $(document).on('reflow.complete', function() {
                        if ($('body').hasClass('contents-reflowed')) {
                            handleCell7and8OnMobile();
                            if(moveflag){
                                handleAboutRow2Position(true);
                            }
                        } else {
                            handleCell7and8OnDesktop();
                            if(moveflag){
                                handleAboutRow2Position(false);
                            }
                        }
                    });

                    if (personalizationUtils.commonUtils.isMobile()) {
                        handleCell7and8OnMobile();
                        if(moveflag){
                            handleAboutRow2Position(true);
                        }
                    } else {
                        handleCell7and8OnDesktop();
                        if(moveflag){
                            handleAboutRow2Position(false);
                        }
                    }
                }else{
                    $('.about-row2 > .col-about-promo, .about-row .col-transparent').removeClass('col-transparent');
                }
                $('.about-row1  .col-transparent,.about-row  .col-transparent').each(function() {
                    if($(this).has('section').length > 0) {
                        $(this).removeClass('col-transparent');
                    }
                });

                function handleCell7and8OnMobile() {
                    var cell7MobileOrder = parseInt($cell7cell8.find('.col-md-8').attr('data-mobile-cell')),
                        cell8MobileOrder = parseInt($cell7cell8.find('.col-md-4').attr('data-mobile-cell')),
                        $cell7Obj = $('.module-tmpl-aboutlanding').find('[data-desktop-cell="' + cell7MobileOrder + '"]'),
                        $cell8Obj = $('.module-tmpl-aboutlanding').find('[data-desktop-cell="' + cell8MobileOrder + '"]');

                    if (!$cell7Obj.find('section').text().trim()) {
                        //This will check for Autdion video component and if so do not hide;
                        $cell7Obj.find('.section:not(.module-audiovideo)').hide();
                    }
                    if (!$cell8Obj.find('section').text().trim()) {
                        $cell8Obj.find('section').hide();
                    }

                    //Show cell7-cell8 in mobile as reflow happens
                    $cell7cell8.show();

                    if(!$('.about-row2').text().trim()) {
                        $('.about-row2').hide();
                    } else {
                        $('.about-row2').show();
                    }
                }

                function handleCell7and8OnDesktop() {
                    if (!$cell7cell8.find('.col-md-8 section').text().trim() && !$cell7cell8.find('.col-md-4 section').text().trim()) {
                        $cell7cell8.hide();
                    } else {
                        if (!$cell7cell8.find('.col-md-8 section').text().trim()) {
                            //This will check for Autdion video component and if so do not hide;
                            $cell7cell8.find('.col-md-8 section:not(.module-audiovideo)').hide();
                        }
                        if (!$cell7cell8.find('.col-md-4 section').text().trim()) {
                            $cell7cell8.find('.col-md-4 section').hide();
                        }
                    }

                    if(!$('.about-row2').text().trim()) {
                        $('.about-row2').hide();
                    } else {
                        $('.about-row2').show();
                    }
                }

                function handleAboutRow2Position(mobile) {
                    if (mobile) {
                        $('.about-row2').detach().appendTo($('.about-row2-wrapper'));
                    } else {
                        $('.about-row2').detach().appendTo($('.about-row1'));
                    }
                }

                $(document).trigger('template.loaded');
            };
            $(function () {
                var tmpl = new TmplAboutlanding();
            });
        }
);
