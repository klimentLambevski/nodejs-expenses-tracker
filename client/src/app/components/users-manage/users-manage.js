import {connect} from "react-redux";
import {
    createUserAction, deleteUserAction, getUsersAction, saveUserAction, unblockUserAction,
    updateUserAction
} from "../../store/users/users.actions";
import {
    Dialog, FlatButton, RaisedButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow,
    TableRowColumn
} from "material-ui";
import {Header} from "../header/header";
import UserRegisterForm from '../user/user.register.form';
import {withFormHandler} from "../../hocs/with-form-handler";
import {ConfirmModal} from "../confirm-modal/confirm-modal";
import {validateEmail, validateRequired} from "../../utils/validate";

const validate = values => {
    let errors = {};

    validateRequired(values, 'email', errors);
    validateEmail(values, 'email', errors);
    validateRequired(values, 'name', errors);
    validateRequired(values, 'lastName', errors);
    if(!values.id) {
        validateRequired(values, 'password', errors);
        validateRequired(values, 'password_repeat', errors);

        if(values.password !== values.password_repeat) {
            errors.password_repeat = 'Password and repeat password should be same'
        }
    }

    return errors;
};

const UserRegisterFormRedux = withFormHandler(UserRegisterForm, 'create', validate);

class UsersManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            currentUser: {},
            confirmDeleteOpen: false,
            rowForDelete: null
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

    componentWillReceiveProps() {
        this.setState(() => {
            return {modalOpen: false};
        });
    }

    openConfirmDelete(row) {
        this.setState({
            rowForDelete: row,
            confirmDeleteOpen: true
        })
    }

    onConfirmDeleteSuccess = () => {
        this.props.deleteUserAction(this.state.rowForDelete);
        this.setState({
            rowForDelete: null,
            confirmDeleteOpen: false
        })
    };

    unblockUser(user) {
        this.props.unblockUserAction(user);
    }

    render() {
        const actions = [
            <FlatButton
                label="Done"
                primary={true}
                keyboardFocused={false}
                onTouchTap={this.handleClose}
            />,
        ];


        return (
            <div className="users-manage-component">
                <div className="users-actions form-container">
                    <RaisedButton
                        label="Create new user"
                        onTouchTap={() => {
                            this.openModal({})
                        }}
                        primary={true}/>
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
                                <TableHeaderColumn tooltip="Role">Role</TableHeaderColumn>
                                <TableHeaderColumn tooltip="Edit user">Edit</TableHeaderColumn>
                                <TableHeaderColumn tooltip="Delete">Delete</TableHeaderColumn>
                                <TableHeaderColumn tooltip="Is user blocked">User blocked</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={false}
                            deselectOnClickaway={true}
                            showRowHover={false}
                            stripedRows={false}
                        >
                            {this.props.users.map((row, index) => (
                                <TableRow key={index} selected={row.selected}>
                                    <TableRowColumn>{index}</TableRowColumn>
                                    <TableRowColumn>{row.email}</TableRowColumn>
                                    <TableRowColumn>{row.name}</TableRowColumn>
                                    <TableRowColumn>{row.lastName}</TableRowColumn>
                                    <TableRowColumn>{row.role}</TableRowColumn>
                                    <TableRowColumn>
                                        <RaisedButton label="Edit" primary={true} onTouchTap={() => {
                                            this.openModal(row)
                                        }}/>
                                    </TableRowColumn>
                                    <TableRowColumn>
                                        <RaisedButton label="Delete" secondary={true} onTouchTap={() => {
                                            this.openConfirmDelete(row);

                                        }}/>
                                    </TableRowColumn>

                                    <TableRowColumn>
                                        {
                                            row.loginRetries >= 3 ? (
                                                <RaisedButton label="Unblock" secondary={true} onTouchTap={() => {
                                                    this.unblockUser(row);
                                                }}/>
                                            ):(
                                                <span>User not blocked</span>
                                            )
                                        }
                                    </TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <Dialog
                    title={this.state.currentUser.id ? 'Update user' : 'Create user'}
                    actions={actions}
                    modal={false}
                    open={this.state.modalOpen}
                    onRequestClose={this.handleClose}>
                    <UserRegisterFormRedux
                        key="user-register"
                        removeContainer={true}
                        formItem={this.state.currentUser}
                        saveItem={this.props.saveUserAction}
                        role={this.props.self.role}
                    />
                </Dialog>
                <ConfirmModal
                    message={'Are you sure you want to delete this user?'}
                    modalOpen={this.state.confirmDeleteOpen}
                    onSuccess={this.onConfirmDeleteSuccess}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    users: state.common.users,
    self: state.common.self
});

UsersManage = connect(mapStateToProps, {
    getUsersAction,
    saveUserAction,
    deleteUserAction,
    unblockUserAction
})(UsersManage);

export {
    UsersManage
}