requirejs.config({
    "baseUrl": "/js/",
    "paths": {
        // ------------------------------------------------------------------------
        // globals
        // ------------------------------------------------------------------------
        "app"                   : "app",
        "main"                  : "app/main",
        "global"                : "app/global",
        "params"                : "app/params",
        // ------------------------------------------------------------------------
        // libs
        // ------------------------------------------------------------------------
        // "modernizr"             : "../node_modules/modernizr/src/Modernizr",
        "html5shiv"             : "libs/node_modules/html5shiv/src/html5shiv",
        // ------------------------------------------------------------------------
        // helpers
        // ------------------------------------------------------------------------
        // "async"              : "libs/plugins/async",
        // ------------------------------------------------------------------------
        // handler
        // ------------------------------------------------------------------------
        "MainUI"                : "app/Handler/MainUI",
        // ------------------------------------------------------------------------
        // model
        // ------------------------------------------------------------------------
        "FormHandler"           : "app/Model/FormHandler"
        // view / components
        // ------------------------------------------------------------------------

    },
    urlArgs: "v=" + (new Date()).getTime(),
    shim: {}
});
// global libs
requirejs(["main"]);
// global ui handler
requirejs(["MainUI"]);
// ie detect
var isIE = !+'\v1',
    isIE_wHTML5 = '\v'=='v';
// ie detected dept
if (isIE || isIE_wHTML5) {
    // load html5shiv lib
    requirejs(["html5shiv"]);
}