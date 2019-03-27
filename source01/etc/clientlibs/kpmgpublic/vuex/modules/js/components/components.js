define([], function () {
    return {
        namespaced: true,
        state: {
            'iconMenuCollapsed': true,
            'slideMenuVisible': false
        },
        mutations: {
            'SET_ICON_MENU_COLLAPSED': SET_ICON_MENU_COLLAPSED,
            'SET_SLIDE_MENU_VISIBLE_INFO': SET_SLIDE_MENU_VISIBLE_INFO
        }
    };
    //
    function SET_ICON_MENU_COLLAPSED (state, payload) {
        state.iconMenuCollapsed = payload;
    }
    function SET_SLIDE_MENU_VISIBLE_INFO (state, payload) {
        state.slideMenuVisible = payload;
    }
});


