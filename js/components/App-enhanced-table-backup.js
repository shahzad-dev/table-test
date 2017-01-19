import React from 'react';
import Relay from 'react-relay';
import hobbyAddMutation from './hobbyAddMutation';
import MuiDataTable from './data-table/mui-data-table';

const styles = {
  pageSelector: {
    display: "inline-block",
    width: 50,
    marginRight: 10
  },
};
const data = [
  { id: 1, name: 'Chikwa Eligson', age: 24, location: 'Lagos', level: 'stage-1', mood: 'happy' },
  { id: 2, name: 'Bamidele Johnson', age: 18, location: 'Anambra', level: 'stage-4', mood: 'anxious' },
  { id: 3, name: 'John Lee', age: 20, location: 'Abuja', level: 'stage-2', mood: 'indifferent' },
  { id: 4, name: 'Binta Pelumi', age: 22, location: 'Jos', level: 'stage-3', mood: 'sad' },
  { id: 5, name: 'Cassidy Ferangamo', age: 30, location: 'Lagos', level: 'stage-4', mood: 'angry' },
  { id: 6, name: 'Damian Swaggbag', age: 35, location: 'PortHarcourt', level: 'stage-1', mood: 'bitter' },
  { id: 7, name: 'Loveth Sweetstick', age: 20, location: 'Imo', level: 'stage-3', mood: 'happy' },
  { id: 8, name: 'Zzaz Zuzzi', age: 19, location: 'Bayelsa', level: 'stage-2', mood: 'party-mood' },
  { id: 9, name: 'Ian Sweetmouth', age: 18, location: 'Enugu', level: 'stage-4', mood: 'happy' },
  { id: 10, name: 'Elekun Bayo', age: 21, location: 'Zamfara', level: 'stage-4', mood: 'anxious' },
];

const config = {
  paginated: true,
  search: 'name',
  data: data,
  columns: [
    { property: 'id', title: 'S/N'},
    { property: 'name', title: 'Name' },
    { property: 'age', title: 'Age' },
    { property: 'location', title: 'Location' },
    { property: 'level', title: 'level' },
    { title: 'Mood', renderAs: function (data) {
      return `${data.name} is in a ${data.mood} mood.`;
    }},
  ]
};

class App extends React.Component {

    static contextTypes = {
      relay: Relay.PropTypes.Environment,
    }

    constructor( props, context ) {

      super( props, context )

      this.state = {
        count: 0,
      }
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
        <MuiDataTable config={config} />
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
