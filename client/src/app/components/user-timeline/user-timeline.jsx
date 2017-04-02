import {connect} from "react-redux";
import {Header} from "../header/header";
import {DatePicker, RaisedButton, TimePicker} from "material-ui";
import {addSelfRecordAction, getSelfRecordsAction} from "../../store/record/record.actions";
import {Timeline} from "../timeline/timeline";
import * as _ from 'lodash';
import {showAlert} from "../../store/alert/alert.actions";

class UserTimeline extends React.Component {
    constructor(props) {
        super(props);
        this.fromHour = null;
        this.toHour = null;
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
        this.props.showAlert({message: 'Test alert'})
    }

    updateTimeline(date) {
        this.dateChosen = date;
        this.props.getSelfRecordsAction(date);
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

        this.props.addSelfRecordAction(fromHour, toHour);
    }

    render() {
        return (
            <section>
                <Header />
                <div className="user-timeline-component">
                    <div className="user-timeline-filters form-container">
                        <DatePicker
                            floatingLabelText="Enter desired date"
                            mode="landscape"
                            defaultDate={new Date()}
                            onChange={(e, date) => {this.updateTimeline(date)} }/>
                        <div className="divider"></div>
                        <TimePicker
                            format="24hr"
                            floatingLabelText="From hour"
                            onChange={(e, time) => {this.fromHour = time; } }
                        />

                        <TimePicker
                            format="24hr"
                            floatingLabelText="To hour"
                            onChange={(e, time) => {this.toHour = time; } }
                        />

                        <RaisedButton label="Add record" primary={true} onClick={(e) => {this.addRecord()}} />
                    </div>
                    <Timeline records={this.props.records}/>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => ({
    records: state.common.records
});

UserTimeline = connect(mapStateToProps, {
    getSelfRecordsAction,
    addSelfRecordAction,
    showAlert
})(UserTimeline);

export {
    UserTimeline
}