import React from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import firebase from 'firebase';

import AsyncStorage from '@react-native-community/async-storage';

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      username: this.props.data.username,
      uid: this.props.data.id,
      image: this.props.data.image,
      status: this.props.data.status,
      text: '',
    };
  }

  componentDidMount = async () => {
    this.setState({
      myuid: await AsyncStorage.getItem('uid'),
      myname: await AsyncStorage.getItem('name'),
      myavatar: await AsyncStorage.getItem('image'),
    });
    await firebase
      .database()
      .ref('messages')
      .child(this.state.myuid)
      .child(this.state.uid)
      .on('child_added', value => {
        this.setState(previousState => {
          return {
            messages: GiftedChat.append(previousState.messages, value.val()),
          };
        });
      });
  };

  onSend = async () => {
    msgId = firebase
      .database()
      .ref('messages')
      .child(this.state.myuid)
      .child(this.state.uid)
      .push().key;
    let updates = {};
    let message = {
      _id: msgId,
      text: this.state.text,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      user: {
        _id: this.state.myuid,
        name: this.state.username,
        avatar: this.state.image,
      },
    };
    updates[
      'messages/' + this.state.myuid + '/' + this.state.uid + '/' + msgId
    ] = message;
    updates[
      'messages/' + this.state.uid + '/' + this.state.myuid + '/' + msgId
    ] = message;
    firebase
      .database()
      .ref()
      .update(updates);
    this.setState({
      text: '',
    });
  };

  render() {
    // console.log('chat data , ', this.props.data);
    return (
      <GiftedChat
        text={this.state.text}
        messages={this.state.messages}
        onSend={this.onSend}
        showAvatarForEveryMessage={true}
        user={{
          _id: this.state.myuid,
          name: this.state.myname,
          avatar: this.state.avatar,
        }}
        onInputTextChanged={value => this.setState({text: value})}
      />
    );
  }
}
