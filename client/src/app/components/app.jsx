import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import {isAuthenticated} from '../store/auth/auth.actions';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    // this.props.actions.isAuthenticated()
    //   .then(() => {
    //     this.setState({isLoading: false})
    //   });
  }

  //TODO add spinner or something...
  render() {
    return (
      <section className="app">
        {this.props.children}
      </section>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    // actions: bindActionCreators({isAuthenticated}, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
