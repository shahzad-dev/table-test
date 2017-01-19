import React, {Component} from 'react';
import Relay from 'react-relay';
import hobbyAddMutation from './hobbyAddMutation';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader} from 'material-ui/Card';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import InfoOutline from 'material-ui/svg-icons/action/info-outline';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';
import FontIcon from 'material-ui/FontIcon';
import DataTables from 'material-ui-datatables';

const styles = {
  container: {
    textAlign: 'center',
  },
  component: {
    margin: '60px 20px',
  }
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

const TABLE_COLUMNS = [
  {
    key: 'name',
    label: 'Dessert (100g serving)',
  }, {
    key: 'calories',
    label: 'Calories',
  }, {
    key: 'fat',
    label: 'Fat (g)',
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

const TABLE_COLUMNS_TOOLTIP = [
  {
    key: 'name',
    label: 'Dessert (100g serving)',
    tooltip: 'Dessert (100g serving)',
  }, {
    key: 'calories',
    label: 'Calories',
    tooltip: 'Calories',
  }, {
    key: 'fat',
    label: 'Fat (g)',
    tooltip: 'Fat (g)',
  }, {
    key: 'carbs',
    label: 'Carbs (g)',
    tooltip: 'Carbs (g)',
  }, {
    key: 'protein',
    label: 'Protein (g)',
    tooltip: 'Protein (g)',
  }, {
    key: 'sodium',
    label: 'Sodium (mg)',
    tooltip: 'Sodium (mg)',
  }, {
    key: 'calcium',
    label: 'Calcium (%)',
    tooltip: 'Calcium (%)',
  }, {
    key: 'iron',
    label: 'Iron (%)',
    tooltip: 'Iron (%)',
  },
];

const TABLE_COLUMNS_SORT_STYLE = [
  {
    key: 'name',
    label: 'Dessert (100g serving)',
    sortable: true,
    style: {
      width: 250,
    }
  }, {
    key: 'calories',
    label: 'Calories',
    sortable: true,
  }, {
    key: 'fat',
    label: 'Fat (g)',
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

const TABLE_DATA = [
  {
    name: 'Frozen yogurt',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Ice cream sandwich',
    calories: '160',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Eclair',
    calories: '157',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Cupcake',
    calories: '169',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Gingerbread',
    calories: '147',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Jelly bean',
    calories: '168',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Lollipop',
    calories: '158',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Honeycomb',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Donut',
    calories: '200',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'KitKat',
    calories: '145',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  },
];

const TABLE_DATA_NEXT = [
  {
    name: 'Marshmallow',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  },
];

const IconMenuSimple = () => (
  <div>
    <IconMenu
      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}
    >
      <MenuItem primaryText="Refresh" />
      <MenuItem primaryText="Send feedback" />
      <MenuItem primaryText="Settings" />
      <MenuItem primaryText="Help" />
      <MenuItem primaryText="Sign out" />
    </IconMenu>
  </div>
);


class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSortOrderChange = this.handleSortOrderChange.bind(this);
    this.handleFilterValueChange = this.handleFilterValueChange.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleCellDoubleClick = this.handleCellDoubleClick.bind(this);
    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handlePersonAddClick = this.handlePersonAddClick.bind(this);
    this.handleInfoClick = this.handleInfoClick.bind(this);

    this.state = {
      order: 'asc',
      orderBy: 'calories',
      data: TABLE_DATA,
      page: 1,
    };
  }

  handleSortOrderChange(orderBy, order) {
    console.log('orderBy:' + orderBy + ' order: ' + order);

    //const orderBy = key;
    /*let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
  }*/

    const data = this.state.data.sort(
      (a, b) => (
        order === 'desc' ? b[orderBy] > a[orderBy] : a[orderBy] > b[orderBy]
      ),
    );

    this.setState({ data, order, orderBy });
  }

  handleFilterValueChange(value) {
    console.log('filter value: ' + value);
  }

  handleCellClick(rowIndex, columnIndex, row, column) {
    console.log('rowIndex: ' + rowIndex + ' columnIndex: ' + columnIndex);
  }

  handleCellDoubleClick(rowIndex, columnIndex, row, column) {
    console.log('rowIndex: ' + rowIndex + ' columnIndex: ' + columnIndex);
  }

  handleRowSelection(selectedRows) {
    console.log('selectedRows: ' + selectedRows);
  }

  handlePreviousPageClick() {
    console.log('handlePreviousPageClick');
    this.setState({
      data: TABLE_DATA,
      page: 1,
    });
  }

  handleNextPageClick() {
    console.log('handleNextPageClick');
    this.setState({
      data: TABLE_DATA_NEXT,
      page: 2,
    });
  }

  handlePersonAddClick() {
    console.log('handlePersonAddClick');
  }

  handleInfoClick() {
    console.log('handleInfoClick');
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          {/*}<div style={styles.component}>
            <h2>DataTables (Basic)</h2>
            <Card style={{margin: 12, textAlign: 'left'}}>
              <CardHeader
                title='Nutrition'
                titleStyle={{fontSize: 20}}
              />
              <DataTables
                height={'auto'}
                selectable={false}
                showRowHover={false}
                columns={TABLE_COLUMNS}
                data={TABLE_DATA}
                showCheckboxes={false}
                count={100}
              />
            </Card>
          </div>
          <div style={styles.component}>
            <h2>DataTables (Selectable & Tooltip & Pagination)</h2>
            <Card style={{margin: 12, textAlign: 'left'}}>
              <CardHeader
                title='Nutrition'
                titleStyle={{fontSize: 20}}
              />
              <DataTables
                height={'auto'}
                selectable={true}
                showRowHover={true}
                columns={TABLE_COLUMNS_TOOLTIP}
                data={this.state.data}
                page={this.state.page}
                multiSelectable={true}
                onNextPageClick={this.handleNextPageClick}
                onPreviousPageClick={this.handlePreviousPageClick}
                onRowSelection={this.handleRowSelection}
                showCheckboxes={true}
                enableSelectAll={true}
                count={11}
              />
            </Card>
          </div>
          <div style={styles.component}>
            <h2>DataTables (Filter & Column Sort & Styled Column)</h2>
            <Card style={{margin: 12}}>
              <DataTables
                title={'Nutrition'}
                height={'auto'}
                selectable={false}
                showRowHover={true}
                columns={TABLE_COLUMNS_SORT_STYLE}
                data={TABLE_DATA}
                showCheckboxes={false}
                showHeaderToolbar={true}
                onCellClick={this.handleCellClick}
                onCellDoubleClick={this.handleCellDoubleClick}
                onFilterValueChange={this.handleFilterValueChange}
                onSortOrderChange={this.handleSortOrderChange}
                count={100}
              />
            </Card>
          </div>
          <div style={styles.component}>
            <h2>DataTables (Internationalization)</h2>
            <Card style={{margin: 12}}>
              <DataTables
                title={'ニュートリション'}
                height={'auto'}
                selectable={false}
                showRowHover={true}
                columns={TABLE_COLUMNS}
                data={TABLE_DATA}
                filterHintText={'検索'}
                rowSizeLabel={'ページサイズ'}
                summaryLabelTemplate={(start, end, count) => {return `${start} - ${end} ${count}件`}}
                showCheckboxes={false}
                showHeaderToolbar={true}
                count={100}
              />
            </Card>
        </div>*/}
          <div style={styles.component}>
            <h2>Table</h2>
            <Card style={{margin: 12}}>
              <DataTables
                title={'Nutrition'}
                height={'auto'}
                selectable={false}
                showRowHover={true}
                columns={TABLE_COLUMNS_SORT_STYLE}
                data={TABLE_DATA}
                showCheckboxes={false}
                showHeaderToolbar={true}
                onCellClick={this.handleCellClick}
                onCellDoubleClick={this.handleCellDoubleClick}
                onFilterValueChange={this.handleFilterValueChange}
                onSortOrderChange={this.handleSortOrderChange}
                page={1}
                count={100}
                toolbarIconRight={[
                  <IconButton
                      onClick={this.handlePersonAddClick}
                      tooltip="Add New">
                    <PersonAdd />
                  </IconButton>,
                  <IconButton
                      onClick={this.handlePersonAddClick}
                      tooltip="Filter">
                    <FontIcon className="fa fa-filter"/>
                  </IconButton>,
                  <IconButton
                      onClick={this.handlePersonAddClick}
                      tooltip="Export">
                    <FontIcon className="fa fa-share-square-o"/>
                  </IconButton>,
                  <IconButton
                        onClick={this.handleInfoClick}
                        tooltip="Settings">
                    <ActionSettings />
                  </IconButton>,
                  <IconMenuSimple />
                ]}
              />
            </Card>
          </div>
        </div>
      </MuiThemeProvider>
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
//export default App;
