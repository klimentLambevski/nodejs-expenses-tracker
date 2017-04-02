import { Field } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import { renderTextField } from '../inputs/inputs';

const UserRegisterForm =({ handleSubmit, pristine, submitting, invalid, initialValues }) => (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <div>
            <Field
                component={renderTextField}
                type="text"
                name="name"
                label="Name"
            />
        </div>

        <div>
            <Field
                component={renderTextField}
                type="text"
                name="lastName"
                label="Last name"
            />
        </div>

        <div>
            <Field
                component={renderTextField}
                type="number"
                name="workingHoursFrom"
                label="Working hours from"
            />
        </div>

        <div>
            <Field
                component={renderTextField}
                type="number"
                name="workingHoursTo"
                label="Working hours to"
            />
        </div>

        <div>
            <Field
                component={renderTextField}
                type="text"
                name="email"
                label="Email"
            />
        </div>

        {
            !initialValues.id? (
            <div>
                <Field
                    component={renderTextField}
                    type="password"
                    name="password"
                    label="Password"
                />

                <Field
                    component={renderTextField}
                type="password"
                name="password_repeat"
                label="Repeat password"
                />
            </div>
            ): null
        }

        <div>
            <RaisedButton
                type="submit"
                label="Save"
                primary={true}
                disabled={pristine || submitting || invalid}
            />
        </div>
    </form>
);

export default UserRegisterForm
