'use strict';

let {
    isAtom,
    getClassName
} = require('../index');

let serializeEvent = (e) => {
    let json = {
        __proto__source: getClassName(e)
    };
    for (let name in e) {
        let value = e[name];
        if (isAtom(value)) {
            json[name] = value;
        }
    }
    return json;
};

module.exports = serializeEvent;
