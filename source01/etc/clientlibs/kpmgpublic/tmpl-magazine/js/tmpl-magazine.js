define(['jquery', 'navigation', 'navflyouta', 'navflyoutb', 'navflyoutc', 'footer', 'jquerymobilereflow'],
        function ($, Navigation, NavFlyoutA, NavFlyoutB, NavFlyoutC, Footer) {
            'use strict';
            var TmplMagazine = function () {
                var nav = new Navigation(),
                    footer = new Footer(),
                    navflyouta = new NavFlyoutA(),
                    navflyoutb = new NavFlyoutB(),
                    navflyoutc = new NavFlyoutC(),
                    $components = $('.component');
                $.each($components, function (index, val) {
                    var name = $(val).attr('class'),
                        module = name.substring(7, name.indexOf(' '));
                    require([module], function (mod) {
                        mod(val);
                    });
                });
                if(!window.kpmgPersonalize.misc.isAuthor){
                    var arr;
                    for(var i=1 ; i <= 2 ; i++){
                        arr =[];
                        $(".magazinepromocells"+i+"> .col-md-3 ").each(function(index){
                            if($(this).find('section.component').length > 0 ){
                                arr.push(index);
                            }
                        });
                        if( !(arr[0] === 2 && arr[1] === 3 && arr.length === 2)){

                            $(".magazinepromocells"+i+"> .col-md-3").each(function(index, el){
                                if ((index === 1 || index === 2) && $(this).find('section.component').length === 0){
                                    $(this).remove();
                                    $(".magazinepromocells"+i).append("<div class='col-md-3'></div>");
                                }
                            });
                        }
                    }
                    $(".magazinepromocells1 .col-transparent,.magazinepromocells2 .col-transparent , .magazinepromo .col-transparent").each(function(){
                        if( $(this).find('section.component').length > 0){
                            $(this).removeClass('col-transparent');
                        }
                    });

                    //Hide empty subheading components
                    $('.module-tmpl-magazine .module-subheading').each(function() {
                        if (!$(this).text().trim()) {
                            $(this).hide();
                        }
                    });
                }
                $(document).trigger('template.loaded', [true]);
                // Loads the reflow script for mobile component reflow
                require(['jquerymobilereflow']);

                // check for empty placeholder, to set proper css to adjust border and padding
                $(".empty-content-check").each(function(){
                    if( $(this).height() > 2){
                        $(this).addClass('border-all col-transparent');
                    }
                    $(this).removeClass('empty-content-check');
                });
            };
            $(function () {
                var tmpl = new TmplMagazine();

            });
        }
);
