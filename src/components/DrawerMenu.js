import { Body, Button, Container, Content, Footer, FooterTab, Header, Right, Text, StyleProvider } from 'native-base';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import firebase from '../config/Firebase';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import colors from '../resources/colors';
import styles from '../resources/styles';

const DrawerMenu = (props) => {

    handleSignOut = () => {
        firebase.auth().signOut();
    }

    return (
        <StyleProvider style={getTheme(material)}>
            <Container>
                <Header style={{ height: 150 }}>
                    <Body>
                        <Image source={require('../assets/icon/homeIcon.png')}
                            style={{ height: 100, width: 100, }}
                        />
                    </Body>
                </Header>
                <Content>
                    <DrawerItems  {...props} />
                </Content>
                <Footer>
                    <FooterTab>
                        <Button onPress={this.handleSignOut}>
                            <Text style={[styles.overline, { fontSize: 14 }]}>Logout </Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        </StyleProvider>
    )
}

export default DrawerMenu;