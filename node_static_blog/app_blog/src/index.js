// import React from 'react';
// import ReactDOM from 'react-dom';
// import AppRouter from '@/routes/index';

// ReactDOM.render(<AppRouter />, document.getElementById('root'));


import { 
    scheduleCallback, // 调度回调，计划执行回调
    shouldYield, // 应该放弃执行权/中断
 } from './reactStudy/scheduler';
let result = 0;
let i = 0;
/**
 * 要想能过方便的让任务能过 暂停和恢复，需要数据结构支持
 * @returns 
 */
function calculate() {
    // shouldYield如果任务没有结束，并且浏览器分配的时间片(一般是4ms)已经到期了，就会放弃本任务的执行，
    // 把线程的资源交还给浏览器，让浏览器执行更高优先级的工作，比如页面绘制，响应用户输入
    for (; i < 1000000 && (!shouldYield()); i++) {
        result += 1;
    }
    // 当推出本任务的时候，如果任务没有完成，返回任务函数本身，如果任务完成了就返回null
    if (i < 1000000) {
        return calculate;
    } else {
        console.log(result);
        return null;
    }
}

scheduleCallback(calculate);