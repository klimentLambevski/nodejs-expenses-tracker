import {IndexRoute, IndexRedirect, Route} from "react-router";
import App from "./components/app";
import {Login} from "./views/login";
import {Timeline} from "./components/timeline/timeline";


export default (
  <Route path="/" component={App}>
    <IndexRedirect to="/login"/>
    {/*<Route path="login" component={LoginPage}/>*/}
    <Route path="login" component={Login}/>
    <Route path="timeline" component={Timeline}/>
  </Route>
);
