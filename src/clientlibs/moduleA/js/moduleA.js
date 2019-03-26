define([], function() {
    var ModuleA = function(config){
      this.foo = config.foo,
      this.bar = config.bar
    };
    return ModuleA;
});
