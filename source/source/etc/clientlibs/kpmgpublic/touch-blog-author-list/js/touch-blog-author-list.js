define(['jquery', 'tracking', 'handlebars', 'precompile', 'genericErrorDialog', 'helpers'],
    function($, Tracking, Handlebars, PrecompiledHandlebars, genericErrorDialog, Helpers) {
        'use strict';

        var TouchBlogAuthorList = function(elem) {
            var compName = 'touch-promotional',
                promoTemplate = PrecompiledHandlebars[compName],
                $noResultsDom,
                totalBlogs = [],
                $blogsContainerDom,
                $contentWrapper,
                snpParams = window.kpmgPersonalize.snp.params,
                currentAuthor = '',
                currentAuthorName = '',
                currentAuthorTitle = '';

            // fetching author details
            function fetchSiteBlogs() {
                var deferred = $.Deferred(),
                url = '/search/?',
                paramData = 'all_sites=false&facets=false&sort=KPMG_Filter_Date&x1=KPMG_Tab_Type&q1=Blogs&x2=KPMG_Template_Type&q2=touch-blog-post-template&x3=KPMG_Blog_Author&q3='+currentAuthor;

                if(snpParams && snpParams.languageCode && snpParams.countryCode) {
                    paramData += "&language=" + snpParams.languageCode;
                    paramData += "&site=" + snpParams.countryCode + "_" + snpParams.languageCode;
                }

                url += paramData;

                $.ajax({
                    url: url,
                    success: function (response) {
                        deferred.resolve(response);
                    },
                    error: function (response) {
                        deferred.reject();
                    }
                });

                return deferred;
            }

            function renderBlogs(result) {
                var blogDom = '',
                    blogsDom = '',
                    showAllDom = '',
                    rowBlogs = [],
                    data = {},
                    date = '',
                    topic = '',
                    formattedDate = '',
                    totalBlogs = [];


                if( result &&
                    result['customer-results'] && result['customer-results'].resultset &&
                    result['customer-results'].resultset.results && result['customer-results'].resultset.results.result ) {
                    totalBlogs = result['customer-results'].resultset.results.result;
                }

                $blogsContainerDom.find('.web-spinner').hide();

                $contentWrapper.addClass('content-loaded');
                var showAllString = $contentWrapper.data('showall');

                showAllDom = '<div class="show-all-blogs"><span tabindex="0" data-link-location="'+currentAuthorName+'" data-href="'+$contentWrapper.data('authorlink')+'" class="show-blogs-link trackable">'+showAllString+'</span></div>';

                if(Array.isArray(totalBlogs) && totalBlogs.length > 0) {
                    //Get the first 5 blogs from totalBlogs array
                    rowBlogs = totalBlogs.splice(0,5);

                    for(var i=0; i<rowBlogs.length; i++) {
                        date = rowBlogs[i].KPMG_Blog_Date_Time;
                        topic = (rowBlogs[i].KPMG_Blog_Topics && rowBlogs[i].KPMG_Blog_Topics.split('|')[0]) || '';

                        if(date && window.calanderProperties && window.dateFormatProperties) {
                            formattedDate = Helpers.dateFormat(date, window.calanderProperties, window.dateFormatProperties);
                        } else if (date) {
                            formattedDate = date;
                        }

                        data = {
                            'hbs': {
                                'promotional': {
                                    'title': rowBlogs[i].KPMG_Title,
                                    'shortTitle': rowBlogs[i].KPMG_Title,
                                    'longDescription': rowBlogs[i].KPMG_Description,
                                    'shortDescription': rowBlogs[i].KPMG_Short_Desc,
                                    'imageFileReference': rowBlogs[i].KPMG_Image,
                                    'primaryUrl': rowBlogs[i].KPMG_URL,
                                    'altText': rowBlogs[i].KPMG_Title,
                                    'publishDate': formattedDate,
                                    'isFormated': true,
                                    'one': true,
                                    'topic': topic
                                },
                                'globalValues': {
                                    'assetDomainName': window.kpmgAssetDomain
                                }
                            }
                        };

                        blogDom = promoTemplate(data);
                        blogsDom += '<div class="col-md-4 col-md-height blog">' + blogDom + '</div>';
                        if (i === 2) {
                            blogsDom = '<div class="row-same-height row-full-height">' + blogsDom + '</div>';
                            $contentWrapper.append(blogsDom);
                            blogsDom = '';
                        }
                    }

                    if (i === 1 || i === 4) {
                        blogsDom += '<div class="col-md-4 col-md-height blog"></div>';
                        blogsDom += '<div class="col-md-4 col-md-height blog"></div>';
                    } else if(i === 2) {
                        blogsDom += '<div class="col-md-4 col-md-height blog"></div>';
                    }

                    if(rowBlogs.length === 5) {
                        blogsDom += '<div class="col-md-4 col-md-height blog show-all-cell">' + showAllDom + '</div>';
                    }

                    if(blogsDom) {
                        blogsDom = '<div class="row-same-height row-full-height">' + blogsDom + '</div>';
                        $contentWrapper.append(blogsDom);
                    }

                } else {
                    $noResultsDom.removeClass('hidden');
                }
            }

            function showGenericErrorDialog() {
                genericErrorDialog.showDialog();
            }

            // hiding/showing author details component
            $('.header-list', elem).on('click', '.icon-circle-chevron-down, .icon-circle-chevron-up', function(e) {
                e.stopPropagation();
                var $this = $(this).closest('.list-item');
                $blogsContainerDom = $this.find('.details-container');
                $contentWrapper = $this.find('.content-wrapper');
                currentAuthor = $this.attr('data-author-name');
                currentAuthorName = $this.attr('data-author');
                currentAuthorTitle = $this.find('.list-item-title').text().trim();
                $noResultsDom = $this.find('.details-container > .no-results');

                if( $(this).hasClass('icon-circle-chevron-down') ) {
                    $blogsContainerDom.show();
                    $(this).removeClass('icon-circle-chevron-down').addClass('icon-circle-chevron-up');
                    $(this).attr('aria-expanded', 'true');
                    if(!$contentWrapper.hasClass('content-loaded')) {
                        $.when(fetchSiteBlogs())
                        .done(renderBlogs)
                        .fail(showGenericErrorDialog);
                    }
                    window.digitalData.component = window.digitalData.component || {};
                    window.digitalData.component.blogAccordion = currentAuthorName + ':selected';
                }
                else {
                    $blogsContainerDom.hide();
                    $(this).removeClass('icon-circle-chevron-up').addClass('icon-circle-chevron-down');
                    $(this).attr('aria-expanded', 'false');
                    window.digitalData.component = window.digitalData.component || {};
                    window.digitalData.component.blogAccordion = currentAuthorName + ':unselected';
                }
            });

            // making entire cell clickable
            $('.header-list', elem).on('click', '.inline-list-elements', function(e) {

                var isCellNotClicked = $(e.target).parent().hasClass('social-link') || $(e.target).hasClass('icon-circle-chevron-down') || $(e.target).hasClass('icon-circle-chevron-up');
                if(!isCellNotClicked) {
                    var currentParent = $(e.target).closest('.inline-list-elements');
                    tracking.track('componentLink', currentParent.find('.list-item-title').text());
                    window.location.href = currentParent.attr('data-href');
                }
            });

            $('.header-list', elem).on('click', '.social-link', function(e) {
                var linkName = $(e.target).closest('.inline-list-elements').find('.list-item-title').text();
                tracking.track('componentLink', linkName, false, $(this).text());
            });

            $('.header-list', elem).on('click', '.show-blogs-link', function(e) {
                window.location.href = $(e.target).attr('data-href');
            });

            $(elem).on('keyup', '.list-item, .accordion-icon, a, .no-results-wrapper, .show-blogs-link', function (e) {
                var $this = $(e.target);
                if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                    $this.trigger('focus').addClass("focusOutline");
                    e.stopImmediatePropagation();
                    e.preventDefault();
                }
            });
            $(elem).on('keydown', '.list-item, .accordion-icon, a, .no-results-wrapper, .show-blogs-link', function(e) {
                var $this = $(e.target);
                if( e.which === 9 ) {
                    $this.removeClass("focusOutline");
                }
                if (e.which === 13) {
                    $this.trigger("click");
                    e.stopImmediatePropagation();
                    e.preventDefault();
                }
            });
            
            $(elem).on('mousedown', '.module-touch-blog-author-list, .header-list, .list-item, .accordion-icon, a, .no-results-wrapper, .show-blogs-link', function(e) {
                $(document).find('.focusOutline').removeClass('focusOutline');
            });

			// Keep the following lines at the bottom of the TouchBlogAuthorList function
            var tracking = new Tracking(elem, 'TouchBlogAuthorList');
			$(document).trigger('template.loaded');
        };

        return TouchBlogAuthorList;
    }
);
