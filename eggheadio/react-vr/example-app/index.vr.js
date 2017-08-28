import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
} from 'react-vr';

export default class app extends React.Component {
  render() {
    return (
      <View>
        <Pano source={asset('chess-world.jpg')} />
        <Text
          style={{
            transform: [{ translateZ: -1 }],
            width: 0.5,
            height: 0.45,
            color: 'lightblue',
            backgroundColor: 'green',
            textAlign: 'center',
            fontWeight: '300',
            textAlignVertical: 'center',
            layoutOrigin: [0.5, 0.5],
          }}
        >
        Hello, VR World!
        </Text>
      </View>
    );
  }
};

AppRegistry.registerComponent('app', () => app);
