
import Home from './pages/Home';
import About from './pages/About';

const routes = [
    {
        path: "/",
        exact: true,
        component: Home,
        statePath: "pageState.home",
        loadData: Home.loadData,
    },
    {
        path: "/about",
        exact: true,
        component: About,
        statePath: "pageState.about"
    },
];

export default routes;