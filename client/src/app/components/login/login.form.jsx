import { Field } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import { renderTextField } from '../inputs/inputs';
import {Captcha} from "../recaptcha";

const LoginForm =({ handleSubmit, pristine, submitting, invalid }) => (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <div>
            <Field
                component={renderTextField}
                type="text"
                name="email"
                label="Email *"
            />
        </div>

        <div>
            <Field
                component={renderTextField}
                type="password"
                name="password"
                label="Password *"
            />
        </div>
        <div>
            <Field component={Captcha} name="captcha"/>
        </div>
        <div style={{textAlign: 'center'}}>
            <RaisedButton
                type="submit"
                label="Sign In"
                primary={true}
                disabled={pristine || submitting || invalid}
            />
        </div>

    </form>
);

export default LoginForm
