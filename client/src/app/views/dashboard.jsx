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
                this.props.push('/dashboard/admin');
            }

        } else if(nextProps.self && nextProps.self.role === 'regular') {
            if(nextProps.location.pathname === '/dashboard') {
                this.props.push('/dashboard/self');
            }
        }
    }

    render() {
        if(this.props.self.role === 'regular') {
            return (
                <section>
                    {this.props.children}
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
                <section>
                    {this.props.children}
                </section>
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
