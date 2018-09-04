import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Easing,
  Image
} from 'react-native';

import tcSplash from '../../img/misc/TC-Splash.png'

class LoadingIcon extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fadeAnimateValue: new Animated.Value(0)
    };
  }

  componentDidMount() {
    setTimeout(() => this.fadeInIcon(), 250);
  }

  fadeInIcon() {
    this.state.fadeAnimateValue.setValue(0);
    Animated.timing(
      this.state.fadeAnimateValue,
      {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.quad)
      }
    ).start();
  }

  render() {
    const top = this.state.fadeAnimateValue.interpolate({
      inputRange: [0, 1],
      outputRange: [30, -30]
    });
    const opacity = this.state.fadeAnimateValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });
    return (
      <View style={[baseStyle.container]}>
        <Image style={baseStyle.tekkenGamer} source={tcSplash} />
      </View>
    );
  }
}

const baseStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  text: {
    opacity: 0,
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center'
  },
  tekkenGamer: {
    height: 200,
    width: 300,
    resizeMode: 'cover'
  }
});

export default LoadingIcon;
