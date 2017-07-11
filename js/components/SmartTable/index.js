
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
};

Object.filter = (obj, predicate) =>
  Object.keys(obj)
        .filter( key => predicate(obj[key]) )
        .reduce( (res, key) => Object.assign(res, { [key]: obj[key] }), {} );
const filterByStatus = (item) => {
      return item.active || false;
 }
const sortByColumn = (orderCol, orderDir) => {
    return (a, b) => {
        a = a[orderCol].toLowerCase(); // ignore upper and lowercase
        b = b[orderCol].toLowerCase(); // ignore upper and lowercase
        return (a==b ? 0 : a < b? -1 : 1) * (orderDir === 'desc' ? -1 : 1);
    }
};

export class IconMenuSimple extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    _handleClick = (value, event) => {
        this.props.handleMenuEvent(value);
    };

  render() {
      return(
              <div>
                <IconMenu
                  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                  anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                  value={this.state.value}
                  onChange={this._handleChange}
                >
                  <MenuItem primaryText="Import" onTouchTap={this._handleClick.bind(this, "import")} />
                  <MenuItem primaryText="Export" onTouchTap={this._handleClick.bind(this, "export")} />
                  <MenuItem primaryText="Print" onTouchTap={this._handleClick.bind(this, "print")} />
                  <MenuItem primaryText="Help" onTouchTap={this._handleClick.bind(this, "help")} />
                </IconMenu>
            </div>
        )
    }
}

export default class SmartTable extends Component {
  constructor(props, context) {
    super(props, context);
    this._handleSortOrderChange = this._handleSortOrderChange.bind(this);
    this._handleFilterValueChange = this._handleFilterValueChange.bind(this);
    this._handleCellClick = this._handleCellClick.bind(this);
    this._handleCellDoubleClick = this._handleCellDoubleClick.bind(this);
    this._handleRowSelection = this._handleRowSelection.bind(this);
    this._handlePreviousPageClick = this._handlePreviousPageClick.bind(this);
    this._handleNextPageClick = this._handleNextPageClick.bind(this);
    this._handleDataAddClick = this._handleDataAddClick.bind(this);
    this._handleInfoClick = this._handleInfoClick.bind(this);

    let { data, orderBy, order } = this.props;
    this.state = {
      order: order,
      orderBy: orderBy,
      rowSize: 10,
      page: 1,
      data: data,
      filterData: data,
      filterInputs: [],
      page: 1,
      selectedItemsToolbar: false,
      totalSelectedTitle: `List`,
      availableCols: this.props.columns,
      activeTableCols: this.props.columns.filter(filterByStatus),
      selectedRows: [],
    };
  }
  componentWillReceiveProps(nextProps) {
      let { data, orderBy,  order} = nextProps;
      data = data.sort(sortByColumn(orderBy, order));
      this.setState({
          data,
          filterData: data,
        });
    }
  _handleSortOrderChange(orderBy, order) {
    //Reset all the rows and checkboxes before table sorted
    this.refs.dataTable.handleSetSelectedRows([]);

    const filterData = this.state.filterData.sort(sortByColumn(orderBy, order));
    this.setState({ filterData, order, orderBy });
  }

  _handleCellClick(rowIndex, columnIndex, row, column) {
    if( this.props.handleCellClick ) {
        this.props.handleCellClick(rowIndex, columnIndex, row, column);
    }
  }

  _handleCellDoubleClick(rowIndex, columnIndex, row, column) {
    if( this.props.handleCellDoubleClick ) {
        this.props.handleCellDoubleClick(rowIndex, columnIndex, row, column);
    }
  }

  _handleRowSelection(selectedRows) {
    //console.log('Row Selection - selectedRows: ', selectedRows, ' Length', selectedRows.length);
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
    selectedRows = selectedRows.map((e, key) => this.state.filterData[key] );
    this.setState({selectedRows,
                   selectedItemsToolbar,
                   totalSelectedTitle
                });
  }

  _handlePreviousPageClick() {
    this.setState({
      page: this.state.page > 1 ? this.state.page - 1 : 1,
    });
  }

  _handleNextPageClick() {
    this.setState({
      page: this.state.page + 1,
    });
  }

  _handleDataAddClick() {
    const totalRows = this.state.data.length;
    this.props.addDataHandle({
        id: `${totalRows + 1}`,
        name: "Blah" + (totalRows + 1),
    });
  }

