'use strict';

let distance = require('../util/distance');

module.exports = (nodeInfo, source, runRule) => {
    let nPath = nodeInfo.path || [];
    let sPath = source.path || [];
    nPath = nPath.slice(0);
    sPath = sPath.slice(0);

    //console.log(nodeInfo.path.length, sPath);
    if (!nPath.length && !sPath.length) {
        return [0, 0, 'path'];
    }

    let dis = distance(nPath, sPath, (item1, item2) => {
        return runRule({
            node: item1
        }, {
            node: item2
        });
    });
    let sum = Math.max(nPath.length, sPath.length);
    let sim = sum - dis;

    return [10, sim / sum, 'path'];
};
