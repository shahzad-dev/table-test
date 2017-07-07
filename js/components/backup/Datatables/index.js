
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardHeader} from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentAdd from 'material-ui/svg-icons/content/add';
import InfoOutline from 'material-ui/svg-icons/action/info-outline';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';
import EditorMergeType from 'material-ui/svg-icons/editor/merge-type';
import ToggleStarBorder from 'material-ui/svg-icons/toggle/star-border';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import DataTables from './DataTables';
import FilterDrawer from './FilterDrawer';
import SettingsDialog from './SettingsDialog';

/**
TODO
2 - Filter Validation & Types like date and numeric
3 - Other functions like export
4 - Replace hardcoded data with dynamic or relay data
**/

const styles = {
    container: {
        /*textAlign: 'center',*/
    },
    component: {
        margin: '60px 20px',
    },
    customWidth: {
        width: 200,
    },
};

const IconMenuSimple = () => (
  <div>
    <IconMenu
      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}
    >
      <MenuItem primaryText="Import" />
      <MenuItem primaryText="Export" />
      <MenuItem primaryText="Help" />
    </IconMenu>
  </div>
);

Object.filter = (obj, predicate) =>
  Object.keys(obj)
        .filter( key => predicate(obj[key]) )
        .reduce( (res, key) => Object.assign(res, { [key]: obj[key] }), {} );

export class ItemsSelectMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 1};
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
      return (
            <DropDownMenu
                  value={this.state.value}
                  onChange={this.handleChange}
                  style={styles.customWidth}
                  autoWidth={false}
                >
              <MenuItem value={1} primaryText="5 selected" />
              <MenuItem value={2} primaryText="Every Night" />
              <MenuItem value={3} primaryText="Weeknights" />
              <MenuItem value={4} primaryText="Weekends" />
              <MenuItem value={5} primaryText="Weekly" />
            </DropDownMenu>
        );
    }
}

const filterByStatus = (item) => {
      return item.active || false;
 }

