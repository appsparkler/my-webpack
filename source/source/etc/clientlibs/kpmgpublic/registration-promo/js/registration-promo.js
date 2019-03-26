define(['jquery', 'underscore', 'handlebars', 'tracking', 'personalizationUtils', 'cqservice', 'common-utils', 'helpers'],
    function($, _, Handlebars, Tracking, PersonalizationUtils, cqservice, CommonUtils, Helpers) {
        'use strict';

        var RegistrationPromo = function(elem) {
            var me = this;

            me.element = $(elem);
            me.showPromo = window.kpmgPersonalize.isSitePersonalize && PersonalizationUtils.privacyUtils.isAccepted();
            me.isLoggedIn = PersonalizationUtils.accountUtils.isLoggedIn();
            me.articles = me.getLastReadFlexTemplates();
            me.links = {};
            me.metaObject = PersonalizationUtils.commonUtils.getMetaObject('meta[name^=KPMG]');

            if (me.showPromo) {
                me.initialize();
            }

            // Keep the following lines at the bottom of the RegistrationPromo function
            me.tracking = new Tracking(elem, 'RegistrationPromo');
			$(document).trigger('template.loaded');
        };

        RegistrationPromo.prototype.initialize = function() {
            var me = this;

            PersonalizationUtils.myKpmgFlyoutUtils.getLinksJson().done(function(data) {
                me.links = data.links;
            });

            me.element.attr("href", CommonUtils.CONSTANTS.DOMAIN + me.links.register.url);

            if (sessionStorage.getItem("smartLogicTags") === null || sessionStorage.getItem("smartLogicTags") === "") {
                $.ajax({
                    url: PersonalizationUtils.constants.interestsServiceURL
                        .replace(/<countryCode>/g, window.kpmgPersonalize.snp.params.countryCode)
                        .replace(/<languageCode>/g, window.kpmgPersonalize.snp.params.languageCode)
                        .replace(/<boolean>/g, "false"),
                    success: function(response) {
                        var tags = PersonalizationUtils.commonUtils.processInterestsJson(response);
                        sessionStorage.setItem("smartLogicTags", JSON.stringify(tags));

                        var evt = document.createEvent("CustomEvent");
                        evt.initCustomEvent('smartLogicTags', false, false, {});
                        document.dispatchEvent(evt);
                    }
                });
            }

            if(me.metaObject.KPMG_Template_Type && me.metaObject.KPMG_Template_Type.indexOf('flexible-template') > -1) {
                me.handleOnFlexTemplate();
            }

            me.element.on('click', function () {
                Helpers.triggerSatteliteTracking("onClickFlexCTA");
            });
        };

        RegistrationPromo.prototype.getLastReadFlexTemplates = function() {
            var locale = PersonalizationUtils.accountUtils.getLocale(),
                key = '/' + locale.countryCode + '/' + locale.languageCode,
                lastReadFlexTemplates = JSON.parse(sessionStorage.lastReadFlexTemplates || '{}');

            return (lastReadFlexTemplates[key] || []);
        };

        RegistrationPromo.prototype.handleOnFlexTemplate = function() {
            var me = this,
                commonTagsArray = [],
                currentPage = [];

            currentPage = me.articles.filter(function(article) {
                if(article.KPMG_URL === '/content/kpmgpublic' + me.metaObject.KPMG_URL) {
                    return true;
                }
            });

            commonTagsArray = me.getCommonTags();

            if(me.showPromo &&
                commonTagsArray.length &&
                me.articles.length >= 3 &&
                currentPage.length === 0 && // current page should not be in the last 3 visited pages list
                !PersonalizationUtils.accountUtils.isLoggedIn() &&
                !sessionStorage.getItem("registrationPromoOnFlexTemplate")
            ) {

                sessionStorage.setItem("registrationPromoOnFlexTemplate", true);

                if(sessionStorage.getItem("smartLogicTags") !== null && sessionStorage.getItem("smartLogicTags") !== "") {
                    me.showPromoComponent();
                } else {
                    document.addEventListener("smartLogicTags", function() {
                        me.showPromoComponent();
                    });
                }

            }
        };

        RegistrationPromo.prototype.getCommonTags = function() {
            var me = this,
                metaObject = PersonalizationUtils.commonUtils.getMetaObject('meta[name^=KPMG]'),
                queryKeys = {
                    KPMG_Industry_ID_Loc: 'sl-industry-id-local',
                    KPMG_Topic_ID: 'sl-topics-id',
                    KPMG_Service_ID_Loc: 'sl-service-id-local'
                },
                metaTags = [],
                pageTags = [];

            me.commonTagsArray = [];

            Object.keys(queryKeys).forEach(function(queryKey) {
                if (metaObject[queryKey]) {
                    metaTags = metaObject[queryKey].split(',');
                    pageTags = pageTags.concat(metaTags);
                }
            });

            pageTags = _.uniq(pageTags);

            me.articles.forEach(function(article, index) {
                Object.keys(queryKeys).forEach(function(queryKey) {
                    var tags;

                    if (article[queryKey]) {
                        tags = article[queryKey].split(',');
                        tags = _.intersection(tags, pageTags);
                        me.commonTagsArray = me.commonTagsArray.concat(tags);
                    }
                });
            });

            me.commonTagsArray = me.getMostRepeatedTags(me.commonTagsArray);

            return me.commonTagsArray;
        };

        RegistrationPromo.prototype.getMostRepeatedTags = function(tagsArray) {
            var max = 0,
                maxarr = [],
                counter = [],
                unique = [],
                i, j;

            tagsArray.forEach(function(){
                counter.push(0);
            });

            for(i=0; i<tagsArray.length; i++) {
                for(j=0; j<tagsArray.length; j++) {
                    if(tagsArray[i] === tagsArray[j]) {
                        counter[i]++;
                    }
                }
            }

            max = arrayMax(counter);

            for(i=0; i<tagsArray.length; i++) {
                if(counter[i] === max) {
                    maxarr.push(tagsArray[i]);
                }
            }

            unique = maxarr.filter(function(value, index, self) {
                return self.indexOf(value) === index;
            });

            function arrayMax(arr) {
                var len = arr.length,
                    max = -Infinity;
                while (len--) {
                    if (arr[len] > max) {
                        max = arr[len];
                    }
                }
                return max;
            }

            return unique;
        };

        RegistrationPromo.prototype.getRandomTag = function(commonTagsArray) {
            var me = this,
                commonTags = commonTagsArray || me.commonTagsArray;

            return commonTags[Math.floor(Math.random() * commonTags.length)];
        };

        RegistrationPromo.prototype.getSmartLogicTag = function(zthesId) {
            var me = this,
                smartlogicTag = '',
                smartlogicTags = sessionStorage.getItem('smartLogicTags') ? JSON.parse(sessionStorage.getItem('smartLogicTags')) : {};

            function pickTag(tagArray) {
                var tag;

                for (var i=0; i<tagArray.length; i++) {
                    tag = tagArray[i];
                    if(tag['zthes-id'] === zthesId) {
                        smartlogicTag = tag.name;
                    }

                    if(tag.tags && tag.tags.length) {
                        pickTag(tag.tags);
                    }
                }
            }

            pickTag(smartlogicTags.tags || []);

            return smartlogicTag;
        };

        RegistrationPromo.prototype.updatePromoWithSmartlogicTag = function(smartlogicTag) {
            var me = this;

            me.element.find('.heading').text(me.element.find('.heading').text().replace('{tag_name}', smartlogicTag));
            me.element.find('.description').text(me.element.find('.description').text().replace('{tag_name}', smartlogicTag));
        };

        RegistrationPromo.prototype.showPromoComponent = function() {
            var me = this,
                randomTag = me.getRandomTag(me.commonTagsArray),
                smartlogicTag = me.getSmartLogicTag(randomTag);

            me.updatePromoWithSmartlogicTag(smartlogicTag);
            $(".registrationpromo-row").show();
            me.element.removeClass('hidden');
            Helpers.triggerSatteliteTracking("flexCTA");
        };

        return RegistrationPromo;
    }
);
