import {connect} from "react-redux";
import {getUsersAction} from "../../store/users/users.actions";
import {
    Dialog, FlatButton, RaisedButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow,
    TableRowColumn
} from "material-ui";
import {Header} from "../header/header";
import UserRegisterForm from '../user/user.register.form';
import {withFormHandler} from "../../hocs/with-form-handler";

class UsersManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            currentUser: {}
        }
    }

    componentDidMount() {
        this.props.getUsersAction();
    }

    handleClose = () => {
        this.setState({modalOpen: false});
    };

    openModal = (user) => {

        this.setState(() => {
            return {modalOpen: true, currentUser: user};
        });
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

        const UserRegisterFormRedux = withFormHandler(UserRegisterForm, 'create');
        const children = [
            <UserRegisterFormRedux
                removeContainer={true}
                formItem={this.state.currentUser}
            />
        ];
        return (
            <section>
                <Header />
                <div className="users-manage-component">
                    <div className="users-actions form-container">
                        <RaisedButton
                            label="Create new user"
                            onTouchTap={() => {this.openModal({})}}
                            primary={true} />
                    </div>
                    <div className="users-table form-container">
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
                                    <TableHeaderColumn tooltip="The Email">Email</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="The Last name">Last name</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Start of the work day">Working from</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="End of the work day">Working to</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Edit user">Edit</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Delete">Delete</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody
                                displayRowCheckbox={false}
                                deselectOnClickaway={true}
                                showRowHover={false}
                                stripedRows={false}
                            >
                                {this.props.users.map( (row, index) => (
                                    <TableRow key={index} selected={row.selected}>
                                        <TableRowColumn>{index}</TableRowColumn>
                                        <TableRowColumn>{row.email}</TableRowColumn>
                                        <TableRowColumn>{row.name}</TableRowColumn>
                                        <TableRowColumn>{row.lastName}</TableRowColumn>
                                        <TableRowColumn>{row.workingHoursFrom}</TableRowColumn>
                                        <TableRowColumn>{row.workingHoursTo}</TableRowColumn>
                                        <TableRowColumn>
                                            <RaisedButton label="Edit" primary={true} onTouchTap={() => {this.openModal(row)}} />
                                        </TableRowColumn>
                                        <TableRowColumn>
                                            <RaisedButton label="Delete" secondary={true} />
                                        </TableRowColumn>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
                <Dialog
                    title={this.state.currentUser.id? 'Update user': 'Create user'}
                    actions={actions}
                    modal={false}
                    open={this.state.modalOpen}
                    children={children}
                    onRequestClose={this.handleClose} />

            </section>
        )
    }
}

const mapStateToProps = (state) => ({
    users: state.common.users
});

UsersManage = connect(mapStateToProps, {
    getUsersAction
})(UsersManage);

export {
    UsersManage
}