import {connect} from "react-redux";
import {CircularProgress} from "material-ui";
import {activate} from '../services/api/auth';
import {push} from 'react-router-redux';
import {getSelfAction} from "../store/self/self.actions";
import LocalStorageService from "../services/storage/local.storage.service";
import * as axios from "axios";

class ActivationView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activating: true,
            err: null
        };

    }

    componentDidMount() {
        activate(this.props.routeParams.id)
            .then(res => {
                this.setState({
                    message: 'Account successfully activated',
                    activating: false
                });

                LocalStorageService.setItem('AUTH_TOKEN', res.token);
                axios.defaults.headers.common['Authorization'] = `JWT ${res.token}`;

                this.props.getSelfAction().then(() => {
                    setTimeout(() => {
                        this.props.push('/dashboard')
                    }, 4000)
                });
            })
            .catch(err => {
                this.setState({
                    message: err.data[0].message,
                    activating: false
                });

                setTimeout(() => {
                    this.props.push('/login')
                }, 4000)
            })
    }

    render() {
        return (
            <div className="activation">
                <div className="form-container">
                    {
                        this.state.activating ? (
                            <CircularProgress size={80} thickness={5} />
                        ) : (
                            <h4>{this.state.message}. Redirecting...</h4>
                        )
                    }
                </div>
            </div>
        )
    }
}

ActivationView = connect(null, {
    push,
    getSelfAction
})(ActivationView);

export {
    ActivationView
}