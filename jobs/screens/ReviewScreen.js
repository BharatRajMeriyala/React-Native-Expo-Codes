import React, { Component } from 'react';
import { View, Text, Platform, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Button, Card, Icon } from 'react-native-elements';

// With Stack Navigator, the header is available for free. We need to put our buttons into it.
class ReviewScreen extends Component
{
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Review Jobs",
    headerRight: (
      <Button
        title="Settings"
        onPress={() => {
          navigation.navigate("settings");
        }}
        backgroundColor="rgba(0, 0, 0, 0)"
        color="rgba(0, 122, 255, 1)"
      />
    ),
    headerStyle: {
      //If the app is running on Android assign 24 to marginTop, if not, assign 0 to marginTop
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  });


  renderLikedJobs() {
    return this.props.likedJobs.map(job => {
      
      return (
        <Card key={job.id} title={job.jobtitle} image={{uri: job.company_logo}}>
          <Text>{job.company}</Text>
          <Text>{job.title}</Text>
          <Button
              title="Apply Now!"
              backgroundColor="#03A9F4"
              onPress={() => Linking.openURL(jobs.url)}
            />
        </Card>
      );
    });
  }

  render() {
    return (
      <ScrollView>
        {this.renderLikedJobs()}
      </ScrollView>
    );
  }
}

const styles = {
  italics: {
    fontStyle: 'italic'
  },
  detailWrapper: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
}

function mapStateToProps(state) {
  return { likedJobs: state.likedJobs };
}


export default connect(mapStateToProps)(ReviewScreen);