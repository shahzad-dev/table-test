/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import {
  // Import methods that your schema can use to interact with your database
  User,
  getUser,
  getViewer,
  TableData,
  getData,
  getTableData,
  setData,
} from './database';

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'User') {
      return getUser(id);
  } else if (type === 'TableData') {
      return getData(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof User) {
      return userType;
  } else if (obj instanceof TableData)  {
      return tableDataType;
    } else {
      return null;
    }
  }
);

/**
*  Types
*/

var tableDataType = new GraphQLObjectType({
  name: 'TableData',
  description: 'A table data',
  fields: () => ({
    id: globalIdField('TableData'),
    name: {
      type: GraphQLString,
      description: 'Name',
    },
    calories: {
      type: GraphQLString,
      description: 'calories',
    },
    fat: {
      type: GraphQLString,
      description: 'fat',
    },
    carbs: {
      type: GraphQLString,
      description: 'carbs',
    },
    protein: {
      type: GraphQLString,
      description: 'protein',
    },
    sodium: {
      type: GraphQLString,
      description: 'sodium',
    },
    calcium: {
      type: GraphQLString,
      description: 'calcium',
    },
    iron: {
      type: GraphQLString,
      description: 'iron',
    },
  }),
  interfaces: [nodeInterface],
});


/**
 * Define your own connection types here
 */

var {connectionType: tableDataConnection} =
  connectionDefinitions({name: 'TableData', nodeType: tableDataType});


var userType = new GraphQLObjectType({
  name: 'User',
  description: 'A person who uses our app',
  fields: () => ({
    id: globalIdField('User'),
    tableData: {
      type: tableDataConnection,
      description: 'A collection of Table Data',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getTableData(), args),
    },
    /*hobbies: {
        type: hobbyConnection,
        description: 'A person\'s hobbies',
        args: {
          status: {
            type: GraphQLString,
            defaultValue: 'any',
          },
          ...connectionArgs,
        },
        resolve: (obj,
            {status, ...args},
            context,
            {rootValue: objectManager}
          ) => {
              //console.log( "Root", obj, "Status", status, "Args", args, "Context", context);
              return connectionFromArray(
                  faction.hobbies.map((hobby) => hobby),
                  args
              )
            },
      }*/
  }),
  interfaces: [nodeInterface],
});


/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    // Add your own root fields here
    Viewer: {
      type: userType,
      resolve: () => getViewer(),
    },
  }),
});

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */

 /**
 * This will return a GraphQLFieldConfig for our ship
 * mutation.
 *
 * It creates these two types implicitly:
 *   input IntroduceShipInput {
 *     clientMutationId: string
 *     shipName: string!
 *     factionId: ID!
 *   }
 *
 *   type IntroduceShipPayload {
 *     clientMutationId: string
 *     ship: Ship
 *     faction: Faction
 *   }
 */
const addDataMutation = mutationWithClientMutationId({
  name: 'InsertData',
  inputFields: {
    id: {
        type: new GraphQLNonNull(GraphQLInt)
    },
    name: {
      type: GraphQLString,
      description: 'Name',
    },
    calories: {
      type: GraphQLString,
      description: 'calories',
    },
    fat: {
      type: GraphQLString,
      description: 'fat',
    },
    carbs: {
      type: GraphQLString,
      description: 'carbs',
    },
    protein: {
      type: GraphQLString,
      description: 'protein',
    },
    sodium: {
      type: GraphQLString,
      description: 'sodium',
    },
    calcium: {
      type: GraphQLString,
      description: 'calcium',
    },
    iron: {
      type: GraphQLString,
      description: 'iron',
    },
  },
  outputFields: {
    DataEdge: {
      type: tableDataType,
      resolve: ({dataId}) => {
        var data = getData(payload.dataId);
        return {
          cursor: cursorForObjectInConnection(getTableData(), data),
          node: data,
        };
      },
    },
    Viewer: {
      type: userType,
      resolve: () => getUser('1') //VERY IMPORTANT OTHERWISE FRONTEND Component WILL NOT REFRESH
    }
  },
  mutateAndGetPayload: (args) => {
    return setData(args);
  }
});

var mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    insertData: addDataMutation,
  })
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export var Schema = new GraphQLSchema({
  query: queryType,
  // Uncomment the following after adding some mutation fields:
  mutation: mutationType
});
