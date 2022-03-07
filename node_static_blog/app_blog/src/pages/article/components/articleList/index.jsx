import React from 'react';
import { Link } from 'react-router-dom';

const BlogPosts = {
    "1": {
      title: "第一篇博客文章",
      description: "第一篇博客文章，是关于Vue3.0的"
    },
    "2": {
      title: "第二篇博客文章",
      description: "Hello React Router v6"
    }
};

const ArticleList = () => {
    return <ul>
        {Object.entries(BlogPosts).map(([slug, { title }]) => (
            <li key={slug}>
            <Link to={`/article/${slug}`}>
                <h3>{title}</h3>
            </Link>
            </li>
        ))}
    </ul>
}

export default ArticleList;