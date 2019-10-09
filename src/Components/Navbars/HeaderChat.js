import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Thumbnail,
  Title,
} from 'native-base';

const myHeader = props => {
  console.log('data item = ', props.data);
  const data = props.data;
  return (
    <View>
      <Header
        style={{backgroundColor: '#fb724a', height: 55}}
        androidStatusBarColor="#fb724a"
        noShadow>
        <Left>
          <Button transparent>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body style={{flexDirection: 'row'}}>
          <Thumbnail
            small
            source={{
              uri: data.image,
            }}
          />
          <View style={{paddingHorizontal: 20}}>
            <Title>{data.username}</Title>
          </View>
        </Body>
        <Right>
          <Button transparent>
            <Icon name="more" />
          </Button>
        </Right>
      </Header>
    </View>
  );
};

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
