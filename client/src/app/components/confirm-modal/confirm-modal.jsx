import {Dialog, FlatButton} from "material-ui";
class ConfirmModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false
        }
    }

    handleClose = (result) => {
        if(result) {
            this.props.onSuccess && this.props.onSuccess(this.props.value);
        }
        this.setState({
            modalOpen: false
        })
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            modalOpen: nextProps.modalOpen
        })
    }

    render() {

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={() => this.handleClose(false)}
            />,
            <FlatButton
                label="Confirm"
                primary={true}
                keyboardFocused={true}
                onTouchTap={() => this.handleClose(true)}
            />,
        ];

        return (
            <Dialog
                title={'Confirm'}
                actions={actions}
                modal={false}
                open={this.state.modalOpen}
                onRequestClose={() => this.handleClose(false)}
            >
                {this.props.message}
            </Dialog>
        )
    }
}

export {
    ConfirmModal
}