import React, {Component} from 'react';
import {ActionSheet, View, Button, Icon, Fab} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';

let BUTTONS = [
  {text: 'My Profile', icon: 'person', iconColor: '#fb724a'},
  {text: 'LogOut', icon: 'power', iconColor: '#fa213b'},
  // {text: 'Cancel', icon: 'close', iconColor: '#25de5b'},
];
let DESTRUCTIVE_INDEX = 1;
let CANCEL_INDEX = 2;

export default class FABExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  // _logOut = async () => {
  //   console.log('logout deh');
  //   await AsyncStorage.clear();
  //   this.props.navigation.navigate('SigninScreen');
  // };

  _logOut = async () => {
    await AsyncStorage.getItem('uid')
      .then(async uid => {
        firebase
          .database()
          .ref('user/' + uid)
          .update({status: 'offline'});
        await AsyncStorage.clear();
        firebase.auth().signOut();
        // Geolocation.stopObserving();
        this.props.navigation.navigate('SigninScreen');
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  render() {
    console.log('salam dari fab =', this.props.myBio);
    const {myBio} = this.props;
    return (
      <View style={{flex: 1}}>
        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={{backgroundColor: '#5067FF'}}
          position="bottomRight"
          onPress={() => this.setState({active: !this.state.active})}>
          <Icon name="settings" />
          <Button
            style={{backgroundColor: '#3B5998'}}
            onPress={() => {
              ActionSheet.show(
                {
                  options: BUTTONS,
                  cancelButtonIndex: CANCEL_INDEX,
                  destructiveButtonIndex: DESTRUCTIVE_INDEX,
                  title: 'Settings',
                  // onPress: selectAction.component,
                },
                buttonIndex => {
                  switch (buttonIndex) {
                    case 0:
                      this.props.navigation.navigate('MyProfileScreen', myBio);
                      break;
                    case 1:
                      this._logOut();
                      break;
                    default:
                      break;
                  }
                },
              );
            }}>
            <Icon name="person" />
          </Button>
          {/* <Button
            style={{backgroundColor: '#DD5144'}}
            onPress={() => {
              this.props.navigation.navigate('WishListScreen', {
                data: this.state.dataWishlist,
              });
            }}>
            <Icon name="heart" />
          </Button> */}
        </Fab>
        {/* <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={{backgroundColor: '#5067FF'}}
          position="bottomRight"
          onPress={() => this.setState({active: !this.state.active})}>
          <Icon name="share" />
          <Button style={{backgroundColor: '#34A34F'}} onPress={this._logOut}>
            <Icon name="logo-whatsapp" />
          </Button>
          <Button style={{backgroundColor: '#3B5998'}}>
            <Icon name="logo-facebook" />
          </Button>
          <Button disabled style={{backgroundColor: '#DD5144'}}>
            <Icon name="mail" />
          </Button>
        </Fab> */}
      </View>
    );
  }
}
