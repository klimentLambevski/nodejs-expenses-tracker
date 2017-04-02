import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {removeAlert} from '../../store/alert/alert.actions';
import {Snackbar} from "material-ui";

class AlertContainer extends React.Component {
    constructor(props) {
        super(props);
        this.onRemove = this.onRemove.bind(this);
        this.snackbarOpen = {};
    }

    onRemove(alertId) {
        this.props.actions.removeAlert(alertId);
    }

    getMessage(alert) {
        this.snackbarOpen[alert.alertId] = true;
        return typeof alert.message === 'string' ? alert.message : alert[0].message;
    }

    render() {
        return (
            <div className="alert-container">
                {
                    this.props.alertMessages
                        .map((alert) => {
                            this.snackbarOpen[alert.alertId] = true;
                            return (
                                <Snackbar
                                    open={this.snackbarOpen[alert.alertId]}
                                    key={alert.alertId}
                                    message={this.getMessage(alert)}
                                    autoHideDuration={3000}
                                    onRequestClose={() => {
                                        this.onRemove(alert.alertId)
                                    }}
                                />
                            )
                            }
                        )
                }
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    alertMessages: state.alertMessages
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({removeAlert}, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(AlertContainer);