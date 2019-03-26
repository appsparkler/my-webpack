/**
 * jQuery Share Button
 * Creates an instance of the Share Button without the use of a component.
 *
 * @author <a href='mailto:ntibbles@sapient.com'>Noel Tibbles</a>
 * @version 0.1
 * @requires jquery 1.7+
 *
 * Known Issues:
 * None
 *
 * Changelog:
 * v0.1 - Initial build
 *
 * Usage:
 * var $share = $('.share', elem).sharebtn({
 *      gigyaKey: config.gigyaKey,
 *      props : {
 *          id : 'shareBtn'
 *      },
 *      content : {
 *          label : window.kpmg.i18n.share
 *      },
 *      share : {
 *          description: 'This is an awesome page to share'
 *      }
 *  });
 * 
 * Calling Methods:
 * $share.sharebtn('update', { description: 'A new description' });
 **/


(function($) {
    var ShareButton = function(element, options) {
        var el = element,
            defaults = {
                props : {
                    'class' : 'share-component', // any and all classes to add to the button
                    href : '#', // the URL to link to (unsually not necessary)
                    id : 'shareBtn' // the ID of the button
                },
                content : {
                    label : 'Share' // the label of the button
                },
                share : {
                    title : document.title, // the title of the link to share
                    link : window.location.href, // the location of the link back to share
                    description : $('meta[name=description]').attr("content"), // the description of the content
                    media : null
                    /* 
                        The media object requires a properly formatted media object similar to below:
                        see Adding a Media Item to the UserAction Object 
                        http://developers.gigya.com/010_Developer_Guide/60_Sharing/020_Advanced_Report
                        {
                            type: 'image', 
                            src: 'http://www.gigya.com/wp-content/uploads/2011/11/Share-Plugins-400.png', 
                            href: 'http://www.gigya.com/site/content/socialize.aspx'
                        }
                    */
                }
            },
            settings = $.extend(true, {}, defaults, options),

            // private methods
            handleClick = function(evt) {
                evt.preventDefault();
                
                var act = new gigya.socialize.UserAction();

                act.setTitle(settings.share.title);
                act.setLinkBack(settings.share.link);
                act.setDescription(settings.share.description);

                if(settings.share.media) {
                    act.addMediaItem(settings.share.media);
                };

                var params = {
                    userAction: act,
                    snapToElementID: $(this).attr('id'),
                    operationMode: "simpleShare",
                    onSendDone: handleOnSendDone,
                    showMoreButton: true, // Enable the "More" button and screen
                    showEmailButton: true // Enable the "Email" button and screen
                };

                // Show the "Share" dialog
                gigya.socialize.showShareUI(params);
            },
            handleOnSendDone = function(evt) {
                try {
                    // track the social network sent to
                    s.trackEvent({"socialAction1": "share", "socialNetwork1": evt.providers, "events": "event22"}, "Social Link");
                } catch (err) {
                    //console.log('Tracking disabled hence "S" object is undefined...');
                }
            },
            generate = function(el, settings){
                var $a = $('<a>', settings.props ).on('click', handleClick);

                $a.html('<span class="icon-share-component"></span>' +
                        '<span class="component-link">'+ settings.content.label +'</span>');
                $(el).html($a);
            };


        this.settings = settings;

        generate(element, settings);
    },
    methods = {
        init : function(options) {
            if(!window.gigya) {
                $.getScript('http://cdn.gigya.com/js/gigya.js?apiKey='+options.gigyaKey);
            }

            return this.each(function() {
                if(!$.data(this, "sharebtn")){
                    $.data(this, "sharebtn", new ShareButton(this, options));
                }
            });

        },
        update : function(options) {
            $.extend($(this).data('sharebtn').settings.share, options);
        }
    };

    $.fn.sharebtn  = function(method) {
        // Method calling logic
        if ( methods[method] ) {
          return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
          return methods.init.apply( this, arguments );
        } else {
          $.error( 'Method ' +  method + ' does not exist on jQuery.sharebutton' );
        }
    };
}(jQuery));