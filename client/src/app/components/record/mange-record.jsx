import {Dialog, FlatButton, RaisedButton} from "material-ui";
import {withFormHandler} from "../../hocs/with-form-handler";
import {RecordForm} from "./record.form";
import {
    addSelfRecordAction, addUserRecordAction, getSelfRecordsAction,
    updateSelfRecordAction
} from "../../store/record/record.actions";
import {connect} from "react-redux";
import {validateFloat, validateRequired} from "../../utils/validate";

const validate = values => {
    let errors = {};

    validateRequired(values, 'date', errors);
    validateRequired(values, 'time', errors);
    validateRequired(values, 'description', errors);
    validateRequired(values, 'amount', errors);
    validateFloat(values, 'amount', errors);

    return errors;
};


const RecordFormRedux = withFormHandler(RecordForm, 'create', validate);

class ManageRecord extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false
        };

    }

    handleClose = () => {
        this.setState({modalOpen: false});
    };

    saveRecord = (record) => {
        if(!record.id) {
            if(this.props.user) {
                return this.props.addUserRecordAction(this.props.user, record).then(res => {
                    this.setState({modalOpen: false});
                    this.props.onChange && this.props.onChange(record);
                    return res;
                });
            }
            return this.props.addSelfRecordAction(record).then(res => {
                this.setState({modalOpen: false});
                this.props.onChange && this.props.onChange(record);
                return res;
            });
        } else {
            return this.props.updateSelfRecordAction(record).then(res => {
                this.setState({modalOpen: false});
                return res;
            });
        }
    };

    openModal = () => {
        this.setState({
            modalOpen: true
        })
    };

    render() {

        const actions = [
            <FlatButton
                label="Done"
                primary={true}
                keyboardFocused={false}
                onTouchTap={this.handleClose}
            />,
        ];


        return (
            <div>
                <RaisedButton label={this.props.record ? 'Edit' : 'Create expense record'} primary={true}
                              onClick={this.openModal}/>
                <Dialog
                    title={this.props.record ? 'Update expense record' : 'Create expense record'}
                    actions={actions}
                    modal={false}
                    open={this.state.modalOpen}
                    onRequestClose={this.handleClose}>
                    <RecordFormRedux
                        key="record"
                        removeContainer={true}
                        formItem={this.props.record}
                        saveItem={this.saveRecord}
                    />
                </Dialog>
            </div>
        )
    }
}

ManageRecord = connect(null, {
    addSelfRecordAction,
    updateSelfRecordAction,
    addUserRecordAction
})(ManageRecord);

export {
    ManageRecord
}