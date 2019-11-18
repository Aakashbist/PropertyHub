import React from 'react';
import { StatusBar, View } from 'react-native';
import { StyleSheet, Platform } from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const generalStatusBarColor = StyleSheet.create({
    statusBar: {
        height: STATUSBAR_HEIGHT
    }
});

const GeneralStatusBarColor = ({ backgroundColor, ...props }) => (
    <View style={[generalStatusBarColor.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

export default GeneralStatusBarColor;