import { Body, Button, Container, Content, Footer, FooterTab, Header, Right, StyleProvider } from 'native-base';
import React from 'react';
import { Text, Avatar } from 'react-native-elements';
import { Image, StyleSheet, View } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import firebase from '../config/Firebase';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import colors from '../resources/colors';
import styles from '../resources/styles';
import { getNameInitials } from './utils/TextUtils';


const DrawerMenu = (props) => {

    handleSignOut = () => {
        firebase.auth().signOut();
    }
    const user = firebase.auth().currentUser;
    return (
        <StyleProvider style={getTheme(material)}>
            <Container>
                <Header style={{ height: 250 }}>
                    <Body>
                        <Avatar rounded size="large"
                            title={getNameInitials(user.displayName)} containerStyle={{ marginRight: 10, marginTop: 60 }} />
                        <View style={[styles.textSubHeading, {
                            alignSelf: 'flex-start',
                            fontWeight: 'bold',
                            fontSize: 24,
                            flex: 1,
                            marginTop: 8,

                        }]}>
                            <Text style={{ color: colors.white }}>{user.email}</Text>
                            <Text style={{ color: colors.white }}>{user.displayName}</Text>
                        </View>
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