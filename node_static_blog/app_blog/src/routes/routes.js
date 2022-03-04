import Loadable from 'react-loadable';
import Loading from '../component/loading';

const loadableFun = (url) => {
    return Loadable({
        loader: import(url),
        loading: Loading
    })
}

const Home = loadableFun('../pages/home');
const About = loadableFun('../pages/about');


const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/about',
        component: About
    }
]

export default routes;