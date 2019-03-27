define(['jquery'], function($){
    var CONTEXT;
    CONTEXT = '#navigation-v2-data';
    //
    return {
        navbarNav: getNavbarNavInitialState(),
        logo: getLogoInitialState(),
        siteSelectorList: getSiteSelectorListInitialState(),
        accountActionList: setAccountActionListInitialState(),
        mobileTabs: setMobileTabsInitialState(),
        search: setSearchData(),
        blogHeader: setBlogHeaderData()
    };

    // blog header data binding
	function setBlogHeaderData() {
		var BLOG_HEADER_SELECTOR, blogData;
		//
		BLOG_HEADER_SELECTOR = '#navigation-v2-data-blog-navbar';
		blogData = $(BLOG_HEADER_SELECTOR, CONTEXT).data('blog-navbar');
		return blogData;
	}

    //
    function getNavbarNavInitialState() {
		var NAVBAR_NAV_SELECTOR, navbarNav;
		// SET NAVBAR NAV DATA
		NAVBAR_NAV_SELECTOR = '#navigation-v2-data-navbar-nav';
		navbarNav = $(NAVBAR_NAV_SELECTOR, CONTEXT).data('navbar-nav');
		setFlyoutDataOnNavbarNavItems();
        setPersonalizableCells();
        return navbarNav
        //
        function setFlyoutDataOnNavbarNavItems() {
            var NAVFLYOUTS_SELECTOR;
            NAVFLYOUTS_SELECTOR = '#navigation-v2-data-nav-flyout li div.nav-flyout-component-data';
            $.each($(NAVFLYOUTS_SELECTOR, CONTEXT), iterateNavflyoutDataElements);
            // private functions
            function iterateNavflyoutDataElements(idx, el) {
                var type, cell1Data, cell2Data, cell3Data;
                //
                type = getType();
                cell1Data = $(el).data('cell1');
                cell2Data = $(el).data('cell2');
                cell3Data = $(el).data('cell3');
                navbarNav[type].flyout = {
                    cell1: cell1Data,
                    cell2: cell2Data,
                    cell3: cell3Data
                };
                function getType() {
                    var path, key, type;
                    //
                    key = 'jcr:content/navigation-v2/';
                    path = $(el).data('path');
                    //
                    type = path.slice(path.indexOf(key) + key.length);
                    //
                    return type;
                }
            }
        }

        function setPersonalizableCells(){

        }
	}

    function getLogoInitialState() {
		var LOGO_SELECTOR, logo;
		//
		LOGO_SELECTOR = '#navigation-v2-data-logo';
		logo = $(LOGO_SELECTOR, CONTEXT).data('logo');
		return logo;
	}

    function getSiteSelectorListInitialState() {
		var SITE_SELECTOR_DATA_ELEM_ID, siteSelectorList;
		//
		SITE_SELECTOR_DATA_ELEM_ID = '#navigation-v2-data-site-selector';
		//
		siteSelectorList = $(SITE_SELECTOR_DATA_ELEM_ID, CONTEXT).data('siteSelector');
		//
		return siteSelectorList;
	}

    function setAccountActionListInitialState() {
        var accountActionList;
        accountActionList = $('#navigation-v2-data-my-account-flyout', CONTEXT).data('myAccountFlyout');
        return accountActionList;
	}

    function setSearchData() {
        var searchData;
        searchData = $('#navigation-v2-data-search', CONTEXT).data('search');
        return searchData;
    }

    function setMobileTabsInitialState() {
        var mobileTabs, elementList;
        //
        mobileTabs = {};
        elementList = [
            {id: '#navigation-v2-data-my-account-flyout', key: 'userProfile' },
            {id: '#navigation-v2-data-search', key: 'search'},
            {id: '#navigation-v2-data-site-selector', key: 'languageLocale'}
        ];
        //
        elementList.forEach(elementListIterationFn);
        return mobileTabs;
        // private functions
        function elementListIterationFn(elem, idx) {
            var jqElem;
            //
            jqElem = $(elem.id, CONTEXT);
            //
            mobileTabs[elem.key] = $(jqElem).data('mobileTab');
            mobileTabs[elem.key].isVisible = true;
        }
	}

});
