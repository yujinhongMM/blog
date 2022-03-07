import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Nav from '../components/nav';
import Loading from "../components/loading";

// 懒加载
const lazyLoad = (path) => {
    // 这个方法需要注意的一点，这个 path 不能直接传`相对路径`类似 `../pages/App`, 会找不到组件，所以最好只传过来一个组件名字，然后内部拼接相对路径
    const Comp = React.lazy(() => import(`../pages/${path}`))
    return (
        <React.Suspense fallback={<Loading />}>
            <Comp />
        </React.Suspense>
    )
}


const ROUTE_PREFIX = '/yujinhong';
// In react-router-dom v6, "Switch" is replaced by routes "Routes". 
// Navigate等价于以前版本中的Redirect组件
function AppRouter () {
    return <Router basename={`${ROUTE_PREFIX}`}>
        <Nav />
        <Routes>
            <Route path="/" element={lazyLoad('home')}></Route>
            <Route path="/about" element={lazyLoad('about')}></Route>
            <Route path="/article" element={lazyLoad('article')}>
                <Route path="/article" element={lazyLoad('article/components/articleList')} />
                <Route path="/article/:slug" element={lazyLoad('article/components/articleInfo')} />
            </Route>
            <Route path="/error" element={lazyLoad('error')}></Route>
            <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
    </Router>
}


export default AppRouter;