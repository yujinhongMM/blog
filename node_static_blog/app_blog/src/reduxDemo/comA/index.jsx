import React from 'react';
// 导入connect
import { connect } from 'react-redux';

class ComA extends React.Component {
    handleClick = () => {
        console.log("comA", this.props)
        // 发送action
        this.props.sendAction();
    }
    render() {
        return (
            <button onClick={this.handleClick}>+</button>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendAction: () => {
            // 利用dispatch发送一个action
            // 传递action对象 我们要定义一个type属性
            dispatch({
                type: 'add_action'
            })
        }
    }
}

// A是发送方，所以要实现connect的第二个参数
export default connect(null, mapDispatchToProps)(ComA)