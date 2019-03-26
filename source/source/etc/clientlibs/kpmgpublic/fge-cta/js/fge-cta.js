define(['jquery', 'tracking', 'personalizationUtils'],
    function($, Tracking, personalizationUtils) {
        'use strict';

        var fgecta = function(elem) {

            // case:- Authored Mode, show component...
            if( window.kpmgPersonalize.misc.isAuthor ) {
                $(elem).removeClass('hide-cta-component');
            }

            // case:- Publish mode and content of component also authored:- show component.
            if( !window.kpmgPersonalize.misc.isAuthor && ($(elem).children(0).attr('title')!=="" ) ) {
                $(elem).removeClass('hide-cta-component');
            }

            // case:- Component is not authored properly.
            if( $(elem).children(0).attr('title') === "" ){
                $(elem).children(0).css("cursor", "default" );
            }

            $('.module-fge-cta').find('a').off('click').on('click',function(evt){
                var uniqueId = $(this).attr('data-unique-id');
                var formBuilderID = 'formbuilder-id-'+uniqueId;

                if( $(this).attr('title')!=="" ){
                    $('#'+formBuilderID+' .default-form').css("display","block");
                    $('#'+formBuilderID).trigger('kpmg-formbuilder:display-form');
                }
            });

			// Keep the following lines at the bottom of the Formbuilder function
            var trck = new Tracking(elem, 'fgecta');
			$(document).trigger('template.loaded');
        };

        return fgecta;
    }
);