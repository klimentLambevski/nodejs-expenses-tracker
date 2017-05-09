import {IndexRedirect, Route} from "react-router";
import {App} from "./components/app";
import {Login} from "./views/login";
import {DashboardView} from "./views/dashboard";
import {UsersManage} from "./components/users-manage/users-manage";
import {TimelineReport} from "./components/timeline-report/timeline-report";
import {RegisterView} from "./views/register";
import {RecordsManage} from "./components/records-manage/records-manage";
import {AdminView} from "./views/admin";
import {SelfView} from "./views/self";
import {ExpensesReport} from "./components/expenses-report/expenses-report";


export default (
    <Route path="/" component={App}>
        <IndexRedirect to="/login"/>
        <Route path="login" component={Login}/>
        <Route path="register" component={RegisterView}/>
        <Route path="dashboard" component={DashboardView}>
            <Route path="admin" component={AdminView}>
                <IndexRedirect to="/dashboard/admin/users"/>
                <Route path="users" component={UsersManage}/>
                <Route path="expenses" component={RecordsManage}/>
                <Route path="timeline-report" component={TimelineReport}/>
            </Route>
            <Route path="self" component={SelfView}>
                <IndexRedirect to="/dashboard/self/expenses "/>
                <Route path="expenses" component={RecordsManage}/>
                <Route path="reports" component={ExpensesReport}/>
            </Route>
        </Route>
    </Route>
);
