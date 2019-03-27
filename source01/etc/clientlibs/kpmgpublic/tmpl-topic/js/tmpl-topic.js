define(['jquery', 'navigation', 'navflyouta', 'navflyoutb', 'navflyoutc', 'footer', 'jquerymobilereflow'],
        function ($, Navigation, NavFlyoutA, NavFlyoutB, NavFlyoutC, Footer) {
            'use strict';
            var TmplTopic = function () {
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
                        $(".topicpromocells"+i+"> .col-md-3 ").each(function(index){
                            if($(this).find('section.component').length > 0 ){
                                arr.push(index);
                            }
                        });
                        if( !(arr[0] === 2 && arr[1] === 3 && arr.length === 2)){

                            $(".topicpromocells"+i+"> .col-md-3").each(function(index, el){
                                if ((index === 1 || index === 2) && $(this).find('section.component').length === 0){
                                    $(this).remove();
                                    $(".topicpromocells"+i).append("<div class='col-md-3'></div>");
                                }
                            });
                        }
                    }
                    $(".topicpromocells1 .col-transparent,.topicpromocells2 .col-transparent , .topicpromocells .col-transparent").each(function(){
                        if( $(this).find('section.component').length > 0){
                            $(this).removeClass('col-transparent');
                        }

                        // check for emptyness and hide the same by removing the other classes
                        if( $(this).find('section.component').length <= 0){                        
                            $(this).removeClass('col-full-height col-md-height col-sm-height col-top col-transparent');
                        }
                    });

                    //Hide empty subheading components
                    $('.module-tmpl-topic .module-subheading').each(function() {
                        if (!$(this).text().trim()) {
                            $(this).hide();
                        }
                    });
                }
                $(document).trigger('template.loaded');
                 // Loads the reflow script for mobile component reflow
                require(['jquerymobilereflow']);

                // check for empty placeholder, to set proper css to adjust border and padding
                $(".empty-content-check").each(function(){
                    if( $(this).height() > 2){
                        $(this).addClass('border-all col-transparent');                        
                    }
                    $(this).removeClass('empty-content-check');// remove class anyways
                });

            };
            $(function () {
                var tmpl = new TmplTopic();
            });
        }
);
