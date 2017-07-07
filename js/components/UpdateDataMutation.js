/* @flow weak */

import Relay from 'react-relay'


export default class addDataMutation extends Relay.Mutation {
  static fragments = {
    Viewer: () => Relay.QL `
      fragment on User {
        id,
      }
    `,
  }
  getMutation() {
    return Relay.QL `mutation{insertData}`
  }
  getFatQuery() {
    return Relay.QL `
      fragment on InsertDataPayload {
        DataEdge,
        Viewer {
            tableData
        },
      }
    `
  }
  getConfigs() {
    return [ {
      type: 'RANGE_ADD',
      parentName: 'Viewer',
      parentID: this.props.Viewer.id,
      connectionName: 'TableDataConnection',
      edgeName: 'DataEdge',
      rangeBehaviors: {
          '': 'append',
        },
    } ]
  }
  getVariables() {
    return {
      id: this.props.id,
      name: this.props.name,
    }
  }
  getOptimisticResponse() {
    return {
      // FIXME: ToDo_TotalCount gets updated optimistically, but this edge does not
      // get added until the server responds
      DataEdge: {
        node: {
          id: this.props.id,
          name: this.props.name,
        },
      },
      Viewer: {
        id: this.props.Viewer.id,
      },
    }
  }
}
