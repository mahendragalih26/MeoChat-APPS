import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {
  Container,
  Thumbnail,
  Spinner,
  Form,
  Item,
  Input,
  Label,
  Button,
} from 'native-base';
import {Row, Grid} from 'react-native-easy-grid';

import {withNavigation} from 'react-navigation';

import Header from '../Navbars/Header';

const myProfile = props => {
  console.log('datakus = ', props.navigation.state.params);
  const dataUser = props.navigation.state.params;
  return (
    <SafeAreaView style={styles.container}>
      <Grid>
        <Header />
        <Row
          size={4}
          style={{
            backgroundColor: '#fb724a',
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
          }}></Row>
        <Row size={30}>
          <Container>
            <View
              style={{
                position: 'relative',
                marginTop: 20,
                alignSelf: 'center',
                zIndex: 1,
              }}>
              <Thumbnail
                style={{width: 150, height: 150, borderRadius: 100}}
                large
                source={{
                  uri: dataUser.image,
                }}
              />
            </View>
          </Container>
        </Row>
        <Row size={56}>
          <Container>
            <Form>
              <Item stackedLabel style={{borderBottomWidth: 0, height: 100}}>
                <Label>Username</Label>
                <Input
                  defaultValue={dataUser.username}
                  style={{fontSize: 20}}
                  disabled
                  underlineColorAndroid="#fb724a"
                />
              </Item>
              <Item stackedLabel style={{borderBottomWidth: 0, height: 100}}>
                <Label>Status</Label>
                <Input
                  defaultValue={dataUser.status}
                  style={{fontSize: 20}}
                  disabled
                  underlineColorAndroid="#fb724a"
                />
              </Item>
            </Form>
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 20,
              }}></View>
          </Container>
        </Row>
      </Grid>
    </SafeAreaView>
  );
};

export default myProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    // padding: 10,
    marginVertical: 3,
    marginHorizontal: 16,
  },
});
