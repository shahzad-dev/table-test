import React from 'react';
import Relay from 'react-relay';
import hobbyAddMutation from './hobbyAddMutation';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionNavigateBefore from 'material-ui/svg-icons/image/navigate-before';
import ActionNavigateNext from 'material-ui/svg-icons/image/navigate-next';

const styles = {
  pageSelector: {
    display: "inline-block",
    width: 50,
    marginRight: 10
  },
};

class App extends React.Component {

    static contextTypes = {
      relay: Relay.PropTypes.Environment,
    }

    constructor( props, context ) {

      super( props, context )

      this.state = {
        count: 0,
        itemsPerPage: 5,
        pageNo: 1
      }
    }
_handle_ItemPerPageChange = ( event ) => {
}
_handle_PageNumberChange = ( event ) => {
}
_handle_OnChange = ( event ) => {
    //this.setState({count: this.state.count + 1});
    console.log(this.props.viewer.hobbies.edges.length);
    this.context.relay.commitUpdate(
        new hobbyAddMutation( {
          id: `${this.props.viewer.hobbies.edges.length + 1}`,
          title: `blah`, // ${this.state.count}`,
          Viewer: this.props.viewer
        } )
      )
    this.setState({count: this.props.viewer.hobbies.edges.length });
 }
  render() {
    return (
    <div>
      <Card>
        <CardHeader
          title={`List (Total: ${this.state.count})`}
        />
        <CardText>
            <Table
                multiSelectable={true}
                selectable={true}
                >
              <TableHeader
                  displaySelectAll={true}
                  enableSelectAll={true}
                  >
                    <TableRow>
                        <TableHeaderColumn>ID</TableHeaderColumn>
                        <TableHeaderColumn>Title</TableHeaderColumn>
                    </TableRow>
                </TableHeader>>
                <TableBody>
                  {this.props.viewer.hobbies.edges.map((edge, i) =>

                    <TableRow key={i}>
                        <TableRowColumn>{i}</TableRowColumn>
                        <TableRowColumn>{edge.node.title}</TableRowColumn>
                    </TableRow>
                  )}
                </TableBody>
            </Table>
        </CardText>
        <CardActions>
          <span>
              Page:
              <SelectField
                  value={this.state.itemsPerPage}
                  onChange={this._handle_ItemPerPageChange}
                   style={styles.pageSelector}
                  >
              <MenuItem value={1} primaryText="5" />
              <MenuItem value={2} primaryText="10" />
              <MenuItem value={3} primaryText="15" />
              <MenuItem value={4} primaryText="25" />
              <MenuItem value={5} primaryText="50" />
            </SelectField>
          </span>
          <span>
              Rows per page:
              <SelectField
                  value={this.state.itemsPerPage}
                  onChange={this._handle_ItemPerPageChange}
                  style={styles.pageSelector}
                  >
              <MenuItem value={1} primaryText="5" />
              <MenuItem value={2} primaryText="10" />
              <MenuItem value={3} primaryText="15" />
              <MenuItem value={4} primaryText="25" />
              <MenuItem value={5} primaryText="50" />
            </SelectField>
          </span>
          <span>
          </span>
          <FlatButton icon={<ActionNavigateBefore />} style={{width:15}}/>
          <FlatButton icon={<ActionNavigateNext />} style={{width:15}}/>
        </CardActions>
      </Card>
      <FloatingActionButton mini={true} style={{"float":"right"}} onClick={this._handle_OnChange}>
          <ContentAdd />
      </FloatingActionButton>
  </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        hobbies(first: 100) {
          edges {
            node {
              title,
            },
          },
        },
        ${hobbyAddMutation.getFragment('Viewer')},
      }
    `,
  },
});
