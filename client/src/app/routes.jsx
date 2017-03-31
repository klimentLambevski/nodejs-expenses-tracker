import {IndexRoute, IndexRedirect, Route} from "react-router";
import {App} from "./components/app";
import {Login} from "./views/login";
import {Timeline} from "./components/timeline/timeline";
import {DashboardView} from "./views/dashboard";


export default (
    <Route path="/" component={App}>
        <IndexRedirect to="/login"/>
        {/*<Route path="login" component={LoginPage}/>*/}
        <Route path="login" component={Login}/>
        <Route path="timeline" component={Timeline}/>
        <Route path="dashboard" component={DashboardView}>

        </Route>
    </Route>
);
