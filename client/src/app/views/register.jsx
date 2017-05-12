import {connect} from "react-redux";
import {withFormHandler} from "../hocs/with-form-handler";
import UserRegisterForm from '../components/user/user.register.form';
import {Link} from "react-router";
import {FlatButton} from "material-ui";
import {registerUserAction} from "../store/auth/auth.actions";
import {showAlert} from "../store/alert/alert.actions";
import {push} from 'react-router-redux';
import {validateEmail, validateRequired} from "../utils/validate";

const validate = values => {
    let errors = {};

    validateRequired(values, 'email', errors);
    validateEmail(values, 'email', errors);
    validateRequired(values, 'name', errors);
    validateRequired(values, 'lastName', errors);
    validateRequired(values, 'password', errors);
    validateRequired(values, 'password_repeat', errors);

    if(values.password !== values.password_repeat) {
        errors.password_repeat = 'Password and repeat password should be same'
    }

    return errors;
};

const UserRegisterFormRedux = withFormHandler(UserRegisterForm, 'register', validate);
class RegisterView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            success: false
        }
    }

    registerUser = (data) => {
        return this.props.registerUserAction(data).then(res => {
            this.setState({
                success: true
            });

            setTimeout(() => {
                this.props.push('/login');
            }, 4000);
        })
    };

    render() {

        return (
            <div className="login">
                {
                    this.state.success? (
                        <div className="form-container">
                            <h4>You are successfully registered. Please check your email and activate your account. Redirecting ...</h4>
                        </div>
                    ): (
                        <div>
                            <UserRegisterFormRedux
                                key="user-register"
                                formItem={{}}
                                saveItem={this.registerUser}
                                role={'regular'}
                            />
                            <div style={{textAlign: 'center'}}>Or <Link to={'/login'}><FlatButton label={'Login'} primary={true}/></Link></div>
                        </div>
                    )
                }
            </div>
        )
    }
}

let mapStateToProps = (state) => ({

});

RegisterView = connect(mapStateToProps, {
    registerUserAction,
    showAlert,
    push
})(RegisterView);

export {
    RegisterView
}