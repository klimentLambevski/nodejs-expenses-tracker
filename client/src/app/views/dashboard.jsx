import {getSelfAction} from "../store/self/self.actions";
import {connect} from "react-redux";
import {UserTimeline} from "../components/user-timeline/user-timeline";
import {UsersManage} from "../components/users-manage/users-manage";
class DashboardView extends React.Component {
    constructor(props){
        super(props);
        this.props.dispatch(getSelfAction());
    }

    componentDidMount() {

    }

    render() {
        if(this.props.self.role === 'regular') {
            return (
                <UserTimeline/>
            )
        } else if(this.props.self.role === 'manager') {
            return (
                <UsersManage/>
            )
        } else {
            return (
                <div>Admin view</div>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    self: state.common.self
});

DashboardView = connect(mapStateToProps)(DashboardView);

export {
    DashboardView
}
