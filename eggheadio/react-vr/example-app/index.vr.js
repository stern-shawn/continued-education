import React from 'react';
import {
  AppRegistry,
  asset,
  Image,
  Pano,
  PointLight,
  Sphere,
  Box,
  Cylinder,
  Plane,
  Text,
  View,
  Model,
  VrButton,
  Animated,
} from 'react-vr';

const AnimatedSphere = Animated.createAnimatedComponent(Sphere);

const Tree = (props) => {
  return (
    <View style={props.style}>
      <Sphere
        lit
        style={{ color: 'green', transform: [{ translateY: 0.8 }] }}
      />
      <Cylinder
        lit
        style={{ color: 'brown' }}
        radiusBottom={0.05}
        radiusTop={0.05}
      />
    </View>
  )
}

export default class app extends React.Component {
  state = {
    fadeIn: new Animated.Value(0),
    rotation: new Animated.Value(0),
    springValue: new Animated.Value(-1),
  }

  componentDidMount() {
    // Animations in parallel AND sequenced!
    Animated.parallel([
      Animated.sequence([
        Animated.timing(this.state.fadeIn, { toValue: 1, duration: 3000 }),
        Animated.delay(1000),
        Animated.spring(this.state.springValue, { toValue: 0 }),
      ]),
      Animated.timing(this.state.rotation, { toValue: 1000, duration: 100000 }),
    ]).start();
  }
  
  render() {
    return (
      <View>
        <Pano source={asset('chess-world.jpg')} />
        <Tree style={{ transform: [{ translate: [3, -2, -1] }] }} />
        <Tree style={{ transform: [{ translate: [3, -2, -2.1] }] }} />
        <PointLight
          intensity={2}
          decay={2}
          distance={40}
          style={{
            transform: [{ translate: [0, 0, 10] }],
          }}
        />
        <AnimatedSphere
          style={{
            color: 'lightblue',
            layoutOrigin: [0.5, 0.5],
            transform: [{ translate: [-2, -1, -2] }, { rotateY: this.state.rotation }]
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
            transform: [{ translate: [2, -1, -2] }],
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
            transform: [{ translate: [2, 1, -2] }],
            layoutOrigin: [0.5, 0.5],
          }}
        />
        <Plane
          dimWidth={0.6}
          dimHeight={0.6}
          lit
          style={{
            color: 'green',
            transform: [{ translate: [-2, 1, -2] }],
            layoutOrigin: [0.5, 0.5],
          }}
        />
        <Model
          source={{
            obj: asset('Dog.obj'),
          }}
          lit
          texture={asset('chess-world.jpg')}
          style={{
            transform: [{ translate: [-4, -3, -2]}, ],
            layoutOrigin: [0.5, 0.5],
          }}
        />
        <VrButton
          onClick={() => { console.log('clicked') }}
          onLongClick={() => { console.log('clicked longly') }}
          onButtonPress={() => { console.log('pressed') }}
          onButtonRelease={() => { console.log('released') }}
          style={{
            layoutOrigin: [0.5, 0.5],
            transform: [{ translate: [1, 1, -1] }],
          }}
        >
          <Text style={{ color: 'black', }}>Update!</Text>
        </VrButton>
        <Animated.View
          style={{
            width: 2,
            height: 2.4,
            backgroundColor: 'white',
            layoutOrigin: [0.5, 0.5],
            transform: [{ translateZ: -3 }, { translateY: this.state.springValue }],
            opacity: this.state.fadeIn,
            justifyContent: 'space-between',
          }}
          onInput={ (e) => {
            console.log('type', e.nativeEvent.inputEvent.type);
            console.log('eventType', e.nativeEvent.inputEvent.eventType);
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

        </Animated.View>
      </View>
    );
  }
};

AppRegistry.registerComponent('app', () => app);
