import {Header} from "../components/header/header";
import {getSelfAction} from "../store/self/self.actions";
import {connect} from "react-redux";
class DashboardView extends React.Component {
    constructor(props){
        super(props);
        this.props.dispatch(getSelfAction());
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <Header />
            </div>
        )
    }
}

DashboardView = connect()(DashboardView);

export {
    DashboardView
}
