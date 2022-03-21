import { 
    requestHostCallback,
    shouldYieldToHost as shouldYield,
    getCurrentTime
} from './SchedulerHostConfig';
import { push, pop, peek } from './SchedulerMinHeap';
import { ImmediatePriority, UserBlockingPriority, NormalPriority, LowPriority, IdlePriority } from './SchedulerPriorities';

// 每个优先级对应的任务对应一个过期时间
var maxSigned31BitInt = 1073741823;
var IMMEDIATE_PRIORITY_TIMEOUT = -1;
var USER_BLOCKING_TIMEOUT = 250;
var NORMAL_PRIORITY_TIMEOUT = 5000;
var LOW_PRIORITY_TIMEOUT = 10000;
var IDLE_PRIORITY_TIMEOUT = maxSigned31BitInt;
// 用于任务自增的id
let taskIdCounter = 0;

// 为了同时调度多个任务，而不会互相覆盖，需要搞一个任务队列
let taskQueue = [];
// 当前的任务
let currentTask;
/**
 * 调度一个回调任务
 * @param {*} callback 
 */
function scheduleCallback (priorityLevel, callback) {
    // 获取当前时间
    let currentTime = getCurrentTime();
    // 此任务的开始时间
    let startTime = currentTime;
    // 计算超时时间
    let timeout;
    switch (priorityLevel) {
        case ImmediatePriority: 
            timeout = IMMEDIATE_PRIORITY_TIMEOUT; 
            break;
        case UserBlockingPriority: 
            timeout = USER_BLOCKING_TIMEOUT; 
            break;
        case NormalPriority: 
            timeout = NORMAL_PRIORITY_TIMEOUT; 
            break;
        case LowPriority: 
            timeout = LOW_PRIORITY_TIMEOUT; 
            break;
        case IdlePriority: 
            timeout = IDLE_PRIORITY_TIMEOUT; 
            break;
    }
    // 计算一个过期时间 = 当前时间 + 超时时间
    let expirationTime = startTime + timeout;
    let newTask = {
        id: taskIdCounter++, // 每一个任务都有一个自增的id
        callback, // 真正要执行的函数
        priorityLevel, // 优先级保存下来
        expirationTime, // 过期时间
        startTime, // 任务开始的时间
        sortIndex: -1 // 排序值
    }
    newTask.sortIndex = expirationTime;
    // 向最小堆里添加一个新的任务，先比较优先级（索引）再比id
    push(taskQueue, newTask);
    // taskQueue.push(callback);
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