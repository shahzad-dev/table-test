import React from 'react';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {List, ListItem} from 'material-ui/List';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
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
    this.state = {
                    open: false,
                    fields: this.props.fields,
                };
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleNestedListToggle = (item) => {
   this.setState({
     open: item.state.open,
   });
 };
 handleFieldChange = (e, value) => {
     let { name } = e.target;
     let index = e.target.getAttribute("data-fieldKey");
     let fields = this.state.fields;
     fields[index].search = value;
     this.setState({fields});
    // let fieldName = event.target.getAttribute('name');
     //console.log("Field Index", index, "Value", value);
 }

  handleClose = () => {
      //console.log(this.state.fields);
      this.props.handleColumnFilter(this.state.fields);
      this.setState({open: false});
  }
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
          onRequestChange={this.handleClose.bind(this)}
        >
        <Formsy.Form>
          <List>
              <ListItem
                primaryText="Filter Results"
                disabled={true}
                rightIconButton={<IconButton
                                        tooltip="Cancel Filter"
                                        onClick={this.handleClose.bind(this)}>
                                    <NavigationArrowForward />
                                </IconButton>}
              />
          </List>
            <Divider />
          <List style={{padding:0}}>
              {this.state.fields.map((field, index) =>
                          <ListItem key={index} disabled={true} style={{padding:"0px 16px"}}>
                            <FormsyText
                                    name={field.key}
                                    data-fieldKey={index}
                                    hintText={field.label}
                                    onChange={this.handleFieldChange}
                                />
                          </ListItem>
                    )
                }
            </List>
            </Formsy.Form>
        </Drawer>
    </div>
    );
  }
}
