import {connect} from "react-redux";
import LoginFormContainer from '../components/login/login-form.container';
import {authenticateUser} from "../store/auth/auth.actions";
import {FlatButton} from "material-ui";
import {Link} from "react-router";

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
                <div>Or <Link to={'/register'}><FlatButton label={'Register'} primary={true}/></Link></div>
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