import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Thumbnail} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';

import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';

import {withNavigation} from 'react-navigation';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      users: [],
    };
  }

  componentDidMount = async () => {
    const uid = await AsyncStorage.getItem('uid');
    this.setState({uid});

    firebase
      .database()
      .ref('user')
      .on('child_added', data => {
        let person = data.val();
        person.id = data.key;
        if (person.id != this.state.uid) {
          this.setState(prevData => {
            return {
              users: [...prevData.users, person],
            };
          });
          // this.setState({ refreshing: false });
        }
      });
  };

  render() {
    console.log('data user = ', this.state.users);
    return (
      <SafeAreaView style={styles.container}>
        <View style={{marginBottom: 70}}>
          <FlatList
            data={this.state.users}
            renderItem={({item}) => {
              return (
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
              );
            }}
            keyExtractor={item => item.id}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default withNavigation(Contact);

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Adam N Waten',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Fatkul Amr',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Anjay',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b1',
    title: 'Adam N Waten',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f62',
    title: 'Fatkul Amr',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d73',
    title: 'Anjay',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f12',
    title: 'Fatkul Amr',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d12',
    title: 'Anjay',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97232',
    title: 'Fatkul Amr',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
