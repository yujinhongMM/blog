import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';

class App extends React.Component {
    componentDidMount() {
        console.log("sssssss")
    }
    render() {
        return (
            <div className="shopping-list">
                <h1>博客</h1>
                <ul>
                    <li>首页</li>
                    <li>标签</li>
                    <li>分类</li>
                    <li>归档</li>
                    <li>关于</li>
                    <li>留言板</li>
                </ul>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));