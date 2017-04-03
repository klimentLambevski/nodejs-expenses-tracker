import {connect} from "react-redux";
import {withFormHandler} from "../hocs/with-form-handler";
import UserRegisterForm from '../components/user/user.register.form';
import {Link} from "react-router";
import {FlatButton} from "material-ui";
import {registerUserAction} from "../store/auth/auth.actions";

class RegisterView extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const UserRegisterFormRedux = withFormHandler(UserRegisterForm, 'register');

        return (
            <div className="login">
                <UserRegisterFormRedux
                    key="user-register"
                    formItem={{}}
                    saveItem={this.props.registerUserAction}
                    role={'regular'}
                />
                <div>Or <Link to={'/login'}><FlatButton label={'Login'} primary={true}/></Link></div>
            </div>
        )
    }
}

let mapStateToProps = (state) => ({

});

RegisterView = connect(mapStateToProps, {
    registerUserAction
})(RegisterView);

export {
    RegisterView
}