import LoginForm from './login.form';
import {withFormHandler} from '../../hocs/with-form-handler';

const LoginFormRedux = withFormHandler(LoginForm, 'login');

const LoginFormContainer = ({loginUser}) => (
    <LoginFormRedux
        saveItem={loginUser}
    />
);

export default LoginFormContainer;
