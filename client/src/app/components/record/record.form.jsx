import {Field} from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import {renderDatePicker, renderTextField, renderTimePicker} from '../inputs/inputs';

const RecordForm = ({handleSubmit, pristine, submitting, invalid, initialValues, role}) => {
    return (
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <div>
                <Field
                    component={renderTextField}
                    type="text"
                    name="name"
                    label="Name *"
                />
            </div>
            <div>
                <Field
                    component={renderDatePicker}
                    name="date"
                    label="Date *"
                />
            </div>

            <div>
                <Field
                    component={renderTimePicker}
                    name="time"
                    label="Time *"
                />
            </div>
            <div>
                <Field
                    component={renderTextField}
                    type="text"
                    name="description"
                    label="Description *"
                />
            </div>
            <div>
                <Field
                    component={renderTextField}
                    type="number"
                    name="amount"
                    label="Amount *"
                />
            </div>
            <div>
                <Field
                    component={renderTextField}
                    type="text"
                    name="comment"
                    label="Comment"
                />
            </div>
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

export  {
    RecordForm
}
