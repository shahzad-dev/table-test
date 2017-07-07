import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import NavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

export default class FilterDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleNestedListToggle = (item) => {
   this.setState({
     open: item.state.open,
   });
 };

  handleClose = () => this.setState({open: false});

  render() {
    return (
    <div>
        <IconButton
            onClick={this.handleToggle}
            tooltip="Filter">
          <FontIcon className="fa fa-filter"/>
        </IconButton>
        <Drawer
          docked={false}
          width={300}
          open={this.state.open}
          openSecondary={true}
          onRequestChange={(open) => this.setState({open})}
        >
        <div>
          {/*<AppBar title="AppBar" />
          <MenuItem onTouchTap={this.handleClose}>Menu Item</MenuItem>
          <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
          */}
          <List>
              <ListItem
                primaryText="Filter Results"
                rightIconButton={<IconButton
                                        tooltip="Cancel Filter"
                                        onClick={this.handleClose.bind(this)}>
                                    <NavigationArrowForward />
                                </IconButton>}
              />
          </List>
            <Divider />
          <List style={{padding:0}}>
              <Subheader>Nested List Items</Subheader>
              <ListItem
                key={1}
                disabled={true}
              ><div><TextField
                  hintText="Hint Text"
              /><br/>
                <SelectField
                      floatingLabelText="Frequency"
                      value={this.state.value}
                      onChange={this.handleChange}
                    >
                      <MenuItem value={1} primaryText="Never" />
                      <MenuItem value={2} primaryText="Every Night" />
                      <MenuItem value={3} primaryText="Weeknights" />
                      <MenuItem value={4} primaryText="Weekends" />
                      <MenuItem value={5} primaryText="Weekly" />
                    </SelectField>
                    </div>
                </ListItem>
                <ListItem
                  primaryText="Inbox"
                  primaryTogglesNestedList={true}
                  nestedItems={[
                        <ListItem key={1} disabled={true}>
                            <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
                                <RadioButton
                                  value="light"
                                  label="Potential Customer"
                                  style={styles.radioButton}
                                  key={1}
                                />
                                <RadioButton
                                  value="not_light"
                                  label="Confirm Customer"
                                  style={styles.radioButton}
                                  key={2}
                                />
                            </RadioButtonGroup>
                            </ListItem>,
                  ]}
                />
            </List>
                <Divider />
            <List>
                <Subheader>Priority Interruptions</Subheader>
                <ListItem primaryText="Events and reminders" rightToggle={<Toggle />} />
                <ListItem primaryText="Calls" rightToggle={<Toggle />} />
                <ListItem primaryText="Messages" rightToggle={<Toggle />} />
            </List>
              <Divider />
            <List>
                <Subheader>Hangout Notifications</Subheader>
                <ListItem primaryText="Notifications" leftCheckbox={<Checkbox />} />
                <ListItem primaryText="Sounds" leftCheckbox={<Checkbox />} />
                <ListItem primaryText="Video sounds" leftCheckbox={<Checkbox />} />
            </List>
        </div>
         {/* <div>
              <RaisedButton
                  label="Cancel"
                  onTouchTap={this.handleToggle}
              />&nbsp;&nbsp;
              <RaisedButton
                  label="Save"
                  onTouchTap={this.handleToggle}
                />
            </div> */}
        </Drawer>
    </div>
    );
  }
}
