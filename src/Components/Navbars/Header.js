import React, {Component} from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {Header, Left, Body, Right, Button, Icon, Title} from 'native-base';

import Logo from '../../Assets/brand/icon-front-white.png';

class myHeader extends Component {
  state = {};
  render() {
    return (
      <View>
        <Header
          style={{backgroundColor: '#fb724a', height: 55}}
          androidStatusBarColor="#fb724a"
          noShadow>
          <Left></Left>
          <Body>
            <Image source={Logo} style={styles.image} />
          </Body>
          <Right></Right>
        </Header>
      </View>
    );
  }
}

export default myHeader;

const styles = StyleSheet.create({
  cover: {
    // padding: 10,
    alignItems: 'center',
  },
  image: {
    marginTop: 15,
    width: 190,
    height: 70,
    marginLeft: 20,
    resizeMode: 'contain',
  },
});
