'use strict';

let {
    front
} = require('web-container-env/src/bridge');

let Memory = require('../memory');

/**
 * use root window as the center point
 */

module.exports = ({
    winId, rootId, storeKey,
    doJob
}) => {
    let sandbox = {};
    let {
        call, detect
    } = front(winId, sandbox);

    let memory = Memory(call);

    storeKey = storeKey || `${rootId}-node-model-info`;

    return detect().then(() => {
        if (winId === rootId) {
            // current window is center point
            return centerMove(call, memory, storeKey, sandbox, doJob);
        } else {
            // current window is a none-center point
            // send window info to center
            call('callOtherWindow', [rootId, 'connect', [winId]]);

            sandbox.doJob = doJob;

            return {
                sandbox,
                call,
                memory,
                type: 'edge'
            };
        }
    });
};

let centerMove = (call, memory, storeKey, sandbox, doJob) => {
    return memory.get(storeKey).then((data) => {
        data = data || {
            windows: []
        };

        sandbox.connect = (winId) => {
            if (!contain(data.windows, winId)) {
                data.windows.push(winId);
                // save result
                return memory.set(storeKey, data);
            }
        };

        let sendJob = (...args) => {
            if (args.length <= 1) {
                // call center to do a job
                return Promise.resolve(doJob(args[0]));
            } else {
                if (!contain(data.windows, args[0])) {
                    throw new Error('missing window');
                }
                return call('callOtherWindow', [args[0],
                    'doJob', [args[1]]
                ]);
            }
        };

        return {
            windows: data.windows,
            type: 'center',
            // add this sandbox to your call sandbox
            sendJob,
            sandbox,
            memory,
            call
        };
    });
};

let contain = (list, item) => {
    for (let i = 0; i < list.length; i++) {
        if (item === list[i]) {
            return true;
        }
    }
    return false;
};
