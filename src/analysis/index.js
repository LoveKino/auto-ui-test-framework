'use strict';

/**
 * alalysis collected infos
 */

/**
 * request match logic
 *  1. match url
 *  2. check some header fields
 */
let checkRequest = (requestInfo, caseInfo) => {
    return true;
};

let checkFoxreport = (reportInfo, caseInfo) => {
    return true;
};

module.exports = (collectedInfos, caseInfo) => {
    for (let i = 0; i < collectedInfos.length; i++) {
        let item = collectedInfos[i];
        if (item.type === 'request') {
            if (!checkRequest(item, caseInfo)) {
                return false;
            }
        } else if (item.type === 'foxreport') {
            if (!checkFoxreport(item, caseInfo)) {
                return false;
            }
        }
    }
    return true;
};
