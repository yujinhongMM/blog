
// import {schema} from "prosemirror-schema-basic"
import React, { useEffect } from "react";
// prosemirror-state 提供了一个描述编辑器完整状态的单一数据结构, 包括编辑器的选区操作, 和一个用来处理从当前 state 到下一个 state 的一个叫做 transaction 的系统
import { EditorState } from 'prosemirror-state';
// prosemirror-view 用来将给定的 state 展示成相对应的可编辑元素显示在编辑器中, 同时处理用户交互.
import { EditorView } from 'prosemirror-view';
const { schema, model } = require('./schema');


const getState = domString => {
    let domParser = new DOMParser();
    let dom = domParser.parseFromString(domString, 'text/html')
    console.log('%c [ dom ]-12', 'font-size:13px; background:pink; color:#bf2c9f;', dom)
    let state = EditorState.create({
        doc: model.DOMParser.fromSchema(schema).parse(dom)
    })
    
    let view = new EditorView(document.body, {state})
    
    const getData = {
        // html: domNode.innerHTML,
        html: view.dom.innerHTML.replace(/<p><\/p>/g, ''),
        json: view.state.toJSON(),
        // view,
    };
    
    console.log('%c [ getData ]-22', 'font-size:13px; background:pink; color:#bf2c9f;', getData)
}


getState('<h1>是一个超级h1</h1><h2>是一个超级h2</h2><h5>是一个超级h5</h5><h6>是一个超级h5</h6>')



function App() {
    useEffect(() => { }, [])
    return <div id="content">111</div>;
}

export default App;