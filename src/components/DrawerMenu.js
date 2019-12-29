import { Body, Button, Container, Content, Footer, FooterTab, Header, Right, Text, StyleProvider } from 'native-base';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import firebase from '../config/Firebase';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import colors from '../resources/colors';

export default class DrawerMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSignOut = () => {
        firebase.auth().signOut();
    }

    render() {
        return (
            <StyleProvider style={getTheme(material)}>
                <Container>
                    <Header style={{ height: 150 }}>
                        <Body>
                            <Image source={require('../assets/icon/homeIcon.png')}
                                style={{ height: 100, width: 100, }}
                            />
                        </Body>
                        <Right />
                    </Header>
                    <Content>
                        <DrawerItems  {...this.props} />
                    </Content>
                    <Footer>
                        <FooterTab>
                            <Button onPress={this.handleSignOut}>
                                <Text style={styles.buttonText}>Logout </Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>
            </StyleProvider>
        )
    }
}

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff'
    }
})
