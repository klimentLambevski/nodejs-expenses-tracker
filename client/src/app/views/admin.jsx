import {getSelfAction} from "../store/self/self.actions";
import {connect} from "react-redux";
import {Tab, Tabs} from "material-ui";
import {Header} from "../components/header/header";
import {push} from 'react-router-redux';


class AdminView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            route: '/dashboard/users'
        }
    }

    componentDidMount() {

    }

    updateRoute(route) {
        this.props.push(route);
        this.setState({
            route
        })
    }

    render() {
        return (
            <div>
                <Header />
                <Tabs
                    value={this.state.route}
                    onChange={this.updateRoute.bind(this)}
                >
                    <Tab label="Manage users" value="/dashboard/users">
                    </Tab>
                    <Tab label="Browse user expenses" value="/dashboard/expenses">
                    </Tab>
                    <Tab label="Browse user timeline-report" value="/dashboard/timeline-report">
                    </Tab>
                </Tabs>
                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    self: state.common.self
});

AdminView = connect(mapStateToProps, {
    push
})(AdminView);

export {
    AdminView
}
