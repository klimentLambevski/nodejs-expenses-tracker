import AppBar from 'material-ui/AppBar';
import {Dialog, FlatButton, FontIcon, RaisedButton} from "material-ui";
import {connect} from "react-redux";
import {logoutSelf, saveSelfAction} from "../../store/self/self.actions";
import {logoutUser} from "../../store/auth/auth.actions";
import {withFormHandler} from "../../hocs/with-form-handler";
import UserRegisterForm from '../user/user.register.form';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.actions = (
           <div>
               <RaisedButton
                   label="EDIT PROFILE"
                   primary={true}
                   onTouchTap={() => this.editProfile()}
               />
               <RaisedButton
                   label="LOGOUT"
                   secondary={true}
                   onTouchTap={() => this.logout()}
               />
           </div>
        );
        this.state = {
            modalOpen: false
        }
    }

    logout() {
        this.props.logoutSelf();
        this.props.logoutUser();
    }

    editProfile() {
        this.setState({modalOpen: true});
    }

    handleClose = () => {
        this.setState({modalOpen: false});
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
                key="user-register"
                removeContainer={true}
                formItem={this.props.self}
                saveItem={this.props.saveSelfAction}
            />
        ];
        return (
            <AppBar
                className="header"
                title={this.props.self && `${this.props.self.name} ${this.props.self.lastName}`}
                iconElementRight={this.actions}
                iconElementLeft={<span></span>}
            >
                <Dialog
                    title={'Edit profile'}
                    actions={actions}
                    modal={false}
                    open={this.state.modalOpen}
                    children={children}
                    onRequestClose={this.handleClose}/>
            </AppBar>
        )
    }
}


const mapStateToProps = (state) => ({
    self: state.common.self
});

Header = connect(mapStateToProps, {
    logoutSelf,
    logoutUser,
    saveSelfAction
})(Header);

export {
    Header
}