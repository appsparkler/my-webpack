/* global s */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['tracking'], factory);
    } else {
        root.amdWeb = factory(root.Tracking);
    }
}(this, function() {
    $ = window.jQuery;

    var lastClick = '',
        trckName = '',
        kpmgStr = "KPMG",
        memberFirm = (window.kpmgPersonalize && window.kpmgPersonalize.snp.params.countryCode && window.kpmgPersonalize.snp.params.countryCode.toUpperCase()) || '',
        regex = /(<([^>]+)>)/ig, // strips html tags from string
        $currentClick;

    if (memberFirm === "XX") {
        memberFirm = "GLOBAL";
    }

    //TODO : remove this code once the tracking code has been implemented in all places
    /*    _satellite.track  = function(){
            var args = Array.prototype.slice.call(arguments);
            console.log(JSON.stringify(args));
            args.splice(0,0, digitalData);
            args.splice(0,0,'SAT Tracking :');
            console.log.apply(console.log,args);
        };

        s.trackEvent = function(tracking){
            var args = Array.prototype.slice.call(arguments);
            console.log(JSON.stringify(args));
            args.splice(0,0,'Tracking :');
            console.log.apply(console.log,args);
        }*/


    var Tracking = function(context, location) {
        if (!location || typeof location === 'undefined') {
            throw "Location is required for tracking.js";
        }

        this.$context = $(context);
        this.location = location;

        // Delegate click event on anchor tag inside the component.
        this.$context.data({
                linkLocation: location
            })
            .off('click.tracking', 'a')
            .off('click.tracking', '.trackable')
            .on('click.tracking', 'a', $.proxy(this.handleClick, this))
            .on('click.tracking', '.trackable', '', $.proxy(this.handleClick, this));
    }

    /**
     * tracking method for warping the tracking calls
     * to avoid breaking of the components/templates
     *
     * @public
     * @method satelliteTracking
     *
     * @param {Object} tracking - tracking object which gets updated into digital data and DTM picks it
     * @param {string} trackingName - trackingName string based on which DTM picks information.
     *
     **/
    Tracking.prototype.satelliteTracking = function(tracking, trackingName, track) {
        try {
            trckName = trackingName;
            if (typeof track === 'undefined') {
                track = true;
            }
            // check if second parameter exists , if not then make the first paramter value as the second value. kind of function overloading.
            if (!trackingName) {
                var trackingName = tracking;
            }
            // if tracking exist and digitaldata exists then populate digitalData and fire satellite.
            if (tracking && typeof tracking === 'object' && digitalData && typeof digitalData === 'object') {
                for (var key in tracking) {
                    if (tracking.hasOwnProperty(key)) {
                        digitalData[key] = tracking[key];
                    }
                }
            }
            //track by default is true, False if extra parameters to be passed.
            // call DTM tracking method which will pick the digitalData information.
            if (track) {
                _satellite.track(trackingName);
            }
            trckName = '';

        } catch (err) {}
    };

    /**
     * tracking internal clicks for components
     * @param  {Event} evt Click event object
     */
    Tracking.prototype.handleClick = function(evt) {
        try {
            var $this = $currentClick = $(evt.currentTarget),
                isSatelliteTrack = false;

            if ($this.closest('[class^="module-"]').hasClass('component-trackable')) {
                isSatelliteTrack = true;
            }
            if (!$this.data('stoptrack') && lastClick !== $this && $this.attr('href') !== '#' && $this.attr('href') !== 'javascript:void(0);' && !$this.data('target')) {
                var tagretLink = $this.data('linkLocation'),
                    trackname = $this.data('trackname') || trckName || 'componentLink',
                    linkLoc = '',
                    HTMLtext = $this.find('h1,h2,h3,h4,.title,label').html() || $this.parent().find('a').attr('title') || $this.html().toLowerCase(),
                    HTMLtext = HTMLtext.replace(regex, "").replace(/(  |\r\n\t|\n|\r\t)/gm, ""),
                    name = this.$context.attr('class'),
                    componentName = name.substring(7, name.indexOf(' ')),
                    linkText = evt.currentTarget.innerText || evt.currentTarget.value || $this.data('value'),
                    linkDom;

                if(window.kpmgPersonalize.isBlog) {
                    linkDom = $this.find('h1,h2,h3,h4,.title,label')[0];
                    linkText = (linkDom) ? linkDom.innerText : linkText;
                }

                //Call _satellite.track method only when closest module has class "component-trackable" - KPMGS-11303
                if (isSatelliteTrack) {
                    this.track(trackname, linkText, true);
                }

                if (typeof tagretLink !== 'undefined') {
                    linkLoc = tagretLink.toLowerCase();
                }

                if ($(".navigation-logo").is($this) || $this.is('a.logo-image-component')) {
                    linkLoc = "navigation";
                    HTMLtext = "home";
                } else if ($this.parents('.nav-grouping').length > 0 || $this.parents('.desktop-navbar-component').length > 0 || $this.parents('.mobile-navbar-component').length > 0) {
                    linkLoc = "navigation";
                }
                // if its footer component
                if (componentName === "footer" || componentName === "FooterV2" || componentName === "touch-popularposts" || componentName === "touch-populartags") {
                    linkLoc = "footer";
                }
                if (componentName === "touch-post-stats") {
                    linkLoc = "tags";
                }
                if (componentName === "touch-topic-list-header" || componentName === "touch-author-list-header") {
                    if($this.hasClass('view-topics-spotlight') || $this.hasClass('view-author-spotlight')) {
                        HTMLtext = $this.html().toLowerCase();
                        HTMLtext = HTMLtext.replace(regex, "").replace(/(  |\r\n\t|\n|\r\t)/gm, "");
                    }
                }
                // no tracking for socialChannels component
                if (componentName === "socialchannels") {
                    return false;
                }
                var tracking = {
                    'linkLocationID1': (linkLoc + '_' + HTMLtext).trim(),
                    'linkLocationID2': (linkLoc + '_' + HTMLtext).trim(),
                    'linkLocation1': linkLoc,
                    'linkLocation2': linkLoc,
                    'events': 'event11'
                };

                s.trackEvent(tracking, 'Internal Link');

                lastClick = $this;
            }

        } catch (err) {
            console.log(err);
        }

    };

    Tracking.prototype.track = function(trackname, linkText, handleClick, linkName) {

        try {

            var name = this.$context.attr('class'),
                isPersonalized = this.$context.attr('personalize') === 'true',
                isArticleVal = this.$context.closest('[article]').attr('article') || 'false',
                componentName = name.substring(7, name.indexOf(' ')),
                articleTitle = (window.kpmgPersonalize.isBlog && handleClick) ? $currentClick.find('h1,h2,h3,h4,.title,label')[0] : this.$context.find('h1,h2,h3,h4,.title,label')[0],
                articleTitle = (articleTitle) ? articleTitle.innerText : componentName,
                sortType = (window.kpmgPersonalize.snp.params && window.kpmgPersonalize.snp.params.sortType) ? window.kpmgPersonalize.snp.params.sortType.split('=')[1] : 'default',
                dpos = 'D' + (this.$context.closest('[data-desktop-cell]').data('desktop-cell') || 0),
                mpos = 'M' + (this.$context.closest('[data-mobile-cell]').data('mobile-cell') || 0),
                linkURL = this.$context.attr('href') || '',
                articleNameVal = articleTitle,
                tracking = {},
                topic = '';

            setArticleTitleForNestedElementInComponentElement();

            if(componentName === "touch-post-stats") {
                articleTitle += linkText.trim();
                articleNameVal = articleTitle;
            }

            if(componentName === "touch-blogshare" || componentName === "touch-featuredauthors") {
                articleTitle = linkText.trim();
                articleNameVal = articleTitle;
            }

            tracking = {
                component: {
                    isArticle: isArticleVal,
                    componentDetail: componentName + '|' + dpos + '-' + mpos + '|' + articleTitle,
                    componentRanking: sortType,
                    ArticleType: (digitalData && digitalData.page.pageInfo && digitalData.page.pageInfo.industryPath) ? digitalData.page.pageInfo.industryPath : ''
                },
                link: {
                    LinkName: linkText,
                    FindingMethod: componentName,
                    internalLink: linkName || 'link',
                    internalLinkcategory: componentName,
                    internalLinkURL: linkURL

                },
                article: {
                    ArticleName: articleNameVal
                }

            };

            if (handleClick) {
                window.digitalData.page.article.articleDetails = articleNameVal.concat(' | ', kpmgStr, ' | ', memberFirm);
            }

            if( window.kpmgPersonalize.isBlog) {
                if(handleClick && $currentClick) {
                    topic = $currentClick.attr('data-topic') || '';
                }
                if(tracking.component.ArticleType) {
                    tracking.component.ArticleType = ('Blog | ' + tracking.component.ArticleType).trim();
                } else {
                    tracking.component.ArticleType = ('Blog | ' + topic).trim();
                }

                tracking.article.ArticleName = ('Blog | ' + tracking.article.ArticleName).trim();

                if(!handleClick) {
                    delete tracking.component.ArticleType;
                    delete tracking.article.ArticleName;
                    delete window.digitalData.page.article.articleDetails;
                }
            }

            this.satelliteTracking(tracking, trackname);
            // private functions
            // We may want to fire satelliteTracking on an element inside a parent-component.  In such cases we can follow the following HTML structure.  A working example of this can be seen for Carousel-slides and Articles inside of latest-thinking-component
            /* EXAMPLE
              <section class="module-somecomponent">
                  <div>
                    <!--
                      set nested-element-tracking class on the link that will be tracked
                      set nested h1 with the Title with display:none;
                    -->
                    <a class="nested-element-tracking">
                      <h1 class="d-none">Title</h1>
                    </a>
                  </div>
              </section>
            */
            function setArticleTitleForNestedElementInComponentElement() {
                var isNestedElementTrackable;
                //
                isNestedElementTrackable = $currentClick && $currentClick.hasClass('nested-element-tracking');
                //
                if (isNestedElementTrackable) {
                    articleTitle = articleNameVal = $currentClick.find('h1').text().trim();
                }
            }
        } catch (err) {
            console.log("Error:" + err);
        }
    };

    return Tracking;
}));
