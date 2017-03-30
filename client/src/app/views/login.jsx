import {connect} from "react-redux";
import LoginFormContainer from '../components/login/login-form.container';
import {authenticateUser} from "../store/auth/auth.actions";

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        let {authenticateUser} = this.props;
        return (
            <div className="login">
                <LoginFormContainer loginUser={authenticateUser} />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    authenticateUser: state.authenticateUser
});

Login = connect(mapStateToProps, {
    authenticateUser
})(Login);

export {
    Login
};