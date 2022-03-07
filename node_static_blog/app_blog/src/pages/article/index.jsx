import React from 'react';
import { Outlet } from 'react-router-dom';

const Article = () => {
    return <div>
        <h1>博客</h1>
        {/* 渲染任何匹配的子级 */}
        <Outlet /> 
    </div>
}

export default Article;