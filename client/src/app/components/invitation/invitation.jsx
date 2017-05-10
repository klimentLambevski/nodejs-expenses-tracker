import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {renderTextField} from "../inputs/inputs";
import {RaisedButton} from "material-ui";

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
    form: 'invitation'
})(InvitationForm);

class InvitationView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    sendInvitation = (data) => {
        console.log(data);
    };

    render() {
        return (
            <div className="invitation">
                <div className="form-container">
                    <InvitationForm onSubmit={this.sendInvitation}/>
                </div>
            </div>
        )
    }
}

InvitationView = connect()(InvitationView);

export {
    InvitationView
}