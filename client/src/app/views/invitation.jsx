import {connect} from "react-redux";
import {withFormHandler} from "../hocs/with-form-handler";
import UserRegisterForm from '../components/user/user.register.form';
import {completeInvitationAction} from "../store/users/users.actions";
import {getSelfAction} from "../store/self/self.actions";
import{push} from 'react-router-redux';

class CompleteInvitationView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                email: this.props.routeParams.email,
                activationId: this.props.routeParams.activation
            }
        };

        console.log(this.props.routeParams);
    }

    completeInvitation = (data) => {
        return this.props.completeInvitationAction(data).then(res => {
            this.setState({
                message: 'You have been successfully registered'
            });

            this.props.getSelfAction().then(() => {
                setTimeout(() => {
                    this.props.push('/dashboard')
                }, 4000)
            });
        })
    };

    render() {

        const CompleteInvitationForm = withFormHandler(UserRegisterForm, 'register');

        return (
            <div className="complete-invitation">
                {
                    this.state.message ? (
                        <div className="form-container">
                            <h4>{this.state.message}. Redirecting....</h4>
                        </div>
                    ): (
                        <CompleteInvitationForm saveItem={this.completeInvitation} formItem={this.state.form}/>
                    )
                }

            </div>
        )
    }
}

CompleteInvitationView = connect(null, {
    completeInvitationAction,
    getSelfAction,
    push
})(CompleteInvitationView);

export {
    CompleteInvitationView
}