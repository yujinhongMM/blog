// import React from 'react';
// import ReactDOM from 'react-dom';
// import AppRouter from '@/routes/index';

// ReactDOM.render(<AppRouter />, document.getElementById('root'));

// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './ProseMirror';
// ReactDOM.render(<App />, document.getElementById('root'));

// import React from 'react';
// import ReactDOM from 'react-dom';
// import Home from './reduxDemo/home';

// function App() {
//     return (
//         <Home />
//     )
// }

// ReactDOM.render(<App />, document.getElementById('root'));


import React from 'react';
import ReactDOM from 'react-dom';
// 导入我们的store
import store from "./store";
// 导入Provider组件，利用这个组件包裹我们的结构，从而能够达到统一维护stroe的效果
import { Provider } from 'react-redux';

import ComA from './reduxDemo/comA';
import ComB from './reduxDemo/comB';
function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <ComA />
                <ComB />
            </div>
        </Provider>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));