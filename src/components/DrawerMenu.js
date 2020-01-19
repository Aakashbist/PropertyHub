import { Body, Button, Container, Content, Footer, FooterTab, Header, Right, StyleProvider, Title } from 'native-base';
import React from 'react';
import { Text, Avatar } from 'react-native-elements';
import { Image, StyleSheet, View } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import { Firebase, getCurrentUser } from '../config/Firebase';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import colors from '../resources/colors';
import styles from '../resources/styles';
import { getNameInitials } from './utils/TextUtils';


const DrawerMenu = (props) => {

    handleSignOut = () => {
        Firebase.auth().signOut();
    }
    const user = getCurrentUser();
    return (
        <StyleProvider style={getTheme(material)}>
            <Container>
                <Header style={{ height: 140, justifyContent: 'center' }}>
                    <Body style={{ alignItems: "center" }}>
                        <Avatar rounded size="large"
                            overlayContainerStyle={{ backgroundColor: colors.accent }}
                            titleStyle={{ color: colors.white }}
                            title={getNameInitials(user.displayName)} />
                        <Title style={{ marginTop: 8 }}>{user.displayName}</Title>
                    </Body>
                </Header>
                <Content>
                    <DrawerItems  {...props} />
                </Content>
                <Footer>
                    <FooterTab>
                        <Button onPress={this.handleSignOut}>
                            <Text style={[styles.overline, { fontSize: 14, color: colors.white }]}>Logout </Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        </StyleProvider >
    )
}

export default DrawerMenu;