(function(){ /* ... */ });

/*
global helpers
--------------------------------------------------------------
 */
// DOM ready
function DocumentReady(fn) {
    // get document ready state
    if (document.readyState != 'loading') {
        // function init
        fn();
    } else {
        // document content loaded function 
        document.addEventListener('DOMContentLoaded', fn);
    }
};
// event trigger delegation
function EventTrigger(eventType, eventSelector) {
    // init document events
    var event = document.createEvent('HTMLEvents');
    // trigger navigation hide event
    event.initEvent(eventType, true, false);
    // trigger navigation hide event
    document.querySelector(eventSelector).dispatchEvent(event);
}
// get parents
function getParents(el, parentSelector /* optional */) {
    // If no parentSelector defined will bubble up all the way to *document*
    if (parentSelector === undefined) {
        parentSelector = document;
    }
    // set parents array
    var parents = [];
    var p = el.parentNode;
    // iterate over each parent level
    while (p !== parentSelector) {
        var o = p;
        parents.push(o);
        p = o.parentNode;
    }
    // set parent array result
    parents.push(parentSelector); // Push that parentSelector you wanted to stop at
    // return
    return parents;
}
// array includes check 
function isInArray(value, array) {
    return array.indexOf(value) > -1;
}