import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Thumbnail, Container} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';

import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';

import {withNavigation} from 'react-navigation';

import Logo from '../../Assets/person/profile.png';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      chat: [],
      users: [],
      isLoading: true,
    };
  }

  componentDidMount = async () => {
    const uid = await AsyncStorage.getItem('uid');
    this.setState({uid});
    await firebase
      .database()
      .ref('messages/' + this.state.uid)
      .on('child_added', data => {
        let person = data.val();
        person.id = data.key;
        this.state.chat.push({
          id: person.id,
        });
        this.setState({chat: this.state.chat});
      });
    await firebase
      .database()
      .ref('user/')
      .on('value', result => {
        let data = result.val();
        if (data !== null) {
          let users = Object.values(data);
          this.setState({
            users,
            isLoading: false,
          });
        }
      });
  };

  render() {
    const chat = this.state.chat;
    const users = this.state.users;
    const data = [];
    chat.forEach((friend, key) => {
      data[key] = users.find(item => item.id === friend.id);
    });

    console.log('data chat = ', chat);
    console.log('data users = ', users);
    console.log('data ku = ', data);
    console.log('loading = ', this.state.isLoading);

    return this.state.isLoading === true ? (
      <View>
        <Text>loading</Text>
      </View>
    ) : (
      <SafeAreaView styleS={styles.container}>
        <View style={{marginBottom: 70}}>
          <FlatList
            data={data}
            renderItem={({item}) =>
              item.length > 0 ? (
                <Fragment>
                  <View>
                    <Text>Null</Text>
                  </View>
                </Fragment>
              ) : (
                <Fragment>
                  <ScrollView>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        this.props.navigation.navigate('chatScreen', item);
                      }}>
                      <View style={styles.item}>
                        <Grid>
                          <Col
                            style={{
                              width: '28%',
                            }}>
                            <View style={styles.image}>
                              <Thumbnail
                                // large
                                source={{uri: item.image}}
                                style={{
                                  backgroundColor: 'red',
                                  borderWidth: 5,
                                  borderColor: '#3498db',
                                }}
                              />
                            </View>
                          </Col>
                          <Col>
                            <Row>
                              <View style={{paddingVertical: 4}}>
                                <Text style={{fontSize: 20}}>
                                  {item.username}
                                </Text>
                              </View>
                            </Row>
                            <Row>
                              <Text style={{color: 'gray'}}>{item.status}</Text>
                            </Row>
                          </Col>
                        </Grid>
                      </View>
                    </TouchableOpacity>
                  </ScrollView>
                </Fragment>
              )
            }
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default withNavigation(Contact);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'red',
  },
  item: {
    backgroundColor: '#f7f7f7',
    height: 70,
    padding: 5,
    marginVertical: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
  },
});
