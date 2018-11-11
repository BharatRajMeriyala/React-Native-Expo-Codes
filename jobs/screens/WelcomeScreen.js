import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';

import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to JobApp' },
  { text: 'Use this to get a job' },
  { text: 'Set your location, then swipe away' }
];

class WelcomeScreen extends Component
{
  state = { token: null }

  async componentWillMount() {
    let token = await AsyncStorage.getItem('fb_token');

    if (token) {
      this.props.navigation.navigate('map');
      this.setState({ token });
    } else {
      this.setState({ token: false });
    }
  }

  onSlidesComplete = () => {
     this.props.navigation.navigate('auth');
  }

  render() {
    return (
      <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete}></Slides>
    );
  }
}

export default WelcomeScreen;