export default class SmartTable extends Component {
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
      rowSize: 4,
      page: 1,
      data: this.props.data,
      filterData: this.props.data,
      filterInputs: [],
      page: 1,
      selectedItemsToolbar: false,
      totalSelectedTitle: `List`,
      availableCols: this.props.columns,
      activeTableCols: this.props.columns.filter(filterByStatus),
      selectedRows: [],
    };
  }

  handleSortOrderChange(orderBy, order) {
    //console.log('orderBy:' + orderBy + ' order: ' + order);

    //const orderBy = key;
    /*let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
  }*/

    const filterData = this.state.filterData.sort(
      (a, b) => (
        order === 'desc' ? b[orderBy] > a[orderBy] : a[orderBy] > b[orderBy]
      ),
    );

    this.setState({ filterData, order, orderBy });
  }

  handleCellClick(rowIndex, columnIndex, row, column) {
    console.log('Cell - rowIndex: ' + rowIndex + ' columnIndex: ' + columnIndex);
  }

  handleCellDoubleClick(rowIndex, columnIndex, row, column) {
    console.log('Cell Double - rowIndex: ' + rowIndex + ' columnIndex: ' + columnIndex);
  }

  handleRowSelection(selectedRows) {
    console.log('Row Selection - selectedRows: ', selectedRows, ' Length', selectedRows.length);

    let selectedItemsToolbar = false;
    let totalSelectedTitle = "List";

    if(selectedRows === "all") {
        selectedRows = this.state.data;
    } else if( selectedRows === "none") {
        selectedRows = [];
    }

    if (selectedRows.length > 0 ) {
        selectedItemsToolbar = true;
        totalSelectedTitle = `${selectedRows.length} ${selectedRows.length > 1 ? 'items' : 'item'} selected`;
    }

    this.setState({selectedRows,
                   selectedItemsToolbar,
                   totalSelectedTitle
                });
  }

  handlePreviousPageClick() {
    this.setState({
      page: this.state.page > 1 ? this.state.page - 1 : 1,
    });
  }

  handleNextPageClick() {
    this.setState({
      page: this.state.page + 1,
    });
  }

  handlePersonAddClick() {
    console.log('handlePersonAddClick');
  }

  handleInfoClick() {
    console.log('handleInfoClick');
  }

  handleColumnStatus(availableCols) {
    this.setState({availableCols, activeTableCols: availableCols.filter(filterByStatus.bind(this))});
  }

  //****** FILTER BY COLUMN *****

  filterByItem(item, col){
      return (col.search ? item[col.key].toLowerCase().includes(col.search.toLowerCase()) : true );
  }

  filterByCols(columns, item){
      let result = columns.filter(this.filterByItem.bind(this, item));
      return columns.length === result.length;
  }

  handleColumnFilter(availableCols) {
      let filterData = this.state.data.filter(this.filterByCols.bind(this, availableCols));
      this.setState({ availableCols, filterData });
  }

  //****** SEARCH *****

  searchCols(text, data){
      let filtered = Object.filter(data, value => value.toLowerCase().includes(text.toLowerCase()) );
      return Object.keys(filtered).length || false;
  }

  handleFilterValueChange(value) {
      let filterData = this.state.data.filter(this.searchCols.bind(this, value));
      this.setState({ filterData });
  }

  render() {

    //let headerToolbar;
    let headerToolbar = [
        <FilterDrawer
                    fields={this.state.availableCols}
                    handleColumnFilter={this.handleColumnFilter.bind(this)}/>,
        <SettingsDialog
                    columns={this.state.availableCols}
                    handleColumnStatus={this.handleColumnStatus.bind(this)}/>,
        <IconMenuSimple />
    ]

    if (this.state.selectedItemsToolbar) {
        headerToolbar =  [
            <IconButton touch={true} tooltip="Merge Info">
              <EditorMergeType />
            </IconButton>,
            <IconButton touch={true} tooltip="Favorite">
              <ToggleStarBorder />
            </IconButton>,
            <IconButton touch={true} tooltip="Send Email">
              <CommunicationEmail />
            </IconButton>,
            <IconButton touch={true} tooltip="Edit Details">
              <EditorModeEdit />
            </IconButton>,
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
            </IconMenu>,
        ]
      }

    return (
        <div style={styles.container}>
          <div style={styles.component}>
            <h2>Table</h2>
            <Card style={{margin: 12}}>
              <DataTables
                title={this.state.totalSelectedTitle}
                rowSizeLabel={'Rows per page'}
                height={'auto'}
                totalPages={Math.round(this.state.filterData.length / this.state.rowSize)}
                pageLabel={'Page No'}
                page={this.state.page}
                rowSizeList={[2,4,10,12]}
                rowSize={this.state.rowSize}
                columns={this.state.activeTableCols}
                data={this.state.filterData.slice( (
                    this.state.page - 1) * this.state.rowSize,
                    this.state.page * this.state.rowSize
                )}
                count={this.state.filterData.length}
                showCheckboxes={true}
                selectable={true}
                showRowHover={true}
                multiSelectable={true}
                enableSelectAll={true}
                showHeaderToolbar={true}
                onCellClick={this.handleCellClick}
                onCellDoubleClick={this.handleCellDoubleClick}
                onFilterValueChange={this.handleFilterValueChange}
                onSortOrderChange={this.handleSortOrderChange}
                onNextPageClick={this.handleNextPageClick}
                onPreviousPageClick={this.handlePreviousPageClick}
                onRowSelection={this.handleRowSelection}
                onPageNoChange={(index, value)=>{ this.setState({page: value}) }}
                onRowSizeChange={(index, value)=>{ this.setState({rowSize: value, page: 1}) }}
                onRowHover={(...args)=>{console.log("Row Hover", args)}}
                onCellHover={(...args)=>{console.log("Cell Hover", args)}}
                toolbarIconRight={headerToolbar}
              />
            </Card>
            <FloatingActionButton
                style={{position: "fixed", bottom: 10, right: 15}}>
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </div>
    );
  }
}
