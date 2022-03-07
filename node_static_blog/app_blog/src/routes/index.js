import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import routes from "./routes";
import Home from '../pages/home';
import About from '../pages/about';
import Article from '../pages/article';
import ErrorPage from '../pages/error';
import Nav from '../components/nav';
import ArticleList from '../pages/article/components/articleList';
import ArticleInfo from "../pages/article/components/articleInfo";

const ROUTE_PREFIX = '/yujinhong';
// In react-router-dom v6, "Switch" is replaced by routes "Routes". 
// Navigate等价于以前版本中的Redirect组件
function AppRouter () {
    return <Router basename={`${ROUTE_PREFIX}`}>
        <Nav />
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/article" element={<Article />}>
                <Route path="/article" element={<ArticleList />} />
                <Route path="/article/:slug" element={<ArticleInfo />} />
            </Route>
            <Route path="/error" element={<ErrorPage />}></Route>
            <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
    </Router>
}

export default AppRouter;