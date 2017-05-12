import {connect} from "react-redux";
import {DatePicker, MenuItem, RaisedButton, SelectField} from "material-ui";
import * as _ from "lodash";
import {getSelfRecordsAction, getUserRecordsAction} from "../../store/record/record.actions";
import {getUsersAction} from "../../store/users/users.actions";

Date.prototype.getWeekNumber = function(){
    let d = new Date(+this);
    d.setHours(0,0,0,0);
    d.setDate(d.getDate()+4-(d.getDay()||7));
    return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
};

class ExpensesReport extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dateFrom: null,
            dateTo: null,
            selectedUser: null
        };
        if(this.props.self.role === 'admin') {
            this.props.getUsersAction()
        }
    }

    shouldDisableDate(day) {
        return day.getDay() !== 1;
    }

    updateRecords = (dateFrom, dateTo) => {
        let dateToModified = null;

        if(dateFrom && dateTo) {
            dateToModified = _.clone(dateTo);
            if(dateFrom >= dateTo) {
                dateToModified = _.clone(dateFrom);
                dateToModified.setDate(dateFrom.getDate() + 1);
            }
        }

        this.setState({
            dateFrom: dateFrom,
            dateTo: dateToModified
        });
        if ((this.props.self.role !== 'admin' || this.state.selectedUser) && (dateFrom && dateTo)) {
            this.getReport(dateFrom, dateToModified, this.state.selectedUser);
        }
    };

    setUser = (user) => {
        this.setState({
            selectedUser: user
        });

        if ((this.props.self.role !== 'admin' || user) && (this.state.dateFrom && this.state.dateTo)) {
            this.getReport(this.state.dateFrom, this.state.dateTo, user);
        }
    };

    getReport(dateFrom, dateTo, user) {
        if (this.props.self.role === 'admin') {
            this.props.getUserRecordsAction(user, dateFrom, dateTo);
        } else {
            this.props.getSelfRecordsAction(dateFrom, dateTo);
        }
    }

    getRecordsWithTotal(records) {
        if(records.length === 0) return [];

        let curDate = null;
        let total = 0;
        let curWeek = 0;
        let weekTotal = 0;
        let dayTotal = 0;
        let result = [];

        for(let i = 0; i < records.length; i++) {
            total += records[i].amount;
            let date = `${records[i].date.getDate()}/${records[i].date.getMonth()}/${records[i].date.getFullYear()}`;
            let week = `${records[i].date.getWeekNumber()}/${records[i].date.getFullYear()}`;

            if(curDate !== date) {
                if(curDate) {
                    result.push({
                        date: curDate,
                        dayTotal: dayTotal
                    })
                }

                curDate = date;
                dayTotal = records[i].amount;
            } else {
                dayTotal += records[i].amount;
            }

            if(curWeek !== week) {
                if(curWeek) {
                    result.push({
                        week: curWeek,
                        weekTotal: weekTotal
                    })
                }

                curWeek = week;
                weekTotal = records[i].amount;
            } else {
                weekTotal += records[i].amount;
            }

            result.push(records[i]);
        }

        result.push({
            date: curDate,
            dayTotal: dayTotal
        });

        result.push({
            week: curWeek,
            weekTotal: weekTotal
        });

        result.push({
            total: total
        });

        return result;
    }

    printReport() {
        window.print();
    }

    render() {
        return (
            <div className="expenses-report">
                <div className="expenses-report-actions form-container">
                    {
                        this.props.self.role === 'admin' && (
                            <SelectField
                                floatingLabelText="Select user"
                                value={this.state.selectedUser}
                                onChange={(event, index, user) => {
                                    this.setUser(user)
                                }}
                            >
                                {
                                    this.props.users.map((user, index) => (
                                        <MenuItem key={index} value={user}
                                                  primaryText={`${user.name} ${user.lastName}`}/>
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
                    <DatePicker
                        floatingLabelText="Date to"
                        mode="landscape"
                        value={this.state.dateTo}
                        onChange={(e, date) => {
                            this.updateRecords(this.state.dateFrom, date)
                        } }/>
                    {
                        this.state.dateFrom && this.state.dateTo && (this.state.selectedUser || this.props.self.role !== 'admin') && (
                            <RaisedButton primary={true} label="PRINT" onTouchTap={this.printReport}/>
                        )
                    }

                </div>

                {
                    this.state.dateFrom && this.state.dateTo && (this.state.selectedUser || this.props.self.role !== 'admin') && (
                        <div className="expenses-report-preview form-container">
                            <h4>{this.state.selectedUser ? `${this.state.selectedUser.name} ${this.state.selectedUser.lastName}` : `${this.props.self.name} ${this.props.self.lastName}`}</h4>
                            <h4>
                                Expense report for week starting on {this.state.dateFrom.getDate()}/{this.state.dateFrom.getMonth()}/{this.state.dateFrom.getFullYear()} ending on {this.state.dateTo.getDate()}/{this.state.dateTo.getMonth()}/{this.state.dateTo.getFullYear()}
                            </h4>
                            <table className="report">
                                <thead>
                                    <tr>
                                        <td>Date</td>
                                        <td>Description</td>
                                        <td>Amount</td>
                                        <td>Comment</td>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    this.getRecordsWithTotal(this.props.records).map(record => {
                                        if(record.dayTotal) {
                                            return (
                                                <tr className="day-total" key={record.date + record.dayTotal}>
                                                    <td colSpan={4} style={{textAlign: 'right'}}>Total for day {record.date} <b>{record.dayTotal}</b></td>
                                                </tr>
                                            )
                                        } else if(record.weekTotal) {
                                            return (
                                                <tr className="week-total" key={record.week + record.weekTotal}>
                                                    <td colSpan={4} style={{textAlign: 'right'}}>Total for week {record.week} <b>{record.weekTotal}</b></td>
                                                </tr>
                                            )
                                        } else if(record.total) {
                                            return (
                                                <tr className="total" key={record.total}>
                                                    <td colSpan={4} style={{textAlign: 'right'}}>Total <b>{record.total}</b></td>
                                                </tr>
                                            )
                                        } else {
                                            return (
                                                <tr key={record.id}>
                                                    <td>{record.date.getDate()}/{record.date.getMonth()}/{record.date.getFullYear()} {record.date.getHours()}:{record.date.getMinutes()}</td>
                                                    <td>{record.description}</td>
                                                    <td>{record.amount}</td>
                                                    <td>{record.comment}</td>
                                                </tr>
                                            )
                                        }
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    )
                }


            </div>
        )
    }
}

ExpensesReport = connect(state => ({
    records: state.common.records,
    self: state.common.self,
    users: state.common.users,
}), {
    getSelfRecordsAction,
    getUserRecordsAction,
    getUsersAction
})(ExpensesReport);

export {
    ExpensesReport
}