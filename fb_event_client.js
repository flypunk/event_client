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
      {id: 1, name: "Pete Hunt"},
      {id: 2, name: "Jordan Walke"}
    ];

    // return {data: []}
    return {data: data}
  },
  componentDidMount: function() {
    function statusChangeCallback(response) {
      // console.log('statusChangeCallback');
      // console.log(response);
      // The response object is returned with a status field that lets the
      // app know the current login status of the person.
      // Full docs on the response object can be found in the documentation
      // for FB.getLoginStatus().
      if (response.status === 'connected') {
        // Logged into your app and Facebook.
        //testAPI();
        getEvent(308852546147336);
      } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        document.getElementById('status').innerHTML = 'Please log ' +
          'into this app.';
      } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        document.getElementById('status').innerHTML = 'Please log ' +
          'into Facebook.';
      }
    };

    function checkLoginState() {
      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });
    ;}

    function getEvent(event_id) {
      FB.api('/' + event_id + '/attending', function(response) {
      console.log(response.data);
      //console.log(response.paging);
      //document.getElementById('event').innerHTML =
      //  'Thanks for visiting  ' + response.data;
      });
    }
 
    window.fbAsyncInit = function() {
    FB.init({
      appId      : '1466405190316893',
      cookie     : true,  // enable cookies to allow the server to access 
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.8' // use graph api version 2.5
    });
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
    };
    
    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  //  this.loadCommentsFromServer();
  //  setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
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
        <Person name={person.name} id={person.id} key={person.id}>
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
          {this.props.id}
        </h3>
      </div>
    );
  }
});

ReactDOM.render(
  <div className="wrapper-div">
    <div className="fb-login-button" data-max-row="5"
       data-size="large" 
       data-show-faces="false" 
       data-auto-logout-link="false" 
       href="javascript:void(0)">Login
    </div> 
    <EventBox />
  </div>,
  document.getElementById('content')
)
