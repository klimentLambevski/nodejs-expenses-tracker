import {connect} from "react-redux";
import {Header} from "../header/header";
import {DatePicker, RaisedButton, TextField, TimePicker} from "material-ui";
import {addSelfRecordAction, deleteSelfRecordAction, getSelfRecordsAction} from "../../store/record/record.actions";
import {Timeline} from "../timeline/timeline";
import * as _ from 'lodash';
import {showAlert} from "../../store/alert/alert.actions";

class UserTimeline extends React.Component {
    constructor(props) {
        super(props);
        this.fromHour = null;
        this.toHour = null;
        this.notes = null;
        this.dateChosen = null;
    }

    componentDidMount() {
        let date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        this.dateChosen = date;

        this.props.getSelfRecordsAction(date);
    }

    updateTimeline(date) {
        this.dateChosen = date;
        this.props.getSelfRecordsAction(date);
    }

    updateNotes(notes) {
        this.notes = notes;
    }

    addRecord() {
        if (this.fromHour.getTime() > this.toHour.getTime()) {
            this.props.showAlert({message: '\'Form\' hour have to be lower than \'to\' hour'});
            return false;
        }

        let fromHour = _.clone(this.dateChosen);
        fromHour.setHours(this.fromHour.getHours());
        fromHour.setMinutes(this.fromHour.getMinutes());
        fromHour.setSeconds(0);
        fromHour.setMilliseconds(0);

        let toHour = _.clone(this.dateChosen);
        toHour.setHours(this.toHour.getHours());
        toHour.setMinutes(this.toHour.getMinutes());
        toHour.setSeconds(0);
        toHour.setMilliseconds(0);

        this.props.addSelfRecordAction(fromHour, toHour, this.notes);
    }

    deleteRecord(record) {
        this.props.deleteSelfRecordAction(record);
    }

    render() {
        return (
            <div className="user-timeline-component">
                <div className="user-timeline-filters form-container">
                    <DatePicker
                        floatingLabelText="Enter date"
                        mode="landscape"
                        defaultDate={new Date()}
                        onChange={(e, date) => {
                            this.updateTimeline(date)
                        } }/>
                    <div className="divider"></div>
                    <TimePicker
                        format="24hr"
                        floatingLabelText="From hour"
                        onChange={(e, time) => {
                            this.fromHour = time;
                        } }
                    />

                    <TimePicker
                        format="24hr"
                        floatingLabelText="To hour"
                        onChange={(e, time) => {
                            this.toHour = time;
                        } }
                    />

                    <TextField
                        hintText="Notes"
                        floatingLabelText="Add notes"
                        multiLine={true}
                        onChange={(e, value) => {this.updateNotes(value)}}
                    />

                    <RaisedButton label="Add record" primary={true} onClick={(e) => {
                        this.addRecord()
                    }}/>
                </div>
                <Timeline
                    deleteRecord={this.deleteRecord.bind(this)}
                    records={this.props.records}
                    workingHours={{from: this.props.self.workingHoursFrom, to: this.props.self.workingHoursTo}}/>
            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    records: state.common.records,
    self: state.common.self
});

UserTimeline = connect(mapStateToProps, {
    getSelfRecordsAction,
    addSelfRecordAction,
    deleteSelfRecordAction,
    showAlert
})(UserTimeline);

export {
    UserTimeline
}