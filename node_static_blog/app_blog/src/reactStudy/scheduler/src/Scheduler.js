import { 
    requestHostCallback,
    shouldYieldToHost as shouldYield
} from './SchedulerHostConfig';
/**
 * 调度一个回调任务
 * @param {*} callback 
 */
function scheduleCallback (callback) {
    requestHostCallback(callback);
}

export {
    scheduleCallback,
    shouldYield
}