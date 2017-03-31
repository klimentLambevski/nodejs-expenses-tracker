import AppBar from 'material-ui/AppBar';
import {FontIcon} from "material-ui";
import {connect} from "react-redux";

let Header = ({self}) => (
    <AppBar
        title={self && `${self.name} ${self.lastName}`}
        iconElementLeft={(<FontIcon
            className="muidocs-icon-action-home"
        />)}
    />
);

const mapStateToProps = (state) => ({
    self: state.common.self
});

Header = connect(mapStateToProps)(Header);

export {
    Header
}