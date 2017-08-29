import React from 'react';
import {
  AppRegistry,
  asset,
  Image,
  Pano,
  PointLight,
  AmbientLight,
  DirectionalLight,
  SpotLight,
  Sphere,
  Box,
  Cylinder,
  Plane,
  Text,
  View,
} from 'react-vr';

export default class app extends React.Component {
  render() {
    return (
      <View>
        <Pano source={asset('chess-world.jpg')} />
        <PointLight
          intensity={2}
          decay={2}
          distance={40}
          style={{
            transform: [{ translate: [0, 0, 10] }],
          }}
        />
        <Sphere
          style={{
            color: 'lightblue',
            layoutOrigin: [0.5, 0.5],
            transform: [{ translate: [-2, -1, -2] }]
          }}
          lit
          texture={asset('earthTexture.jpg')}
          heightSegments={20}
          widthSegments={20}
          radius={0.5}
        />
        <Box
          dimWidth={0.5}
          dimHeight={0.5}
          dimDepth={0.5}
          lit
          style={{
            color: 'orchid',
            transform: [{ translate: [2, -1 ,-2] }],
            layoutOrigin: [0.5, 0.5],
          }}
        />
        <Cylinder
          segments={65}
          dimHeight={0.6}
          radiusBottom={0.35}
          radiusTop={0}
          lit
          style={{
            color: 'orangered',
            transform: [{ translate: [2, 1 ,-2] }],
            layoutOrigin: [0.5, 0.5],
          }}
        />
        <Plane
          dimWidth={0.6}
          dimHeight={0.6}
          lit
          style={{
            color: 'green',
            transform: [{ translate: [-2, 1 ,-2] }],
            layoutOrigin: [0.5, 0.5],
          }}
        />
        <View
          style={{
            width: 2,
            height: 2.4,
            backgroundColor: 'white',
            layoutOrigin: [0.5, 0.5],
            transform: [{ translate: [0, 0, -3] }],
            justifyContent: 'space-between',
          }}
        >
          <Image
            source={asset('mountains.jpg')}
            style={{ height: 1.2 }}
          />
          <Text
            style={{
              color: '#333',
              fontSize: 0.16,
              textAlign: 'center',
            }}
          >
            Explore these sick mountains!
          </Text>
          <View
            style={{ flexDirection: 'row' }}
          >
            <Image
              source={asset('thumb1.jpg')}
              style={{ width: 0.5, height: 0.5 }}
            />
            <Image
              source={asset('thumb2.jpg')}
              style={{ width: 0.5, height: 0.5 }}
            />
            <Image
              source={asset('thumb3.jpg')}
              style={{ width: 0.5, height: 0.5 }}
            />
            <Image
              source={asset('thumb4.jpg')}
              style={{ width: 0.5, height: 0.5 }}
            />
          </View>

        </View>
      </View>
    );
  }
};

AppRegistry.registerComponent('app', () => app);
