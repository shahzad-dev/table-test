
import React, {Component} from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import EditorMergeType from 'material-ui/svg-icons/editor/merge-type';
import ToggleStarBorder from 'material-ui/svg-icons/toggle/star-border';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';

export default class ToolbarForTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
    };
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <Toolbar style={this.props.toolbar.style}>
          <ToolbarTitle text={this.props.title} />
        <ToolbarGroup firstChild={true}>
        </ToolbarGroup>
        <ToolbarGroup>

          <IconButton touch={true} tooltip="Merge Info">
            <EditorMergeType />
          </IconButton>
          <IconButton touch={true} tooltip="Favorite">
            <ToggleStarBorder />
          </IconButton>
          <IconButton touch={true} tooltip="Send Email">
            <CommunicationEmail />
          </IconButton>
          <IconButton touch={true} tooltip="Edit Details">
            <EditorModeEdit />
          </IconButton>

          <ToolbarSeparator />

          <IconMenu
            iconButtonElement={
              <IconButton touch={true} tooltip="More">
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText="Add Relationship" />
            <MenuItem primaryText="Export List" />
            <MenuItem primaryText="Discard" />
          </IconMenu>

        </ToolbarGroup>
      </Toolbar>
    );
  }
}
