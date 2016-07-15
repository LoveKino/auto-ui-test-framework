'use strict';

module.exports = (eventList, callback) => {
    // TODO window close event
    let captureUIAction = (document) => {
        // dom event
        eventList.forEach((item) => {
            document.addEventListener(item, (e) => {
                callback && callback(e);
            }, true); // capture model
        });
    };

    captureUIAction(window.document);
};
