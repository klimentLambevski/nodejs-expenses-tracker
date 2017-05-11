import {Field} from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import {renderSelectField, renderTextField} from '../inputs/inputs';
import {MenuItem} from "material-ui";

const UserRegisterForm = ({handleSubmit, pristine, submitting, invalid, initialValues, role}) => {
    const roles = role !== 'admin' ? ['regular', 'manager'] : ['regular', 'manager', 'admin'];
    console.log(initialValues);
    return (
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
            {
                (role && role !== 'regular') && (
                    <div>
                        <Field
                            component={renderSelectField}
                            label="Role"
                            name="role"
                        >
                            {
                                roles.map(role =>
                                    <MenuItem
                                        key={role}
                                        value={role}
                                        primaryText={role}
                                    />
                                )
                            }
                        </Field>
                    </div>
                )
            }

            <div>
                <Field
                    component={renderTextField}
                    disabled={!!initialValues.id || !!initialValues.activationId}
                    type="text"
                    name="email"
                    label="Email"
                />
            </div>
            {
                !initialValues.id ? (
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
                ) : null
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
    )
};

export default UserRegisterForm
