import {getSelfAction} from "../store/self/self.actions";
import {connect} from "react-redux";
import {UserTimeline} from "../components/user-timeline/user-timeline";
import {UsersManage} from "../components/users-manage/users-manage";
import {AdminView} from "./admin";
import {Header} from "../components/header/header";
import {push} from 'react-router-redux';
import {RecordsManage} from "../components/records-manage/records-manage";

class DashboardView extends React.Component {
    constructor(props){
        super(props);
        this.props.getSelfAction();
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.self && nextProps.self.role === 'admin') {
            if(nextProps.location.pathname === '/dashboard') {
                this.props.push('/dashboard/users');
            }

        }
    }

    render() {
        if(this.props.self.role === 'regular') {
            return (
                <section>
                    <Header />
                    <RecordsManage/>
                </section>
            )
        } else if(this.props.self.role === 'manager') {
            return (
                <section>
                    <Header />
                    <UsersManage/>
                </section>
            )
        } else {
            return (
                <AdminView>
                    {this.props.children}
                </AdminView>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    self: state.common.self
});

DashboardView = connect(mapStateToProps, {
    push,
    getSelfAction
})(DashboardView);

export {
    DashboardView
}
