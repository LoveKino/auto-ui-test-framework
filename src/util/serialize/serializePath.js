'use strict';

let serializeNode = require('./serializeNode');

let serializePath = (target) => {
    let json = [];
    let index = 0;

    target = target && target.parentNode;
    while (target) {

        if (index < 2) {
            json.push(serializeNode(target, {
                textContent: true
            }));
        } else {
            json.push(serializeNode(target));
        }

        target = target.parentNode;

        index++;
    }
    return json;
};

module.exports = serializePath;
