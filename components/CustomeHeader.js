import { Body, Header, Icon, Left, Right, Title } from 'native-base';
import React, { Component } from "react";

class CustomHeader extends Component {
    render() {
        return (
            <Header style={{ backgroundColor: 'white' }}>
                <Left>
                    <Icon name="ios-menu" onPress={() => this.props.navigation.openDrawer()} />
                </Left>
                <Body>
                    <Title>{this.props.title}</Title>
                </Body>
                <Right />
            </Header>
        );
    }
}
export default CustomHeader;
