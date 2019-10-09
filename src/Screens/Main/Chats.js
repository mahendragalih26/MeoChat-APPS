import React, {Component} from 'react';
import {SafeAreaView, View, StyleSheet, Text} from 'react-native';
import {Container, Tab, Tabs} from 'native-base';
import {Row, Grid} from 'react-native-easy-grid';

import HeaderChat from '../../Components/Navbars/HeaderChat';
import Chat from '../../Components/Chats/chat';

const myChat = props => {
  return (
    <SafeAreaView style={styles.container}>
      <Grid>
        <HeaderChat data={props.navigation.state.params} />
        <Row
          size={1}
          style={{
            backgroundColor: '#fb724a',
            //   borderBottomLeftRadius: 50,
            //   borderBottomRightRadius: 50,
          }}>
          <Container style={{backgroundColor: '#fb724a'}}></Container>
        </Row>
        <Row size={90}>
          <Container
            style={{
              backgroundColor: 'white',
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              height: '100%',
            }}>
            <Chat data={props.navigation.state.params} />
          </Container>
        </Row>
      </Grid>
    </SafeAreaView>
  );
};

export default myChat;

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
