import React, {Component} from 'react';
import {SafeAreaView, View, StyleSheet, Text} from 'react-native';
import {Container, Tab, Tabs} from 'native-base';
import {Row, Grid} from 'react-native-easy-grid';

import {withNavigation} from 'react-navigation';

import Header from '../../Components/Navbars/Header';
import Fab from '../../Components/Fabs/Fab';
import ChatList from '../Main/Contact';
import FriendList from '../Main/Friends';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataContact: this.props.dataContact,
    };
  }

  render() {
    console.log('data contact', this.props.dataContact);
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
          <Row size={90}>
            <Container>
              <Tabs
                tabContainerStyle={{
                  elevation: 0,
                }}
                tabBarUnderlineStyle={{backgroundColor: '#fb724a'}}>
                <Tab
                  heading="CHAT"
                  tabStyle={{backgroundColor: 'white'}}
                  activeTabStyle={{backgroundColor: 'white'}}
                  textStyle={{color: 'gray'}}
                  activeTextStyle={{color: 'gray', fontWeight: 'bold'}}>
                  <ChatList />
                </Tab>
                <Tab
                  heading="MAPS"
                  tabStyle={{backgroundColor: 'white'}}
                  activeTabStyle={{backgroundColor: 'white'}}
                  textStyle={{color: 'gray'}}
                  activeTextStyle={{color: 'gray', fontWeight: 'bold'}}>
                  <Text>1</Text>
                </Tab>
                <Tab
                  heading="FRIENDS"
                  tabStyle={{backgroundColor: 'white'}}
                  activeTabStyle={{backgroundColor: 'white'}}
                  textStyle={{color: 'gray'}}
                  activeTextStyle={{color: 'gray', fontWeight: 'bold'}}>
                  <FriendList />
                </Tab>
              </Tabs>
            </Container>
          </Row>
        </Grid>
        <Fab navigation={this.props.navigation} />
      </SafeAreaView>
    );
  }
}

export default withNavigation(Contact);

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

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
