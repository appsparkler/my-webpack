/* global s */
define(['jquery', 'tracking', 'responsiveTabs'], function ($, Tracking) {
    'use strict';
    var ManualCountryLanguageDesignationSelection = function (elem) {
        $('.manualcountrylanguagedesignationselection-tabs', elem).easyResponsiveTabs({
            type: 'vertical',
            width: 'auto',
            fit: true
        });
        if ($(document).width() <= 640) {
            $(".resp-tab-content").first().css("display", "none");
            $(".resp-tabs-container").css("min-width", "auto");
            $(".resp-accordion").first().removeClass("resp-tab-active");
			if($('.highlight').length> 0) {
                $('.resp-tabs-container').find('.resp-tab-content-active').removeClass("resp-tab-content-active");
                $('.resp-tabs-list').find('.resp-tab-active').removeClass("resp-tab-active");

                $('.resp-tabs-container').find('.highlight-content').first().addClass("resp-tab-content-active");
                $('.resp-tabs-list').find('.highlight').first().addClass("resp-tab-active");


            }
			$('.resp-tab-content.resp-tab-content-active').css('display','block');
        }

        $(".resp-accordion").on('click', function () {
            if($(this).hasClass('resp-tab-active')) {
                $(".resp-accordion").find('.right-container').children('.resp-arrow').removeClass('icon-chevron-up');
                $(".resp-accordion").find('.right-container').children('.resp-arrow').addClass('icon-chevron-down');
                $(this).find('.right-container').children('.resp-arrow').removeClass('icon-chevron-down');
                $(this).find('.right-container').children('.resp-arrow').addClass('icon-chevron-up');
            } else {
                $(this).find('.right-container').children('.resp-arrow').removeClass('icon-chevron-up');
                $(this).find('.right-container').children('.resp-arrow').addClass('icon-chevron-down');

            }
        });


        function equalHeight(container) {

            var currentTallest = 0,
                currentRowStart = 0,
                rowDivs = [],
                $el,
                topPosition = 0,
                currentDiv = 0;

            $(container).each(function() {

                $el = $(this);
                $($el).height('auto');
                topPosition = $el.position().top;

                if (currentRowStart !== topPosition) {
                    for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                        rowDivs[currentDiv].height(currentTallest);
                    }
                    rowDivs.length = 0; // empty the array
                    currentRowStart = topPosition;
                    currentTallest = $el.height();
                    rowDivs.push($el);
                } else {
                    rowDivs.push($el);
                    currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
                }
                for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                    rowDivs[currentDiv].height(currentTallest);
                }
            });
        }

        if($(document).width() >= 640) {
            $('.resp-tab-content').css('display','block');
            //equalHeight('.resp-tab-content .countryName');
            $('.resp-tab-content').css('display','none');
            if($('.highlight').length> 0) {
                $('.resp-tabs-container').find('.resp-tab-content-active').removeClass("resp-tab-content-active");
                $('.resp-tabs-list').find('.resp-tab-active').removeClass("resp-tab-active");

                $('.resp-tabs-container').find('.highlight-content').first().addClass("resp-tab-content-active");
                $('.resp-tabs-list').find('.highlight').first().addClass("resp-tab-active");


            }
            $('.resp-tab-content.resp-tab-content-active').css('display','block');
            listVerticalView();
        }

        $("select.regionListMob").on('change', function() {
            var regionUrlValue = $(this).val();
            if (regionUrlValue !== 'region') {
                window.location = regionUrlValue;
            }
        });
        function listVerticalView() {
            $('.manualcountrylanguagedesignationselection-tabs .resp-tab-content').each(function() {
                if (!$(this).hasClass("reorederList")) {
                    var $item, $ordered = $('<div></div>');
                    var $ul = $(this).find('.subRegion-list .multicolumn');
					var $elements = $ul.children('li');
					var $elementLength = $elements.length;
					var el_moduel = $elementLength % 3;
					if(el_moduel>0){
						$elementLength = $elementLength + (3-el_moduel);
						for(var i=0;i<3-el_moduel;i++){
							$(this).find("ul").append($('<li class="countryName "><a class="countryListHide">&nbsp;</a></li>'));

						}
					}
					$elements = $ul.children('li');
                    var  breakPoint = Math.ceil($elements.length/3);
                    var appendToUL= function (i) {
                        if ($ul.children().eq(i).length > 0) {
                            $ordered.append($ul.children().eq(i).clone());
                        }
                        else {
                            $ordered.append($('<li></li>'));
                        }
                    };
                    var reorder= function ($el) {
                        $el.each(function(){
                            $item = $(this);
                            if ($item.index() >= breakPoint){
                                return false;
                            }
                            appendToUL($item.index());
                            for (var i = 1; i < 3; i++) {
                                appendToUL(breakPoint*i+$item.index());
                            }
                        });
                        $ul.html($ordered.children().css('width',100/3+'%'));
                    };

                    reorder($elements);
                    $(this).addClass('reorederList');
                }
            });
        }

        $(window).scrollTop(0);
        var trck = new Tracking(elem, 'ManualCountryLanguageDesignationSelection');
        $(document).trigger('template.loaded');
    };
    return ManualCountryLanguageDesignationSelection;
});
