import React, {Component} from 'react';
import Relay from 'react-relay';
import addDataMutation from './AddDataMutation';
import SmartTable from './SmartTable';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deepOrange500} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

const TABLE_COLUMNS = [
  {
    key: 'name',
    label: 'Dessert (100g serving)',
    sortable: true,
    active: true,
    style: {
      width: 250,
    }
  }, {
    key: 'calories',
    label: 'Calories',
    sortable: true,
    active: true,
  }, {
    key: 'fat',
    label: 'Fat (g)',
    active: true,
  }, {
    key: 'carbs',
    label: 'Carbs (g)',
  }, {
    key: 'protein',
    label: 'Protein (g)',
  }, {
    key: 'sodium',
    label: 'Sodium (mg)',
  }, {
    key: 'calcium',
    label: 'Calcium (%)',
  }, {
    key: 'iron',
    label: 'Iron (%)',
  },
];

class App extends Component {
  static contextTypes = {
    relay: Relay.PropTypes.Environment,
  }
  constructor(props, context) {
    super(props, context);
    this.addDataHandle = this.addDataHandle.bind(this);
    this.handleListAction = this.handleListAction.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
    console.log(this.props);
    this.state = {
      data: this.props.Viewer.tableData.edges.map(edge => edge.node),
      columns: TABLE_COLUMNS
    };
  }
  componentWillReceiveProps(nextProps) {
      let data = nextProps.Viewer.tableData.edges.map(edge => edge.node);
      this.setState({
          data
        });
    }
  addDataHandle(values) {
      this.context.relay.commitUpdate(
        new addDataMutation( {
          ...values,
          Viewer: this.props.Viewer
        } )
      )
      /*this.setState({count: this.props.Viewer.hobbies.edges.length });*/
  }
  handleCellClick (rowIndex, columnIndex, row, column) {
      console.log("Cell Click", rowIndex, columnIndex, row, column);
  }
  handleListAction(action, items) {
      console.log(`${action}:`, items);
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <SmartTable
                columns={this.state.columns}
                orderBy="name"
                order="asc"
                data={this.state.data}
                addDataHandle={this.addDataHandle}
                handleListAction={this.handleListAction}
                handleCellClick={this.handleCellClick}
            />
      </MuiThemeProvider>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on User {
        tableData(first: 100) {
          edges {
            node {
                id,
                name,
                calories,
                fat,
                carbs,
                protein,
                sodium,
                calcium,
                iron
            },
          },
        },
         ${addDataMutation.getFragment('Viewer')},
      }
    `,
  },
});
//export default App;
