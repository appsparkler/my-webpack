define(['jquery', 'tracking', 'personalizationUtils'], function($, Tracking, personalizationUtils) {
    'use strict';
    var AddToLibrary = function(elem, componentName) {
        var tracking = new Tracking(elem, 'AddToLibrary'),
            data = $(elem).data(),
            id = 'AddToLibrary' + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1),
            $addTolibraryCta = $('.addtolibrary-cta', elem),
            $kpmgModal = $('#kpmgModal'),
            modalOptions = $addTolibraryCta.data(),
            links, url;

        if (personalizationUtils.accountUtils.isLoggedIn() || window.kpmgPersonalize.isSitePersonalize) {
            $(elem).show();

            // enable the button if the link is not saved before.
            if (data && typeof data.href === 'string') {
                toggleFavorite(data.href);
            }

            $addTolibraryCta.attr('id', id);

            personalizationUtils.myKpmgFlyoutUtils.getLinksJson().done(function(data) {
                    links = data.links;
                    $addTolibraryCta.off('click.save').on('click.save', handleClick);
                });
        } else {
            disableAddtoLibrary();
        }

        /**
         * handleclick on the cta
         * @param  {[type]} evt event object
        */
        function handleClick(evt) {
            evt.preventDefault();
            evt.stopPropagation();

            // if the url already exist then prevent the click to do anything.
            var fav = personalizationUtils.storeUtils.findArticleByUrl(data.href);
            if (data && typeof data.href === 'string' && fav && fav.length) {
                return false;
            } else {
                // fire-analytics call only if the article is not added to any list.

                // Analytics piece
                var memberFirm = (window.kpmgPersonalize && window.kpmgPersonalize.snp.params.countryCode && window.kpmgPersonalize.snp.params.countryCode.toUpperCase()) || '';
                if (memberFirm === "XX") {
                    memberFirm = "GLOBAL";
                }
                var articleTitle = $(elem).data('title');
                var articleType = $(elem).data('articleType');
                window.digitalData.page.article.articleDetails = articleTitle.concat(' | ', 'KPMG', ' | ', memberFirm);
                //
                var trackingList = {
                    interactionType: "Article Interaction",
                    ArticleSaveLocation: "Component"
                };
                //
                tracking.satelliteTracking(trackingList, 'articleSaveStart', false);
                tracking.track('articleSaveStart');

                // Analytics piece
            }

            if (personalizationUtils.accountUtils.isLoggedIn()) {
                // if the clicked cta has data attributes, then take them and apply them into overlay for reference
                url = links.addtolibrary.url;
                if (data) {
                    $kpmgModal.data('article', data);
                    $kpmgModal.data('parent', id);
                }
            } else {
                url = links.learnmore.url;
                if (data) {
                    $kpmgModal.data('article', data);
                    $kpmgModal.data('parent', id);
                }
            }

            if (personalizationUtils.storeUtils.getAllArticles().length >= personalizationUtils.storeUtils.getArticleSaveLimit() && !$addTolibraryCta.hasClass('active')) {
                $kpmgModal.data( 'articlelimit', 'true');
            }

            window.kpmg.modalOpenerUrl = url;
            $kpmgModal.bs3modal({
                backdrop: modalOptions.backdrop,
                keyboard: modalOptions.keyboard,
                remote: url,
                modalUrl: url
            });
        }

        function disableAddtoLibrary() {
            $addTolibraryCta.off('click.save');
            $(elem).hide();
        }

        /**
         * [toggleFavorite description]
         * @param  {[type]} url [description]
         * @return {[type]}     [description]
         */
        function toggleFavorite(href) {
            var fav = personalizationUtils.storeUtils.findArticleByUrl(href);
            if (fav && fav.length) {
                $addTolibraryCta.addClass('active');
            } else {
                $addTolibraryCta.removeClass('active');
            }
        }

        $('.addtolibrary-cta', elem).on('keydown focus', function () {
            $(this).addClass('focusOutline');
        });

        $('.addtolibrary-cta', elem).on('blur', function () {
            $(this).removeClass('focusOutline');
        });

        $(document).trigger('template.loaded');
    };
    return AddToLibrary;
});
