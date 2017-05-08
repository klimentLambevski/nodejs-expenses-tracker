import {ManageRecord} from "../record/mange-record";
import {connect} from "react-redux";
import {deleteSelfRecordAction, getSelfRecordsAction} from "../../store/record/record.actions";
import {
    DatePicker, RaisedButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow,
    TableRowColumn
} from "material-ui";

class RecordsManage extends React.Component {
    constructor(props) {
        super(props);
        let date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        this.props.getSelfRecordsAction(date);
        this.state = {

        }
    }

    updateRecords(date) {
        this.props.getSelfRecordsAction(date);
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

    render() {

        return (
            <div className="records-manage">
                <div className="records-manage-actions form-container">
                    <DatePicker
                        floatingLabelText="Date"
                        mode="landscape"
                        defaultDate={new Date()}
                        onChange={(e, date) => {
                            this.updateRecords(date)
                        } }/>
                    <ManageRecord/>
                </div>
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
            </div>
        )
    }
}

RecordsManage = connect(state => ({
    records: state.common.records
}), {
    getSelfRecordsAction,
    deleteSelfRecordAction
})(RecordsManage);

export {
    RecordsManage
}