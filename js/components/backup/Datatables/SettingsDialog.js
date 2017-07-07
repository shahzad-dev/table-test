import React from 'react';
import Dialog from 'material-ui/Dialog';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class SettingsDialog extends React.Component {
  state = {
    open: false,
    list: this.props.columns,
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  handleSave = () => {
    this.props.handleColumnStatus(this.state.list);
    this.setState({open: false});
  }

  handleClose = () => {
    this.setState({open: false});
  }
  handleToggle = (e, toggled) => {
     //
     let index = e.target.getAttribute('data-toggleKey');
     let { list } = this.state;
     list[index].active = toggled;
     this.setState({list});
  }
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Save"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSave}
      />,
    ];

    return (
      <div>
        <IconButton
              onClick={this.handleOpen}
              tooltip="Settings">
          <ActionSettings />
        </IconButton>
        <Dialog
          title="Select the columns you want to display in this list"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <Divider />
            <List>
              <Subheader>Active Columns</Subheader>
              <Divider />
              { this.state.list.map((data, index) =>
                   <ListItem
                       primaryText={data.label}
                       rightToggle={<Toggle defaultToggled={data.active}
                                            data-toggleKey={index}
                                            onToggle={this.handleToggle.bind(this)}
                                        />}
                       key={data.key} />
              ) }
            </List>
        </Dialog>
      </div>
    );
  }
}
