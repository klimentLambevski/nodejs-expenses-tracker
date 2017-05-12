import LoginForm from './login.form';
import {withFormHandler} from '../../hocs/with-form-handler';
import {validateEmail, validateRequired} from "../../utils/validate";

const validate = values => {
    let errors = {};

    validateRequired(values, 'email', errors);
    validateEmail(values, 'email', errors);
    validateRequired(values, 'password', errors);
    validateRequired(values, 'captcha', errors);

    return errors;
};

const LoginFormRedux = withFormHandler(LoginForm, 'login', validate);

const LoginFormContainer = ({loginUser}) => (
    <LoginFormRedux
        saveItem={loginUser}
    />
);

export default LoginFormContainer;
