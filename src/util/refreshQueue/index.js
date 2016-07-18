'use strict';

// let pageBreakPoint = require('handlebreak');

/**
 * refresh queue
 *
 * refreshList [num]
 *
 * opts {
 *      start,
 *      end,
 *      indexKey
 * }
 *
 * refresh states is a queue by time.
 *
 * refresh 0 -> refresh 1 -> refresh 2 -> ...
 */

module.exports = (jobs = [], refreshList, opts = {}) => {
    let {
        memory, refreshIndexKey
    } = opts;

    //
    let getRefreshIndex = () => {
        return memory.get(refreshIndexKey).then(res => {
            if (!res) res = 0;
            return res;
        });
    };

    let setRefreshIndex = (index) => {
        return memory.set(refreshIndexKey, index);
    };

    // get current refresh index
    return getRefreshIndex().then(refreshIndex => {
        let nextRefreshIndex = refreshIndex + 1;
        // for next one
        setRefreshIndex(nextRefreshIndex);

        // get current refresh jobs
        let num = refreshList[refreshIndex];
    });
};
