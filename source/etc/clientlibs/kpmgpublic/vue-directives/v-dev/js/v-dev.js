define(['vue', 'jquery'], function(Vue, $) {
    'use strict';
    //
    var config = {
        bind: toggleBorderClasses,
        update: toggleBorderClasses
    };
    //
    Vue.directive('dev', config);
    // private functions
    function toggleBorderClasses(el, binding, vnode) {
        setCustomOutlineOnEl();
        // private functions
        function setCustomOutlineOnEl() {
            if (binding.value.isDev && binding.value.show) {
                var color, type, solidOrDashed;
                color = binding.value.color || 'blue';
                solidOrDashed = binding.value.color ? 'solid': 'dashed';
                type = binding.value.type || undefined;
                //
                $(el).css(type ? 
                          {
                        border: '1px ' + color + ' ' + solidOrDashed
                    }:{
                        outline: '1px ' + color + ' ' + solidOrDashed
                    });
            }
        }
    }
});