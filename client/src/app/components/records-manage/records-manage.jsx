import {ManageRecord} from "../record/mange-record";
import {connect} from "react-redux";
import {deleteSelfRecordAction, getSelfRecordsAction, getUserRecordsAction} from "../../store/record/record.actions";
import {
    DatePicker, MenuItem, RaisedButton, SelectField, Table, TableBody, TableHeader, TableHeaderColumn, TableRow,
    TableRowColumn, TextField
} from "material-ui";
import * as _ from "lodash";
import {getUsersAction} from "../../store/users/users.actions";

class RecordsManage extends React.Component {
    constructor(props) {
        super(props);
        let date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        let dateTo = _.clone(date);
        dateTo.setDate(date.getDate() + 1);

        this.state = {
            selectedUser: null,
            dateFrom: date,
            dateTo: dateTo
        };

        if(this.props.self.role !== 'admin') {
            this.props.getSelfRecordsAction(date, dateTo);

        } else {
            this.props.getUsersAction();
        }


    }

    updateRecords(dateFrom, dateTo, search) {
        console.log(search);
        let dateToModified = _.clone(dateTo);
        if(dateFrom >= dateTo) {
            dateToModified = _.clone(dateFrom);
            dateToModified.setDate(dateFrom.getDate() + 1);
        }

        if(this.props.self.role !== 'admin') {
            this.props.getSelfRecordsAction(dateFrom, dateTo);
        } else {
            this.props.getUserRecordsAction(this.state.selectedUser, dateFrom, dateToModified);
        }

        this.setState({
            dateFrom: dateFrom,
            dateTo: dateToModified,
            search
        })
    }

    formatDate(date) {
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        let hours = date.getHours();
        let minutes = date.getMinutes();

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    deleteRecord(record) {
        this.props.deleteSelfRecordAction(record);
    }

    setUser(user) {
        this.setState({
            selectedUser: user
        });

        this.props.getUserRecordsAction(user, this.state.dateFrom, this.state.dateTo);
    }

    recordAdded = () => {
        if(this.props.self.role !== 'admin') {
            this.props.getSelfRecordsAction(this.state.dateFrom, this.state.dateTo);
        } else {
            this.props.getUserRecordsAction(this.state.selectedUser, this.state.dateFrom, this.state.dateTo);
        }
    };

    render() {

        return (
            <div className="records-manage">
                <div className="records-manage-actions form-container">
                    {
                        this.props.self.role === 'admin' && (
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
                        )
                    }
                    <TextField
                        floatingLabelText="Search"
                        value={this.state.search}
                        onChange={(e, text) => {
                            this.updateRecords(this.state.dateFrom, this.state.dateTo, text);
                        } }
                    />

                    <DatePicker
                        floatingLabelText="Date from"
                        mode="landscape"
                        value={this.state.dateFrom}
                        onChange={(e, date) => {
                            this.updateRecords(date, this.state.dateTo, this.state.search)
                        } }/>

                    <DatePicker
                        floatingLabelText="Date to"
                        mode="landscape"
                        value={this.state.dateTo}
                        onChange={(e, date) => {
                            this.updateRecords(this.state.dateFrom, date, this.state.search)
                        } }/>
                    {
                        (this.props.self.role !== 'admin' || this.state.selectedUser) && (
                            <ManageRecord user={this.state.selectedUser} onChange={this.recordAdded}/>
                        )
                    }
                </div>
                {
                    (this.props.self.role !== 'admin' || this.state.selectedUser) && (
                        <div className="records-manage-preview form-container">
                            <Table
                                height={'400px'}
                                fixedHeader={true}
                                selectable={false}
                                multiSelectable={false}>
                                <TableHeader
                                    displaySelectAll={false}
                                    adjustForCheckbox={false}
                                    enableSelectAll={false}
                                >
                                    <TableRow>
                                        <TableHeaderColumn>#</TableHeaderColumn>
                                        <TableHeaderColumn tooltip="Date of the record">Date</TableHeaderColumn>
                                        <TableHeaderColumn tooltip="Description od the record">Description</TableHeaderColumn>
                                        <TableHeaderColumn tooltip="The Last name">Amount</TableHeaderColumn>
                                        <TableHeaderColumn tooltip="Comment">Comment</TableHeaderColumn>
                                        <TableHeaderColumn tooltip="Edit record">Edit</TableHeaderColumn>
                                        <TableHeaderColumn tooltip="Delete">Delete</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody
                                    displayRowCheckbox={false}
                                    deselectOnClickaway={true}
                                    showRowHover={false}
                                    stripedRows={false}
                                >
                                    {this.props.records.map((row, index) => (
                                        <TableRow key={index} selected={row.selected}>
                                            <TableRowColumn>{index}</TableRowColumn>
                                            <TableRowColumn>{this.formatDate(row.date)}</TableRowColumn>
                                            <TableRowColumn>{row.description}</TableRowColumn>
                                            <TableRowColumn>{row.amount}</TableRowColumn>
                                            <TableRowColumn>{row.comment}</TableRowColumn>
                                            <TableRowColumn>
                                                <ManageRecord record={row}/>
                                            </TableRowColumn>
                                            <TableRowColumn>
                                                <RaisedButton label="Delete" secondary={true} onTouchTap={() => {
                                                    this.deleteRecord(row)
                                                }}/>
                                            </TableRowColumn>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )
                }
            </div>
        )
    }
}

RecordsManage = connect(state => ({
    records: state.common.records,
    self: state.common.self,
    users: state.common.users,
}), {
    getSelfRecordsAction,
    deleteSelfRecordAction,
    getUserRecordsAction,
    getUsersAction
})(RecordsManage);

export {
    RecordsManage
}