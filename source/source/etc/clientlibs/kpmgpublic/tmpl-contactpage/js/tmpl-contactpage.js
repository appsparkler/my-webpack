define(['jquery', 'navigation', 'navflyouta', 'navflyoutb', 'navflyoutc', 'footer'],
    function($, Navigation, NavFlyoutA, NavFlyoutB, NavFlyoutC, Footer) {
        'use strict';

        var TmplContactpage = function(elem) {
            var nav             = new Navigation(),
                footer          = new Footer(),
                navflyouta       = new NavFlyoutA(),
                navflyoutb       = new NavFlyoutB(),
                navflyoutc       = new NavFlyoutC(),
                $components     = $('.component');

           
            $.each($components, function(index, val) {
                var name = $(val).attr('class'),
                    module = name.substring(7, name.indexOf(' '));

                require([module], function(mod) {
                    mod(val);
                });
            });
            var countryURL = $('.module-officelocator').find('.queryContainer').attr('data-countryurl'),
                kpmgPath = window.location.pathname.toLowerCase(),
                countryCode = (kpmgPath.indexOf('content/kpmgpublic') === -1) ? kpmgPath.split('/')[1] : kpmgPath.split('/')[3],
                langCode = (kpmgPath.indexOf('content/kpmgpublic') === -1) ? kpmgPath.split('/')[2] : kpmgPath.split('/')[4];
            $.ajax({
                method: "GET",
                url: countryURL + '.' + countryCode +'-'+ langCode + '.false.localtags.json'
            }).done(function(data) {
                var resp=[];
                resp.push(data);
                //console.log(data);
                sessionStorage.setItem('countryResponse', JSON.stringify(data));
            }).fail(function(err) {
                console.log(err);
            });
            $(document).trigger('template.loaded');
            // Loads the reflow script for mobile component reflow
            require(['jquerymobilereflow']);
        };
        $(function(){
            var tmpl = new TmplContactpage();
        });
    }
);
