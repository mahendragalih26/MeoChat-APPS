import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {
  Container,
  Thumbnail,
  Content,
  Form,
  Item,
  Input,
  Label,
} from 'native-base';
import {Row, Grid} from 'react-native-easy-grid';

import {withNavigation} from 'react-navigation';

import Header from '../../Components/Navbars/Header';

class myProfile extends Component {
  state = {};

  render() {
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
                  square
                  style={{width: 150, height: 150}}
                  large
                  source={{
                    uri:
                      'https://www.shareicon.net/data/2016/09/01/822711_user_512x512.png',
                  }}
                />
              </View>
            </Container>
          </Row>
          <Row size={56}>
            <Container style={{paddingHorizontal: 10}}>
              <Form>
                <Item stackedLabel>
                  <Label>Username</Label>
                  <Input defaultValue="nama" style={{fontSize: 20}} />
                </Item>
                <Item stackedLabel>
                  <Label>Password</Label>
                  <Input />
                </Item>
              </Form>
            </Container>
          </Row>
        </Grid>
      </SafeAreaView>
    );
  }
}

export default withNavigation(myProfile);
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
