import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import StyledView from '../templates/StyledView'
import Loader from './Loader';
import StyledText from '../templates/StyledText';

export default function OverlayScan({ isScanned, }) {

    useEffect(() => {

    }, [isScanned])


    const repeatedComponents = useMemo(() => {
        const components = [];

        for (let i = 0; i < 40; i++) {
            let style = styles.verticalLine;

            if (i % 2 === 0) {
                style = [style, { width: 3 }];
            }

            if (i % 4 === 0) {
                style = [style, { width: 5 }];
            }

            if (i % 6 === 0) {
                style = [style, { width: 1 }];
            }

            components.push(<StyledView style={style} key={i} />);
        }

        return components;
    }, []);



    return (
        <StyledView h={60} ai="center" jc='center'>
            <StyledView style={styles.container} jc='center' pl={4} pr={4}>
                <StyledView row jc="space-evenly" ai='center'>
                    {
                        !isScanned
                            ?
                            <StyledView ai='center'><StyledView row jc="space-between" ai='center' w={70}>
                                {repeatedComponents}
                            </StyledView>
                                <StyledText color='rgba(255, 255, 255, 0.2)' fw={'bold'} fs={16}>{`0     0 0 0     0 0 0 0    0 0 0 0 0       0`}</StyledText></StyledView>
                            :
                            (<>
                                <Loader isScanned={isScanned} />
                            </>)
                    }
                </StyledView>
            </StyledView>
        </StyledView>

    )
}

const { width, height } = Dimensions.get('window')
const borderWidth = 2;

const styles = StyleSheet.create({
    container: {
        zIndex: -3,
        borderWidth: 2,
        borderColor: 'rgba(0, 255, 0, 0.2)',
        width: width * 0.85,
        height: height * 0.20,
        backgroundColor: 'rgba(3, 0, 252,0.1)'
    },
    verticalLine: {
        zIndex: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        height: height * 0.12,
        width: borderWidth,
    },


})
