define([
    'jquery',
    'handlebars',
    'config'
],
        function (
                $,
                Handlebars,
                config
                ) {
            'use strict';
            var global_i18n,
                tmpl = '',
                moduleName = '',
                jsFiles = [];
            function getFileLoader(callback) {
                this.callback = callback;
            }
            getFileLoader.prototype.load = function (path) {
                $.ajax({
                    async: false,
                    dataType: path.slice(path.indexOf('.') + 1),
                    url: path,
                    success: this.callback,
                    error: function (obj, msg, err) {
                        console.error("Error: ", err.message);
                    }
                });
            };
            function ref(obj, str) {
                //if (str === undefined) {
                //    console.log("str" + str);
                //}
                //else {
                if (str !== undefined) {
                    return str.split(".").reduce(function (o, x) {
                        return o[x];
                    }, obj);
                }
            }
            //commented by senthil function handleKeyPress(evt) {
                // look for the 'ctrl' keypress
                //commented by senthilif (evt.keyCode === 17) {
                    //commented by senthil$('body').toggleClass('debug');
                //commented by senthil}
            //commented by senthil}
            $(function () {
                var $body = $('body'),
                    isTemplate = $body.hasClass('template'),
                    source = $body.html(),
                    template = Handlebars.compile(source),
                    jsonLoader = new getFileLoader(function (data) {
                        global_i18n = data;
                    });
                // debugging helper
                //commented by senthil(document).on('keyup', handleKeyPress);
                // Load the i18n data here for the handebar helper
                jsonLoader.load("/etc/clientlibs/kpmgpublic/global/i18n/i18n.json");
                // Helper to recognize i18n values.
                Handlebars.registerHelper('i18n', function (key) {
                    return new Handlebars.SafeString(ref(global_i18n, key));
                });
                Handlebars.registerHelper('embed', function (module, tmpl) {
                    var template,
                        _module = module.toLowerCase(),
                        scriptid = tmpl.hash['id'],
                        partialPath = tmpl.hash['script'],
                        path = partialPath.split('/'),
                        slug = config.partials + _module + "/templates/" + path[path.length - 1],
                        htmlLoader = new getFileLoader(function (html) {
                            template = html;
                        });
                    htmlLoader.load(slug + ".html");
                    template = "<script id='" + scriptid + "' type='text/x-handlebars'>" + template + "</script>";
                    return new Handlebars.SafeString(template);
                });
                Handlebars.registerHelper('include', function () {
                    var templateJson, template,
                        module = module.toLowerCase(),
                        slug = config.partials + module + "/" + module,
                        jsFile = config.clientlibs + module + '/js/' + module + '.js',
                        jsonLoader = new getFileLoader(function (data) {
                            templateJson = data;
                        }),
                        htmlLoader = new getFileLoader(function (html) {
                            template = Handlebars.compile(html);
                        });
                    moduleName = module;
                    jsFiles.push(jsFile);
                    if (module.indexOf('tmpl') > -1) {
                        tmpl = module;
                    }
                    // load the JSON and HTML data
                    jsonLoader.load(slug + ".json");
                    htmlLoader.load(slug + ".html");
                    // append the CSS file for the component to the page
                    if (!isTemplate) {
                        $('head').append('<link href="' + config.clientlibs + module + '/css/' + module + '.css' + ' "rel="stylesheet" media="all" type="text/css" />');
                    }
                    return new Handlebars.SafeString(template(templateJson));
                });
                // write out the template to the DOM
                $body.html(template({}));
                // replace the array if this is a template
                if (tmpl.length) {
                    jsFiles = [config.clientlibs + 'pages/' + tmpl + '.min.js'];
                }
                // load all required scripts and initialize the first one
                require(jsFiles, function (module) {
                    if (typeof module !== 'undefined') {
                        module($('.module-' + moduleName));
                    }
                });
            });
        }
);