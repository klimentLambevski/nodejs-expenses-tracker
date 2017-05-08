import {IndexRoute, IndexRedirect, Route} from "react-router";
import {App} from "./components/app";
import {Login} from "./views/login";
import {Timeline} from "./components/timeline/timeline";
import {DashboardView} from "./views/dashboard";
import {UsersManage} from "./components/users-manage/users-manage";
import {UserSpecificTimeline} from "./components/user-specific-timeline/user-specific-timeline";
import {TimelineReport} from "./components/timeline-report/timeline-report";
import {RegisterView} from "./views/register";
import {RecordsManage} from "./components/records-manage/records-manage";


export default (
    <Route path="/" component={App}>
        <IndexRedirect to="/login"/>
        <Route path="login" component={Login}/>
        <Route path="register" component={RegisterView}/>
        <Route path="dashboard" component={DashboardView}>
                <Route path="users" component={UsersManage}/>
                <Route path="expenses" component={RecordsManage}/>
                <Route path="timeline-report" component={TimelineReport}/>
        </Route>
    </Route>
);
