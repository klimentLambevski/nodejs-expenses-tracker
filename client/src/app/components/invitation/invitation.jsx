import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {renderTextField} from "../inputs/inputs";
import {RaisedButton} from "material-ui";
import {inviteMemberAction} from "../../store/users/users.actions";

let InvitationForm = ({handleSubmit, pristine, submitting, invalid}) => (
    <form onSubmit={handleSubmit} autoComplete="off">
        <Field component={renderTextField} type="email" name="email" label="Email" />
        <div style={{textAlign: 'center'}}>
            <RaisedButton
                type="submit"
                label="Invite"
                primary={true}
                disabled={pristine || submitting || invalid}
            />
        </div>
    </form>
);

InvitationForm = reduxForm({
    form: 'invitation',
    enableReinitialize: true
})(InvitationForm);

class InvitationView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {}
        }
    }

    sendInvitation = (data) => {
        this.props.inviteMemberAction(data.email).then(res => {
            this.setState({
                form: {}
            })
        })
    };

    render() {
        return (
            <div className="invitation">
                <div className="form-container">
                    <InvitationForm onSubmit={this.sendInvitation} initialValues={this.state.form}/>
                </div>
            </div>
        )
    }
}

InvitationView = connect(null, {
    inviteMemberAction
})(InvitationView);

export {
    InvitationView
}