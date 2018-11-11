import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AuthScreen extends Component {
  componentDidMount() {
    this.props.facebookLogin();
    
    // This line will never be executed. But is present only for safety. The next, WillRecieveProps
    // Is the one that will execute always. Stephen just placed for some futureproofing I dont understad.
    this.onAuthComplete(this.props);
  }


  //This will be called when Facebook login succeeds first time.
  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete(props) {
    if (props.token) {
      this.props.navigation.navigate('map');
    }
  }

  render() {
    return (
      <View />
    );
  }
}

//As per Mac's course this is, state.auth.token. Stephen has destructered it.
// I prefer Mac's coding compared to this.
function mapStateToProps({ auth }) {
  return { token: auth.token };
}

export default connect(mapStateToProps, actions)(AuthScreen);
