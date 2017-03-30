import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

export default (ComposedComponent) => {
  class RequireAuthentication extends React.Component {

    componentWillMount() {
      this.redirectIfNotAuthenticated();
    }

    componentWillUpdate() {
      this.redirectIfNotAuthenticated();
    }

    redirectIfNotAuthenticated() {
      const { currentUrl } = this.props;

      if (!this.props.isAuthenticated) {
        this.props.actions.push(`/login?next=${currentUrl}`);
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props}/>
      );
    }
  }

  const mapStateToProps = (state, ownProps) => ({
    isAuthenticated: state.common.auth.isAuthenticated,
    currentUrl: ownProps.location.pathname
  });

  const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ push }, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(RequireAuthentication);
}
