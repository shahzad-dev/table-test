import React, { Component, PropTypes } from 'react';
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';

export default class EnhancedTableHead extends Component {
  static propTypes = {
    onRequestSort: PropTypes.func,
    onSelectAllClick: PropTypes.func,
    order: PropTypes.string,
    orderBy: PropTypes.string,
    columnData: PropTypes.object
  };

  createSortHandler = (property) => {
    return (event) => this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell checkbox>
            <Checkbox onChange={this.props.onSelectAllClick} />
          </TableCell>

          {this.props.columnData.map((column) => {
            return (
              <TableCell key={column.id} numeric={column.numeric} padding={column.padding}>
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={order}
                  onClick={this.createSortHandler(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}
