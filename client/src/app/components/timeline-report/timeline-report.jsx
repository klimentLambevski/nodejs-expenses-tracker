import {connect} from "react-redux";
import {DatePicker, MenuItem, RaisedButton, SelectField, TimePicker} from "material-ui";
import {getUserRecordsAction} from "../../store/record/record.actions";
import * as _ from 'lodash';
import {showAlert} from "../../store/alert/alert.actions";
import {getUsersAction} from "../../store/users/users.actions";

class TimelineReport extends React.Component {
    constructor(props) {
        super(props);
        let date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        this.dateChosenFrom = date;
        this.dateChosenTo = _.clone(date);
        this.dateChosenTo.setHours(24);

        this.state = {
            selectedUser: null,
            report: {time: 0, notes: []}
        }
    }

    componentDidMount() {
        this.props.getUsersAction(['regular']);
    }

    updateTimeline(date) {
        this.dateChosen = date;
        this.props.getUserRecordsAction(this.state.selectedUser, date);
    }


    setUser(user) {
        this.props.getUserRecordsAction(user, this.dateChosenFrom, this.dateChosenTo);
        this.setState(prevState => {
            return {
                selectedUser: user,
                displayValue: `${user.name} ${user.lastName}`
            }
        })
    }

    deleteRecord(record) {
        this.props.deleteRecordAction(this.state.selectedUser, record);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            report: this.generateReports(nextProps.records)
        })
    }

    generateReports(records) {
        return records.reduce((acc, record) => {
            let workedFrom = new Date(record.workedFrom);
            let workedTo = new Date(record.workedTo);

            acc.time += (workedTo.getHours() - workedFrom.getHours()) + (workedTo.getMinutes() - workedFrom.getMinutes())/60;
            acc.notes.push({
                note: `${record.notes || 'No notes found'}`,
                time: `From: ${workedFrom.getHours()}h ${workedFrom.getMinutes()}m To: ${workedTo.getHours()}h ${workedTo.getMinutes()}m`
            });

            return acc;
        }, {time: 0, notes: []})
    }

    render() {
        return (
            <div className="user-timeline-component">
                <div className="user-timeline-filters form-container">
                    <SelectField
                        floatingLabelText="Select user"
                        value={this.state.selectedUser}
                        onChange={(event, index, user) => {this.setUser(user)}}
                    >
                        {
                            this.props.users.map((user, index) => (
                                <MenuItem key={index} value={user} primaryText={`${user.name} ${user.lastName}`}/>
                            ))
                        }
                    </SelectField>

                    <DatePicker
                        floatingLabelText="Enter desired date"
                        mode="landscape"
                        defaultDate={this.dateChosenFrom}
                        onChange={(e, date) => {
                            this.updateTimeline(date)
                        } }/>

                    <DatePicker
                        floatingLabelText="Enter desired date"
                        mode="landscape"
                        defaultDate={this.dateChosenTo}
                        onChange={(e, date) => {
                            this.updateTimeline(date)
                        } }/>

                </div>
                {
                    this.state.selectedUser && (
                        <div className="timeline-report form-container">
                            <div>Time worked: {this.state.report.time}h</div>
                            <ul>
                                {
                                    this.state.report.notes.map((note, index) => (
                                        <li key={index}>{note.note} <small>{note.time}</small></li>
                                    ))
                                }
                            </ul>
                        </div>
                    )
                }
            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    records: state.common.records,
    users: state.common.users
});

TimelineReport = connect(mapStateToProps, {
    getUserRecordsAction,
    showAlert,
    getUsersAction
})(TimelineReport);

export {
    TimelineReport
}