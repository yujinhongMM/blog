import { 
    requestHostCallback,
    shouldYieldToHost as shouldYield
} from './SchedulerHostConfig';
// 为了同时调度多个任务，而不会互相覆盖，需要搞一个任务队列
let taskQueue = [];
// 当前的任务
let currentTask;
/**
 * 调度一个回调任务
 * @param {*} callback 
 */
function scheduleCallback (callback) {
    taskQueue.push(callback);
    requestHostCallback(flushWork);
}
/**
 * 依次执行任务队列中的任务
 */
function flushWork() {
    return workLoop();
}
/**
 * 在这里有两个打断或者停止执行
 * 在执行每一个任务的时候，如果时间片到期了会退出workLoop
 * 另一个是在执行currentTask的时候，如果时间片到期了，也会退出执行
 * @returns 
 */
function workLoop() {
    // 取出任务队列中的第一个任务
    currentTask = taskQueue[0];
    while(currentTask) {
        // 如果说时间片到期了，就退出循环
        if (shouldYield()) {
            break;
        }
        // 继续执行回调
        const continuationCallback = currentTask();
        // 如果为function说明任务没结束，当前任务还为之前的。
        if (typeof continuationCallback === 'function') {
            currentTask = continuationCallback;
        } else {
            // 移除最先进队的回调函数
            taskQueue.shift();
        }
        currentTask = taskQueue[0];
    }
    return currentTask;
}

export {
    scheduleCallback,
    shouldYield
}