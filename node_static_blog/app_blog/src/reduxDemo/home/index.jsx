import React from 'react';
// 导入store
import store from '../../store';
// 导入action构建函数
import { sendAction } from '../../action';

export default class Home extends React.Component {
    // 当组件一加载完毕的时候来监听
    componentDidMount () {
        store.subscribe(() => {
          console.log('subscribe', store.getState());
          this.setState(store.getState());
        })
    }
    handleClick = () => {
        // 拿到action对象
        const action = sendAction();
        // 发送一个action，利用store
        store.dispatch(action);
    }

    render() {
        return (
           <>
                <button onClick={this.handleClick}>点我点我，发送一个action</button>
                <div>
                    {store.getState().value}
                </div>
           </>
        )
    }
}