/**
 * 这个文件是用来创建reducer函数的，专门用来处理发送过来的action
 */
const initState = {
    value: '默认值',
    count: 0,
}

const reducer = (state = initState, action) => {
console.log("🚀 ~ file: index.js ~ line 9 ~ reducer ~ state", state, action)
    switch(action.type) {
        case 'send_type':
            return Object.assign({}, state, action);
        case 'add_action':
            return { ...state, count: state.count + 1 };
        default:
            return state;
    }
}

module.exports = {
    reducer
}