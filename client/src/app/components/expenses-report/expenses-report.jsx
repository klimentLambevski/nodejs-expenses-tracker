import {connect} from "react-redux";
import {DatePicker, MenuItem, SelectField} from "material-ui";
class ExpensesReport extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

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
                    <DatePicker
                        floatingLabelText="Date from"
                        mode="landscape"
                        value={this.state.dateFrom}
                        onChange={(e, date) => {
                            this.updateRecords(date, this.state.dateTo)
                        } }/>


                </div>

                    <div className="records-manage-preview form-container">

                    </div>


            </div>
        )
    }
}

ExpensesReport = connect(state => ({
    records: state.common.records,
    self: state.common.self,
    users: state.common.users,
}))(ExpensesReport);

export {
    ExpensesReport
}