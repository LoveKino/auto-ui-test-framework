'use strict';

/**
 *
 * truth:
 * 1. if e.preventDefault() was called before event finished, no new window will open
 *
 * 2. only when a tag's taget = _blank
 *
 * function
 *
 * 1. capture the moment that open a new window
 *
 * 2. proxy this moment, stop open a new window
 */
module.exports = () => {
    document.addEventListener('click', (e) => {
        let target = e.target;
        if(isATag(target)) {
        }
    });
};

let isATag = (target) => {
    return target.nodeType === 1 && (target.tagName === 'A' || target.nodeName === 'A');
};