  _handleInfoClick() {
    console.log('handleInfoClick');
  }

  _handleColumnStatus(availableCols) {
    this.setState({availableCols, activeTableCols: availableCols.filter(filterByStatus.bind(this))});
  }

  //****** FILTER BY COLUMN *****

  filterByItem(item, col){
      if( ! item[col.key] ) return false;
      return (col.search ? item[col.key].toLowerCase().includes(col.search.toLowerCase()) : true );
  }

  filterByCols(columns, item){
      let result = columns.filter(this.filterByItem.bind(this, item));
      return columns.length === result.length;
  }

  _handleColumnFilter(availableCols) {
      let filterData = this.state.data.filter(this.filterByCols.bind(this, availableCols));
      this.setState({ availableCols, filterData });
  }

  //****** SEARCH *****

  searchCols(text, data){
      let filtered = Object.filter(data, value => {
        return value ? value.toLowerCase().includes(text.toLowerCase()) : false;
      });
      return Object.keys(filtered).length || false;
  }

  _handleFilterValueChange(value) {
      let filterData = this.state.data.filter(this.searchCols.bind(this, value));
      this.setState({ filterData });
  }

  //******* Selected Items Action *******
  _handleSelectedItems(action, evt) {
      this.props.handleListAction(action, this.state.selectedRows);
  }
  _handleMenuEvent(action) {
      this.props.handleListAction( action, this.state.filterData );
  }
  render() {

    //let headerToolbar;

    let headerToolbar = [
        <FilterDrawer
                    fields={this.state.availableCols}
                    handleColumnFilter={this._handleColumnFilter.bind(this)}/>,
        <SettingsDialog
                    columns={this.state.availableCols}
                    handleColumnStatus={this._handleColumnStatus.bind(this)}/>,
        <IconMenuSimple handleMenuEvent={this._handleMenuEvent.bind(this)} />
    ]

    if (this.state.selectedItemsToolbar) {
        headerToolbar =  [
            <IconButton touch={true}
                        onClick={this._handleSelectedItems.bind(this, "merge")}
                        tooltip="Merge Info">
              <EditorMergeType />
            </IconButton>,
            <IconButton touch={true}
                        onClick={this._handleSelectedItems.bind(this, "favorite")}
                        tooltip="Favorite">
              <ToggleStarBorder />
            </IconButton>,
            <IconButton touch={true}
                        onClick={this._handleSelectedItems.bind(this, "email")}
                        tooltip="Send Email">
              <CommunicationEmail />
            </IconButton>,
            <IconButton touch={true}
                        onClick={this._handleSelectedItems.bind(this, "edit")}
                        tooltip="Edit Details">
              <EditorModeEdit />
            </IconButton>,
            <IconMenu
              iconButtonElement={
                <IconButton touch={true} tooltip="More">
                  <NavigationExpandMoreIcon />
                </IconButton>
              }
            >
              <MenuItem primaryText="Add Relationship"
                        onClick={this._handleSelectedItems.bind(this, "relations")} />
              <MenuItem primaryText="Export List"
                        onClick={this._handleSelectedItems.bind(this, "export")} />
              <MenuItem primaryText="Discard"
                        onClick={this._handleSelectedItems.bind(this, "discard")} />
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
                rowSizeList={[10,25,50,100,250,500]}
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
                onCellClick={this._handleCellClick}
                onCellDoubleClick={this._handleCellDoubleClick}
                onFilterValueChange={this._handleFilterValueChange}
                onSortOrderChange={this._handleSortOrderChange}
                onNextPageClick={this._handleNextPageClick}
                onPreviousPageClick={this._handlePreviousPageClick}
                onRowSelection={this._handleRowSelection}
                onPageNoChange={(index, value)=>{ this.setState({page: value}) }}
                onRowSizeChange={(index, value)=>{ this.setState({rowSize: value, page: 1}) }}
                onRowHover={(...args)=>{console.log("Row Hover", args)}}
                onCellHover={(...args)=>{console.log("Cell Hover", args)}}
                toolbarIconRight={headerToolbar}
                ref="dataTable"
              />
            </Card>
            <FloatingActionButton
                onClick={this._handleDataAddClick}
                style={{position: "fixed", bottom: 10, right: 15}}
                >
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </div>
    );
  }
}
