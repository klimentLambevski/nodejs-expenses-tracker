import {Dialog, FlatButton, RaisedButton} from "material-ui";
import {withFormHandler} from "../../hocs/with-form-handler";
import {RecordForm} from "./record.form";
import {addSelfRecordAction, getSelfRecordsAction, updateSelfRecordAction} from "../../store/record/record.actions";
import {connect} from "react-redux";

const RecordFormRedux = withFormHandler(RecordForm, 'create');

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
            return this.props.addSelfRecordAction(record).then(res => {
                this.setState({modalOpen: false});
                return res;
            });
        } else {
            return this.props.updateSelfRecordAction(record).then(res => {
                console.log(res, 'update');
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
                <RaisedButton label={this.props.record ? 'Edit record' : 'Create record'} primary={true}
                              onClick={this.openModal}/>
                <Dialog
                    title={this.props.record ? 'Update record' : 'Create record'}
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
    updateSelfRecordAction
})(ManageRecord);

export {
    ManageRecord
}