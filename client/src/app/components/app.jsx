import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {isAuthenticated} from "../store/auth/auth.actions";
import {CircularProgress} from "material-ui";
import {getSelfAction} from "../store/self/self.actions";
import AlertContainer from '../components/alert/alert.container';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        };
    }

    componentDidMount() {

        if (this.props.isAuthenticated()) {
            this.props.getSelfAction().then(() => {
                this.setState({
                    isLoading: false
                })
            });
        } else {
            this.setState({
                isLoading: false
            })
        }
    }

    //TODO add spinner or something...
    render() {
        if (this.state.isLoading) {
            return (
                <section>
                    <CircularProgress size={80} thickness={5}/>
                </section>
            )
        }
        return (
            <section className="app">
                {this.props.children}
                <AlertContainer />
            </section>
        );
    }
}

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({isAuthenticated}, dispatch)
    };
};

App = connect(mapStateToProps, {isAuthenticated, getSelfAction})(App);
export {
    App
}