import {reduxForm} from 'redux-form';
import {CircularProgress} from "material-ui";

const withFormHandler = (WrappedForm, formName, validate) => {

    const WrappedFormRedux = reduxForm({
        form: formName,
        enableReinitialize: true,
        validate
    })(WrappedForm);

    class WithFormHandler extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                formItem: Object.assign({}, this.props.formItem)
            };

            this.onSubmit = this.onSubmit.bind(this);
        }

        componentWillReceiveProps(nextProps) {
            if (nextProps.formItem && this.state.formItem.id !== nextProps.formItem.id) {
                this.setState({formItem: nextProps.formItem})
            }
        }

        onSubmit(item) {
            this.setState({isLoading: true});
            this.props.saveItem(item).then(() => {
                this.setState({isLoading: false});
            }).catch(() => {
                this.setState({isLoading: false});
            });
        }

        render() {
            const {saveItem, formItem, removeContainer, ...rest} = this.props;

            return (
                <section className={!removeContainer ? 'form-container' : ''} style={{position: 'relative'}}>
                    {
                        this.state.isLoading ?
                            <div className="form-loading">
                                <CircularProgress size={80} thickness={5}/>
                            </div> : null
                    }
                    <WrappedFormRedux
                        onSubmit={this.onSubmit}
                        initialValues={this.state.formItem}
                        {...rest}
                    />
                </section>
            );
        }
    }

    const getDisplayName = (WrappedComponent) => WrappedComponent.displayName || WrappedComponent.name || 'Component';

    WithFormHandler.displayName = `WithFormHandler(${getDisplayName(WrappedForm)})`;

    return WithFormHandler;
};

export {withFormHandler};
