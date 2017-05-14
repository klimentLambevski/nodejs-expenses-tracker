import React from "react";
import renderer from 'react-test-renderer';
import {ConfirmModal} from "./confirm-modal";
import {MuiThemeProvider} from "material-ui";
import {getMuiTheme} from "material-ui/styles/index";

test('Modal opens when clicked', () => {

    const muiTheme = getMuiTheme();

    const component = renderer.create(

        <ConfirmModal modalOpen={false} message="Test confirm modal"/>,
        {
            context: {muiTheme},
            childContextTypes: {muiTheme: React.PropTypes.object}
        }

    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // manually trigger the callback
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

});