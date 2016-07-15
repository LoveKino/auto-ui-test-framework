'use strict';

/**
 *
 * information
 *
 *      user action
 *
 *      system response
 */

let ActionCapturer = require('./actionCapturer');

let processor = require('./processor');

let {
    genId
} = require('../util');

module.exports = ({
    winId,
    rootId,
    passData,
    memory,
    refreshId,
    playedTime,
    actionOpts = {}
}) => {
    const pageInfoKey = `${rootId}-pageInfo`;

    let {
        config
    } = passData;

    refreshId = refreshId || genId();

    let record = (historyInfo, opts) => {
        let {
            capture
        } = ActionCapturer(opts);

        let accept = (action) => {
            // tag refreshId
            action.refreshId = refreshId;

            // tag winId
            action.winId = winId;

            // tag gap time
            let prev = historyInfo.actions[historyInfo.actions.length - 1];
            setGapTime(prev, action, playedTime);

            // process
            processor(action, historyInfo.actions);

            // add
            historyInfo.actions.push(action);
            // sync
            memory.set(pageInfoKey, historyInfo);

            //
            actionOpts.accept && actionOpts.accept(action);
        };

        capture(accept);
    };

    // get history
    memory.get(pageInfoKey).then((historyInfo) => {
        historyInfo = historyInfo || {
            actions: []
        };
        record(historyInfo, config.action);
    });
};

let setGapTime = (prev, cur, playedTime) => {
    if (!prev) {
        if (playedTime) {
            cur.gapTimeToPrev = cur.time - playedTime;
        }
    } else {
        let gap = cur.time - prev.time;
        cur.gapTimeToPrev = gap;
    }
};
