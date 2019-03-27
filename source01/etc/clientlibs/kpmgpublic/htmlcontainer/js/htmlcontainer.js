/* global s */
define(['jquery', 'tracking', 'addtolibrary'],
        function ($, Tracking, AddToLibrary) {
            'use strict';
            var HtmlContainer = function (elem) {
                /** ------------ Add to Library - START -------------- **/
                var $addToLibraryDom = $(".addtolibrary-html"),//This should be available in html container
                    $addToLibraryData = $(elem).data(),
                    addToLibraryHtml = "";
                if ($addToLibraryDom.length > 0) {
                    addToLibraryHtml = '<div class="module-addtolibrary component self-contained clearfix" aria-label="add to Library"' +
                        'data-description="'+$addToLibraryData.description+'"' +
                        'data-shortDescription="'+$addToLibraryData.shortDescription+'"' +
                        'data-href="'+$addToLibraryData.pageUrl+'"' +
                        'data-image="'+$addToLibraryData.image+'"' +
                        'data-title="'+$addToLibraryData.title+'"' +
                        'data-shortTitle="'+$addToLibraryData.shortTitle+'"' +
                        'data-article-type="'+$addToLibraryData.articleType+'" >' +
                            '<a href="#" class="addtolibrary-cta" data-backdrop="static" data-keyboard="false" data-modal-url="" data-remote="" id="addToLibrary" tabindex="0" title="Add to library" aria-haspopup="true">' +
                                  '<span class="icon-star trackable"></span>' +
                                  '<span class="btn-copy">'+$addToLibraryData.save+'</span>' +
                            '</a>' +
                        '</div>';

                    $addToLibraryDom.html(addToLibraryHtml);
                    AddToLibrary($('.module-addtolibrary', elem));
                }
                /** ------------ Add to Library - END ---------------- **/

                var trck = new Tracking(elem, 'HtmlContainer');
                $(document).trigger('template.loaded');
            };
            return HtmlContainer;
        }
);
