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
        <Pano
            source={asset('chess-world.jpg')}
            onLoad={() => { console.log('Loaded') }}
            style={{
              transform: [{ rotateY: -45 }],
            }}
        />
      </View>
    );
  }
};

AppRegistry.registerComponent('app', () => app);
