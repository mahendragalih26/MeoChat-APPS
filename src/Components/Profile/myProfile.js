import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
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
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import firebase from 'firebase';
import ImagePicker from 'react-native-image-picker';

import Header from '../Navbars/Header';

class myProfile extends Component {
  constructor() {
    super();
    this.state = {
      myuid: '',
      temImage: '',
    };
  }

  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  updateMyPhoto = async type => {
    let myType = type;
    const Blob = RNFetchBlob.polyfill.Blob;
    const fs = RNFetchBlob.fs;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = Blob;

    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'image',
      },
      mediaType: 'photo',
    };

    let myPermission =
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ) &&
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );

    if (!myPermission) {
      console.log('masuk request galeri');
      myPermission = await this.requestCameraPermission();
    } else {
      ImagePicker.showImagePicker(options, response => {
        console.log('ini response image nya', response);
        let uploadBob = null;
        const imageRef = firebase
          .storage()
          .ref('storage/' + this.state.myuid)
          .child(myType);
        fs.readFile(response.path, 'base64')
          .then(data => {
            return Blob.build(data, {type: `${response.mime};BASE64`});
          })
          .then(blob => {
            uploadBob = blob;
            return imageRef.put(blob, {contentType: `${response.mime}`});
          })
          .then(() => {
            uploadBob.close();
            return imageRef.getDownloadURL();
          })
          .then(url => {
            // upp == 'header' ?
            // firebase.database().ref('users/' + this.state.uid).update({ header: url})
            // :
            firebase
              .database()
              .ref('user/' + this.state.myuid)
              .update({image: url});

            this.setState({
              temImage: url,
            });
          })
          .catch(err => console.log(err));
      });
    }
  };

  componentDidMount = async () => {
    this.setState({
      myuid: await AsyncStorage.getItem('uid'),
      temImage: this.props.navigation.state.params.image,
      // myname: await AsyncStorage.getItem('name'),
      // myavatar: await AsyncStorage.getItem('image'),
    });
  };

  render() {
    console.log('datakus = ', this.props.navigation.state.params);
    const dataUser = this.props.navigation.state.params;
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
                <TouchableOpacity
                  onPress={() => {
                    this.updateMyPhoto('image');
                  }}>
                  {this.state.temImage !== null ? (
                    <Thumbnail
                      style={{width: 150, height: 150, borderRadius: 100}}
                      large
                      source={{
                        uri: this.state.temImage,
                      }}
                    />
                  ) : (
                    <Thumbnail
                      style={{width: 150, height: 150, borderRadius: 100}}
                      large
                      source={{
                        uri: dataUser.image,
                      }}
                    />
                  )}
                  {/* {dataUser.image !== null ? (
                    <Fragment>
                      {this.state.temImage !== null ? (
                        <Thumbnail
                          style={{width: 150, height: 150, borderRadius: 100}}
                          large
                          source={{
                            uri: this.state.temImage,
                          }}
                        />
                      ) : (
                        <Thumbnail
                          style={{width: 150, height: 150, borderRadius: 100}}
                          large
                          source={{
                            uri: dataUser.image,
                          }}
                        />
                      )}
                    </Fragment>
                  ) : this.state.temImage === null ? (
                    <Thumbnail
                      style={{width: 150, height: 150, borderRadius: 100}}
                      large
                      source={{
                        uri: dataUser.image,
                      }}
                    />
                  ) : this.state.temImage !== null ? (
                    <Thumbnail
                      style={{width: 150, height: 150, borderRadius: 100}}
                      large
                      source={{
                        uri: this.state.temImage,
                      }}
                    />
                  ) : (
                    <View></View>
                  )} */}
                </TouchableOpacity>
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
  }
}

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
