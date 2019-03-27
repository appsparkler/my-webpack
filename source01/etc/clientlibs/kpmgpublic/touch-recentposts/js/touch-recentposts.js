define(['jquery', 'tracking', 'personalization', 'personalizationUtils', 'handlebars', 'precompile', 'genericErrorDialog', 'helpers'],
    function($, Tracking, personalization, personalizationUtils, Handlebars, PrecompiledHandlebars, genericErrorDialog, Helpers) {
        'use strict';

        var TouchRecentposts = function(elem) {

            var totalBlogs = [],
                compName = 'touch-promotional',
                promoTemplate = PrecompiledHandlebars[compName],
                $blogsContainerDom = $('.content-wrapper', elem);

            function fetchSiteBlogs() {
                var snpParams = window.kpmgPersonalize.snp.params,
                    countryCode,
                    languageCode;
                if(snpParams && snpParams.languageCode && snpParams.countryCode) {
                    countryCode = snpParams.countryCode;
                    languageCode = snpParams.languageCode;
                    var url ='/search/?all_sites=false&site=' + countryCode + '_' + languageCode + '&language=' + languageCode + '&x1=KPMG_Tab_Type&q1=Blogs&x2=KPMG_Blog_Banner_Flg&q2=false&sort=KPMG_Filter_Date&facets=false&sp_c=6';
                    return $.ajax({
                        url: url
                    });
                }
            }

            function initializeComponent() {
                if (window.kpmgPersonalize.misc.isAuthor) {
                    return false;
                }

                $.when(fetchSiteBlogs())
                    .done(renderBlogs)
                    .fail(showGenericErrorDialog);

            }

            function renderBlogs(result) {
                totalBlogs = result['customer-results'].resultset.results.result;
                renderBlogsRow(true);
            }

            function renderBlogsRow(isOnPageLoad) {
                var blogDom = '',
                    blogsDom = '',
                    rowBlogs = [],
                    data = {},
                    date = '',
                    topic = '',
                    formattedDate = '',
                    totalBlogsCount = totalBlogs.length,
                    $ul = $("ul.recent-posts", elem);

                $('.web-spinner', elem).hide();

                if (Array.isArray(totalBlogs) && totalBlogs.length > 0) {
                    rowBlogs = totalBlogs.splice(0, 6); //Get the first 6 blogs from totalBlogs array

                    for (var i = 0; i < rowBlogs.length; i++) {
                        if (i < 2) {
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
                        } else {
                            $('.recent-post-wrapper').removeClass('hidden');
                            $ul.append('<li><a href=" ' + rowBlogs[i].KPMG_URL + '">' + rowBlogs[i].KPMG_Title + '</a></li>');
                        }

                    }

                    if(i === 1) {
                        blogsDom += '<div class="col-md-4 col-md-height blog"></div>';
                        blogsDom += '<div class="col-md-4 col-md-height blog"></div>';
                    } else if(i === 2) {
                        blogsDom += '<div class="col-md-4 col-md-height blog"></div>';
                    }
                    $blogsContainerDom.prepend(blogsDom);

                    /* This is needed so that in mobile, there's no extra space at the end of the list, and
                     * in IE, the height is needed on the empty div containing the background for the background
                     * colour to render.
                     */
                    $(".recent-posts-list").height($ul.height());
                }
            }

            function showGenericErrorDialog() {
                genericErrorDialog.showDialog();
            }


            initializeComponent();

            $(elem).on('keyup', 'a', function (e) {
                if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                    $(this).trigger('focus').addClass("focusOutline");
                    e.stopImmediatePropagation();
                    e.preventDefault();
                }
            });
            $(elem).on('keydown', 'a', function(e) {
                if( e.which === 9 ) {
                    $(this).removeClass("focusOutline");
                }
                if (e.which === 13) {
                    $(this).trigger("click");
                    e.stopImmediatePropagation();
                    e.preventDefault();
                }
            });

            var trck = new Tracking(elem, 'TouchRecentposts');
            $(document).trigger('template.loaded');

        };

        return TouchRecentposts;
    }
);
