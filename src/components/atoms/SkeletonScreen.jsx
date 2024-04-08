import React from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';

const SkeletonScreen = () => {
  // Animated value for shimmer effect
  const translateX = new Animated.Value(-300);

  // Function to animate shimmer effect
  const startAnimation = () => {
    translateX.setValue(-300);
    Animated.loop(
      Animated.timing(translateX, {
        toValue: 900, // Width of the screen plus some extra
        duration: 1400,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  // Start animation when component mounts
  React.useEffect(() => {
    startAnimation();
  }, []);

  return (
    <View style={styles.container}>
      {/* Shimmer effect */}
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  );
};

const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    zIndex:-1,
    width:'100%',
    borderRadius:10,
    height:height*0.01,
    backgroundColor: '#fff', // Background color of skeleton screen
    overflow: 'hidden', // Hide overflow to prevent shimmer from showing outside the container
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primaryColor, // Color of shimmer effect
  },
});

export default SkeletonScreen;
