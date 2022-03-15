// 调度回调，计划执行回调
import { scheduleCallback } from './scheduler';
let result = 0;
let i = 0;
function calculate() {
    for (; i < 100000000; i++) {
        result += 1;
    }
    console.log(result);
}

scheduleCallback(calculate);