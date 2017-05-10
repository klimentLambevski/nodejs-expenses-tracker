import {connect} from "react-redux";
import {Tab, Tabs} from "material-ui";
import {Header} from "../components/header/header";
import {push} from 'react-router-redux';


class SelfView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            route: '/dashboard/self/expenses'
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
            <div className="self-view">
                <Header />
                <Tabs
                    className={'navigation'}
                    value={this.state.route}
                    onChange={this.updateRoute.bind(this)}
                >
                    <Tab label="Manage expenses" value="/dashboard/self/expenses">
                    </Tab>
                    <Tab label="Expenses report" value="/dashboard/self/reports">
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

SelfView = connect(mapStateToProps, {
    push
})(SelfView);

export {
    SelfView
}
