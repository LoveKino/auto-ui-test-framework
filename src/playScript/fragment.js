'use strict';

/**
 * use a simple algo right now
 *
 * 1. get all fragments
 *
 * 2. find current action index
 *
 * 3. current fragment
 *
 * 4. window index
 *
 * TODO unit tests
 */

let getActionFragment = (actions, index) => {
    let fragments = getAllFragments(actions);

    let fragInfo = whichFragment(index, fragments);

    if (fragInfo) {
        fragInfo.actions = actions;
        // chose window
        let winIndex = getDistinctWinIndex(getWinIds(fragments), fragInfo.index);
        return {
            winIndex,
            fragInfo
        };
    }
    return {
        fragInfo,
        winIndex: -1
    };
};

/**
 * exclude root window
 *
 * analysis fragments to know the window switch information
 */

let getDistinctWinIndex = (winIds, index) => {
    let collects = [];
    for (let i = 0; i <= index; i++) {
        let winId = winIds[i];
        if (!contain(collects, winId)) {
            collects.push(winId);
        }
    }

    return findIndex(collects, winIds[index]);
};

let getWinIds = (fragments) => {
    let winIds = [];
    for (let i = 0; i < fragments.length; i++) {
        let fragment = fragments[i];
        if (fragment.length) {
            let winId = fragment[0].winId;
            winIds.push(winId);
        }
    }
    return winIds;
};

let getAllFragments = (actions) => {
    let fragments = [];
    let curWinId = null;
    let fragment = null;
    for (let i = 0; i < actions.length; i++) {
        if (!curWinId) {
            curWinId = actions[i].winId;
            fragment = [actions[i]];
            fragments.push(fragment);
        } else {
            if (actions[i].winId === curWinId) {
                fragment.push(actions[i]);
            } else {
                //
                curWinId = actions[i].winId;
                fragment = [actions[i]];
                fragments.push(fragment);
            }
        }
    }
    return fragments;
};

let whichFragment = (actionIndex, fragments) => {
    let pass = 0;
    for (let i = 0; i < fragments.length; i++) {
        let fragment = fragments[i];
        if (fragment.length) {
            let limit = pass + fragment.length - 1;
            if (actionIndex >= pass && actionIndex <= limit) {
                return {
                    index: i,
                    start: pass,
                    end: limit,
                    fragment
                };
            }
            pass = limit + 1;
        }
    }
};

let contain = (list, item) => findIndex(list, item) !== -1;

let findIndex = (list, item) => {
    for (let i = 0; i < list.length; i++) {
        if (item === list[i]) {
            return i;
        }
    }
    return -1;
};

module.exports = {
    getActionFragment
};
