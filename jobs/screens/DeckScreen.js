import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Swipe from '../components/Swipe';
import {Card, Button} from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';

class DeckScreen extends React.Component {

  renderCard(job) {
    return (
      <Card key={job.id} title={job.jobtitle} image={{uri: job.company_logo}}>
        <Text>{job.company}</Text>
        <Text>{job.title}</Text>
      </Card>
    );
  }

  renderNoMoreCards() {
    return (
      <Card title="All Done!">
        <Text style={{ marginBottom: 10 }}>
          There's no more content here!
        </Text>
      </Card>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Swipe 
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={job => this.props.likeJob(job)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20
  }
});

function mapStateToProps({jobs}) {
  return {
    jobs: jobs.results
  }
}

export default connect(mapStateToProps, actions)(DeckScreen);