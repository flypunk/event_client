var EventBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    var data = [
      {fb_id: 1, name: "Pete Hunt"},
      {fb_id: 2, name: "Jordan Walke"}
    ];

    // return {data: []}
    return {data: data}
  },
  //componentDidMount: function() {
  //  this.loadCommentsFromServer();
  //  setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  //},
  render: function() {
    return (
      <div className="eventBox">
        <h1>Attendees</h1>
        <PersonList data={this.state.data} />
      </div>
    );
  }
});


var PersonList = React.createClass({
  render: function() {
    var personNodes = this.props.data.map(function(person) {
      return (
        <Person name={person.name} fb_id={person.fb_id} key={person.fb_id}>
        </Person >
      );
    });
      return (
        <div className="personList">
          {personNodes}
        </div>
    );
  }
});

var Person = React.createClass({
  render: function() {
    return (
      <div className="person">
        <h2 className="personName">
          {this.props.name}
        </h2>
        <h3 className="personID">
          {this.props.fb_id}
        </h3>
      </div>
    );
  }
});

ReactDOM.render(
  <EventBox />,
  document.getElementById('content')
)
