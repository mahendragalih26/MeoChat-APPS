import React, {Component} from 'react';
import {StyleSheet, PermissionsAndroid, View, Image, Text} from 'react-native';
import {Thumbnail} from 'native-base';
import firebase from 'firebase';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-community/async-storage';
import {identifier} from '@babel/types';
import myMarker from '../../Assets/location/locme.png';

class myMaps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      uid: '',
      region: {
        latitude: -7.7585007,
        longitude: 110.378115,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  componentDidMount = async () => {
    this.setState({uid: await AsyncStorage.getItem('uid')});

    let hasLocationPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (!hasLocationPermission) {
      console.log('tidak coy');
      hasLocationPermission = await this.reqLocationPermission();
    }
    if (hasLocationPermission) {
      geolocation.getCurrentPosition(
        async position => {
          let myPosition = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          };
          await firebase
            .database()
            .ref('user')
            .child(this.state.uid)
            .update({myPosition})
            .then(() => {
              this.setState({
                region: {
                  ...this.state.region,
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                },
              });
              console.log('aaa = ', this.state.region);
            });
        },
        err => {
          console.log(err.code, err.message);
        },
        {
          showLocationDialog: true,
          distanceFilter: 1,
          enableHighAccuracy: true,
          fastestInterval: 5000,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    }
  };

  reqLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Hidupkan GPS untuk explore lebih',
          message: 'MeoChat Need permission for location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Anda dapat menggunakan GPS');
      } else {
        console.log('GPS permission denied');
      }
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  render() {
    console.log('mamamia wahuu = ', this.props.users);
    let {uid} = this.state;
    return (
      <MapView
        style={styles.mapstyle}
        provider={PROVIDER_GOOGLE}
        showsCompass={true}
        showsUserLocation={true}
        followUserLocation={true}
        zoomControlEnabled={true}
        showsCompass={true}
        minZoomLevel={0} // default => 0
        maxZoomLevel={20}
        initialRegion={this.state.region}
        // region={this.state.region}
      >
        {this.props.users.map((user, index) => {
          if (user.myPosition.latitude !== null) {
            return (
              <Marker
                key={index}
                title={user.id == uid ? 'You' : user.username}
                description={user.id == uid ? '' : user.status}
                coordinate={user.myPosition}
                onCalloutPress={
                  user.id == uid
                    ? () => {
                        console.log(uid);
                      }
                    : // () => {
                      //     console.log(user.username);
                      //   }
                      // this.props.navigation.navigate('chatScreen', item);
                      () => {
                        this.props.navigation.navigate('chatScreen', user);
                      }
                }>
                {user.id == uid ? (
                  <View>
                    <Image source={myMarker} style={styles.markerYou} />
                    {/* <Thumbnail
                      source={{uri: user.image}}
                      style={
                        user.status == 'online'
                          ? styles.markerOnline
                          : styles.markerOffline
                      }
                    /> */}
                  </View>
                ) : (
                  <View>
                    <Thumbnail
                      small
                      source={{uri: user.image}}
                      style={
                        user.status == 'online'
                          ? styles.markerOnline
                          : styles.markerOffline
                      }
                    />
                  </View>
                )}
              </Marker>
            );
          }
        })}
      </MapView>
    );
  }
}

export default myMaps;

const styles = StyleSheet.create({
  mapstyle: {
    width: '100%',
    height: '89%',
  },
  mapCoor: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 50,
    justifyContent: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
  },
  markerYou: {
    width: 40,
    height: 40,
  },
  name: {
    fontSize: 10,
    textAlign: 'center',
    marginBottom: '2%',
  },
  markerOnline: {
    borderWidth: 2,
    borderColor: '#42b72a',
  },
  markerOffline: {
    borderWidth: 2,
    borderColor: 'gray',
  },
});
