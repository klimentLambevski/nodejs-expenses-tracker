import {connect} from "react-redux";
import {DatePicker, MenuItem, RaisedButton, SelectField, TimePicker} from "material-ui";
import {addSelfRecordAction, deleteRecordAction, getUserRecordsAction} from "../../store/record/record.actions";
import {Timeline} from "../timeline/timeline";
import * as _ from 'lodash';
import {showAlert} from "../../store/alert/alert.actions";
import {getUsersAction} from "../../store/users/users.actions";

class UserSpecificTimeline extends React.Component {
    constructor(props) {
        super(props);
        this.fromHour = null;
        this.toHour = null;
        this.dateChosen = null;
        this.state = {
            selectedUser: null
        }
    }

    componentDidMount() {
        let date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        this.dateChosen = date;

        this.props.getUsersAction(['regular']);
    }

    updateTimeline(date) {
        this.dateChosen = date;
        this.props.getUserRecordsAction(this.state.selectedUser, date);
    }

    // addRecord() {
    //     if (this.fromHour.getTime() > this.toHour.getTime()) {
    //         this.props.showAlert({message: '\'Form\' hour have to be lower than \'to\' hour'});
    //         return false;
    //     }
    //
    //     let fromHour = _.clone(this.dateChosen);
    //     fromHour.setHours(this.fromHour.getHours());
    //     fromHour.setMinutes(this.fromHour.getMinutes());
    //     fromHour.setSeconds(0);
    //     fromHour.setMilliseconds(0);
    //
    //     let toHour = _.clone(this.dateChosen);
    //     toHour.setHours(this.toHour.getHours());
    //     toHour.setMinutes(this.toHour.getMinutes());
    //     toHour.setSeconds(0);
    //     toHour.setMilliseconds(0);
    //
    //     this.props.addSelfRecordAction(fromHour, toHour);
    // }

    setUser(user) {
        this.props.getUserRecordsAction(user, this.dateChosen);
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
                        floatingLabelText="Enter date"
                        mode="landscape"
                        defaultDate={new Date()}
                        onChange={(e, date) => {
                            this.updateTimeline(date)
                        } }/>
                    <div className="divider"></div>
                    {/*<TimePicker*/}
                        {/*format="24hr"*/}
                        {/*floatingLabelText="From hour"*/}
                        {/*onChange={(e, time) => {*/}
                            {/*this.fromHour = time;*/}
                        {/*} }*/}
                    {/*/>*/}

                    {/*<TimePicker*/}
                        {/*format="24hr"*/}
                        {/*floatingLabelText="To hour"*/}
                        {/*onChange={(e, time) => {*/}
                            {/*this.toHour = time;*/}
                        {/*} }*/}
                    {/*/>*/}

                    {/*<RaisedButton label="Add record" primary={true} onClick={(e) => {*/}
                        {/*this.addRecord()*/}
                    {/*}}/>*/}
                </div>
                {
                    this.state.selectedUser && (
                        <Timeline
                            deleteRecord={this.deleteRecord.bind(this)}
                            records={this.props.records}
                            workingHours={{from: this.state.selectedUser.workingHoursFrom, to: this.state.selectedUser.workingHoursTo}}/>
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

UserSpecificTimeline = connect(mapStateToProps, {
    getUserRecordsAction,
    addSelfRecordAction,
    showAlert,
    getUsersAction,
    deleteRecordAction
})(UserSpecificTimeline);

export {
    UserSpecificTimeline
}