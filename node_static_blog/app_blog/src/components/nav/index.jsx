import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return  <nav style={{ margin: 10 }}>
        <Link to="/" style={{ padding: 5 }}>
            首页
        </Link>
        <Link to="/about" style={{ padding: 5 }}>
            关于
        </Link>
        <Link to="/article" style={{ padding: 5 }}>
            文章
        </Link>
    </nav>
}

export default Nav;