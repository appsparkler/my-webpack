define(['jquery', 'tracking', 'handlebars', 'precompile', 'personalizationUtils', 'modernizr'],
    function($, Tracking, hbs, PrecompiledHandlebars, PersonalizationUtils, modernizr) {
        'use strict';
        var Dashboardbanner = function(elem) {


            if(window.kpmgPersonalize.misc.isAuthor){
                $("img", elem).each(function(){
                    var image = $(this);
                    if (image.prop('naturalWidth') === 0 || image.readyState === 'uninitialized') {
                        $(elem).hide();
                    }
                });
            }
            var userLoggedIn, hasLocalStorage;
            //
            userLoggedIn = PersonalizationUtils.accountUtils.isLoggedIn() || false;
            hasLocalStorage = modernizr.localstorage;
            //
            if (userLoggedIn && hasLocalStorage) {
                var dashboardBannerArticle;
                //
                dashboardBannerArticle = PersonalizationUtils
                    .storeUtils
                    .retrieveBannerArticleFromLocalStorage('dashboard');
                //
                if (!!dashboardBannerArticle) {
                    replacePersonalizedElement(dashboardBannerArticle);
                    renderDefaultElement();
                } else {
                    var zethisIds, locale, fetchParams;
                    //
                    zethisIds = PersonalizationUtils.accountUtils.getCategoryPreferences('all', 'country').split(',').join('|');
                    locale = window.kpmgPersonalize.snp.params;
                    fetchParams = {
                        zethisIds: zethisIds,
                        site: locale.countryCode + '_' + locale.languageCode,
                        bannerFlag: true
                    };

                    // don't make the search-call if there are no zethis-ids in the params.
                    if (!fetchParams.zethisIds || fetchParams.zethisIds.length === 0) {
                        renderDefaultElement();
                        $('a.dashboard-banner-cta').removeAttr("href");
                        return;
                    } else {
                        PersonalizationUtils
                            .storeUtils
                            .fetchBannerArticles(fetchParams, 'personalized-results', resultHandler);
                    }
                }
            } else {
                renderDefaultElement();
                $('a.dashboard-banner-cta').removeAttr("href");
            }

			// Keep the following lines at the bottom of the Dashboardbanner function
            var trck = new Tracking(elem, 'Dashboardbanner');
			$(document).trigger('template.loaded');

            // private functions
            function resultHandler(articles) {
                PersonalizationUtils.storeUtils.storeBannerArticlesInLocalStorage(articles);
                var dashboardBannerArticle = PersonalizationUtils
                    .storeUtils
                    .retrieveBannerArticleFromLocalStorage('dashboard');
                if (!!dashboardBannerArticle) {
                  // remove hide from read more cta
                    replacePersonalizedElement(dashboardBannerArticle);
                    renderDefaultElement();
                } else {
                    renderDefaultElement();
                    $('a.dashboard-banner-cta').removeAttr("href");
                }
            }

            function renderDefaultElement() {
                setDataSrcAndSrc();
                $
                    .when(downloadImages())
                    .done(function(){
                        console.log('images are downloaded...');
                        $('div.overlay-holder', elem).removeClass('hide');
                        $('img.img-responsive', elem).removeClass('hide');
                        $('div.web-spinner', elem).addClass('hide');
                    });
            }

            function downloadImages(cb) {
                var deferred = $.Deferred();
                var imgSrcArray, imgEls, screen;
                //
                screen = PersonalizationUtils.commonUtils.isMobile() ? 'mobile' : 'desktop';
                imgSrcArray = [];
                imgEls = $('img[data-desktop]', elem);
                $.each(imgEls, function(idx, el){
                    var imgSrc = $(el).data(screen);
                    imgSrcArray.push(imgSrc);
                });
                //
                appendHiddenDiv(imgSrcArray);
                //
                function appendHiddenDiv(imgSrcArray) {
                    var hiddenDivElem = $('<div style="visibility:hidden; position:fixed; bottom:5000px; left:4000px">');
                    var totalImagesLoaded = 0;
                    imgSrcArray.forEach(function(imgSrc, idx) {
                        var imgElem = $('<img src="' + imgSrc + '" />');
                        imgElem.on('load', function(){
                            totalImagesLoaded++;
                            if(totalImagesLoaded === imgSrcArray.length) {
                                deferred.resolve(true);
                            }
                        });
                        hiddenDivElem.append(imgElem);
                    });
                    $('body').append(hiddenDivElem);
                }
                return deferred.promise();
            }

            function setDataSrcAndSrc() {
                var device;
                //
                device = PersonalizationUtils.commonUtils.isMobile() ? 'mobile' : 'desktop';
                //
                $.each($('img.img-responsive', elem), function(idx, el){
                    var imgUrl;
                    //
                    imgUrl = $(el).attr('data-'+ device);
                    $(el).attr('data-src', imgUrl);
                    $(el).attr('src', imgUrl);
                });

            }


            function replacePersonalizedElement(result) {
                var dashboardbannerTmplStr, parsedTemplateStr, template, finalHtml, data, newElem;
                var compName = 'dashboardbanner';
                //
                // dashboardbannerTmplStr = $('#dashboard-template').html();
                // parsedTemplateStr = /<section.*<\/section>/g
                //     .exec(dashboardbannerTmplStr.replace(/\n/g, '<<NEW_LINE>>'))[0]
                //     .replace(/<<NEW_LINE>>/g, '\n');
                template = PrecompiledHandlebars[compName];
                data = {
                    hbs:{
                        isAuthor:false,
                        DashBoardBanner:{
                            variant: result.KPMG_Font,
                            title: result.KPMG_Short_Desc,
                            bannerAltText: result.KPMG_Short_Desc,
                            bannerimage:result.KPMG_Image,
                            readMoreText: window.kpmgPersonalize.i18n.customMsgs.readMore,
                            url: result.KPMG_URL
                        },
                        globalValues:{
                            assetDomainName: window.location.origin
                        }
                    }
                };
                finalHtml = template(data);
                newElem = $(finalHtml);
                $(elem).replaceWith(newElem);
                elem = newElem;
            }
        };
        //
        return Dashboardbanner;
    }
);
