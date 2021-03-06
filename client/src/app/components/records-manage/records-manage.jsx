import {ManageRecord} from "../record/mange-record";
import {connect} from "react-redux";
import {deleteSelfRecordAction, getSelfRecordsAction, getUserRecordsAction} from "../../store/record/record.actions";
import {
    DatePicker, FlatButton, MenuItem, RaisedButton, SelectField, Table, TableBody, TableHeader, TableHeaderColumn,
    TableRow,
    TableRowColumn, TextField
} from "material-ui";
import * as _ from "lodash";
import {getUsersAction} from "../../store/users/users.actions";
import {ConfirmModal} from "../confirm-modal/confirm-modal";

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
            dateFrom: null,
            dateTo: null,
            rowForDelete: null,
            confirmDeleteOpen: false
        };

        if(this.props.self.role !== 'admin') {
            // this.props.getSelfRecordsAction();

        } else {
            this.props.getUsersAction(['regular']);
        }


    }

    updateRecords(dateFrom, dateTo, search) {

        let dateToModified = _.clone(dateTo);
        if(dateFrom) {
            if(dateFrom >= dateTo) {
                dateToModified = _.clone(dateFrom);
                dateToModified.setDate(dateFrom.getDate() + 1);
            }
        }

        if(dateFrom || search) {
            if(this.props.self.role !== 'admin') {
                this.props.getSelfRecordsAction(dateFrom, dateTo, search);
            } else {
                this.props.getUserRecordsAction(this.state.selectedUser, dateFrom, dateToModified, search);
            }
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

    openConfirmDelete(row) {
        this.setState({
            rowForDelete: row,
            confirmDeleteOpen: true
        })
    }

    onConfirmDeleteSuccess = () => {
        this.props.deleteSelfRecordAction(this.state.rowForDelete);
        this.setState({
            rowForDelete: null,
            confirmDeleteOpen: false
        })
    };

    clearDates = () => {
        this.setState({
            dateFrom: null,
            dateTo: null,
        });

        if(this.props.self.role !== 'admin') {
            this.state.search && this.props.getSelfRecordsAction();
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
                    <FlatButton secondary={true} label="Clear dates" onTouchTap={this.clearDates}/>
                    {
                        (this.props.self.role !== 'admin' || this.state.selectedUser) && (
                            <ManageRecord user={this.state.selectedUser} onChange={this.recordAdded}/>
                        )
                    }
                </div>
                {
                    ((this.props.self.role !== 'admin' || this.state.selectedUser) && (this.state.search || this.state.dateFrom)) && (
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
                                        <TableHeaderColumn tooltip="Name of the record">Name</TableHeaderColumn>
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
                                            <TableRowColumn>{row.name}</TableRowColumn>
                                            <TableRowColumn>{this.formatDate(row.date)}</TableRowColumn>
                                            <TableRowColumn>{row.description}</TableRowColumn>
                                            <TableRowColumn>{row.amount}</TableRowColumn>
                                            <TableRowColumn>{row.comment}</TableRowColumn>
                                            <TableRowColumn>
                                                <ManageRecord record={row}/>
                                            </TableRowColumn>
                                            <TableRowColumn>
                                                <RaisedButton label="Delete" secondary={true} onTouchTap={() => {
                                                    this.openConfirmDelete(row)
                                                }}/>
                                            </TableRowColumn>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )
                }
                <ConfirmModal
                    message={'Are you sure you want to delete this record?'}
                    modalOpen={this.state.confirmDeleteOpen}
                    onSuccess={this.onConfirmDeleteSuccess}/>
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