import React, {Component} from 'react';
import {View, Animated, PanResponder, Dimensions} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THESHHOLD = 0.25 * SCREEN_WIDTH;


class Swipe extends Component {

    static defaultProps = {
        onSwipeRight: () => {},
        onSwipeLeft: () => {}
    }

    constructor(props) {
        super(props);

        const position = new Animated.ValueXY();

        // onStartShouldSetPanResponder: Executes any time user taps on the screen. Returning true from this function
        // means this panresponder will start doing its work. We can run some code to determine true ot false. here
        // we will return true.
        // onPanResponderMove: It is a callback which works when user starts to drag their finger around the screen.
        // This will be called many times as user continuesly tries to drag around.
        // onPanResponderRelease: when user removes finger from screen. Final callback kind of thing.

        const panResponder = PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onPanResponderMove: (event, gesture) => {
              position.setValue({ x: gesture.dx, y: gesture.dy })
          },
          onPanResponderRelease: (event, gesture) => {
            if(gesture.dx > SWIPE_THESHHOLD) {
                this.forceSwipe('right');
            }
            else if(gesture.dx < -SWIPE_THESHHOLD) {
                this.forceSwipe('left');
            }
            else
            {
                this.resetPosition();
            }
          }  
        });

        //But we will never call setstate. 
        //This is done only to be in sync with official documentations about PanResponder.
        this.state = { panResponder, position, index: 0 };
    }


    forceSwipe(direction) {

        const x = direction === 'left' ? -SCREEN_WIDTH - 50 : SCREEN_WIDTH + 50;
        Animated.timing(this.state.position, {
            toValue: { x: x, y: 0},
            duration: 250
        }).start(() => {
            this.onSwipeComplete(direction);
        });
    }

    onSwipeComplete(direction) {
        const { onSwipeRight, onSwipeLeft, data } = this.props;
        const item = data[this.state.index];

        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);

        this.state.position.setValue({x: 0, y: 0});
        this.setState({index: this.state.index + 1});
    }

    resetPosition() {
        Animated.spring(this.state.position, {
            toValue: {x: 0, y: 0}
        }).start();
    }

    getCardStyle() {

        const { position } = this.state;
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
            outputRange: ['-120deg', '0deg', '120deg']
        });

        // return {
        //     ...position.getLayout(),
        //     transform: [{ rotate: '45deg' }]
        // }

        return {
            ...position.getLayout(),
            transform: [{ rotate }]
        }
    }

    renderCards() {

        if(this.state.index === this.props.data.length) {
            return this.props.renderNoMoreCards();
        }

        return this.props.data.map((item, index) => {
            if(index < this.state.index) { return null; }

            if(index === this.state.index) {
                return (
                    <Animated.View key={item.id} style={[this.getCardStyle(), styles.cardStyle, { zIndex: index * -1 }]} 
                        {...this.state.panResponder.panHandlers}>
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            }

            return (
                <Animated.View key={item.id} style={[styles.cardStyle, { zIndex: index * -1 }, { top: 10 }]}>
                    {this.props.renderCard(item)}
                </Animated.View>
            );
        });
    }

    render() {

        // panHandlers is an object that a bunch of intercepters, that intercept presses from a user.
        // Here we are spreading all those properties and passing to viewComponent. 

        return(
            <View>
                {this.renderCards()}
            </View>
        )
    }
}

const styles = {
    cardStyle: {
        position: 'absolute',
        width: SCREEN_WIDTH
    }
}

export default Swipe;