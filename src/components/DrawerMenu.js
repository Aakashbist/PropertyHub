import { Body, Button, Container, Content, Footer, FooterTab, Header, Right, Text } from 'native-base';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import firebase from '../config/Firebase';

export default class DrawerMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSignOut = () => {
        firebase.auth().signOut();
    }

    render() {
        return (
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
