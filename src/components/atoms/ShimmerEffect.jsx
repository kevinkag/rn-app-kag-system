import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import StyledView from '../templates/StyledView';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

export default ShimmerEffect = () => {
    // Handle animation

    const opacity = React.useRef(new Animated.Value(1)).current;


    const avatarRef = React.createRef()
    const firstLineRef = React.createRef()

    const zeroLineRef = React.createRef()
    const secondLineRef = React.createRef()
    const thirdLineRef = React.createRef()

    React.useEffect(() => {
        const facebookAnimated = Animated.stagger(
            400,
            [
                avatarRef.current.getAnimated(),
                Animated.parallel([
                    zeroLineRef.current.getAnimated(),
                    firstLineRef.current.getAnimated(),
                    secondLineRef.current.getAnimated(),
                    thirdLineRef.current.getAnimated()
                ])
            ]
        );
        Animated.loop(facebookAnimated).start();


    }, [])

    React.useEffect(() => {
        // Define la animación de opacidad que alterna entre 0 y 1
        const blinkingAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 500, // Duración del parpadeo (en milisegundos)
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 500, // Duración del parpadeo (en milisegundos)
                    useNativeDriver: true,
                }),
            ]),
        )
    });


    React.useEffect(() => {
        // Define la animación de opacidad que alterna entre 0 y 1
        const blinkingAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 600, // Duración del parpadeo (en milisegundos)
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 600, // Duración del parpadeo (en milisegundos)
                    useNativeDriver: true,
                }),
            ]),
        );

        // Inicia la animación
        blinkingAnimation.start();

        // Detiene la animación al desmontar el componente
        return () => blinkingAnimation.stop();
    }, [opacity]);

    return (
        <View>
            <Animated.View style={[styles.container, { opacity }]}>
                <ShimmerPlaceholder
                    ref={avatarRef}
                    stopAutoRun
                    height={height * 0.07}
                    style={{ borderRadius: 10 }}
                    width={width * 0.15}

                />
                <View style={{ justifyContent: "space-around" }}>
                    <StyledView row jc={"space-between"} w={74}>
                        <ShimmerPlaceholder
                            ref={zeroLineRef}
                            stopAutoRun
                            width={width * 0.4}
                            style={{ borderRadius: 10, marginLeft: width * 0.04 }}
                        />

                        <ShimmerPlaceholder
                            ref={secondLineRef}
                            stopAutoRun
                            width={width * 0.1}
                            style={{ borderRadius: 10, marginLeft: width * 0.04 }}
                        />
                    </StyledView>

                    {/* <ShimmerPlaceholder
                        ref={secondLineRef}
                        stopAutoRun
                        width={width * 0.65}
                        style={{ borderRadius: 10, marginLeft: width * 0.05 }}

                    /> */}
                    <StyledView row jc={'space-between'}>
                        <ShimmerPlaceholder
                            ref={firstLineRef}
                            stopAutoRun
                            width={width * 0.1}
                            style={{ borderRadius: 10, marginLeft: width * 0.04 }}
                        />
                        <ShimmerPlaceholder
                            ref={thirdLineRef}
                            stopAutoRun
                            width={width * 0.33}
                            style={{ borderRadius: 10, }}

                        />

                    </StyledView>
                </View>
            </Animated.View>
        </View >
    )
}

const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
    container: { flexDirection: "row", backgroundColor: 'rgba(255,255,255,0.5)', padding: 10, borderRadius: 10 }
})
