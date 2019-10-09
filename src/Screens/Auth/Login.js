import React, {Component, Fragment} from 'react';
import {StyleSheet, View, Text, Image, StatusBar} from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Toast,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';
import firebaseSvc from '../../Config/Firebase';
import {Col, Row} from 'react-native-easy-grid';

// import {login} from '../../Publics/Action/auth';
import Logo from '../../Assets/brand/icon-black.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        email: '',
        password: '',
      },
      showToast: false,
    };
  }

  handleChange = (name, value) => {
    let newFormData = {...this.state.formData};
    newFormData[name] = value;
    this.setState({
      formData: newFormData,
    });
    console.log(newFormData);
  };

  handleSubmit = async () => {
    const {formData} = this.state;
    await firebase
      .auth()
      .signInWithEmailAndPassword(formData.email, formData.password)
      .then(async res => {
        // AsyncStorage.setItem('uid', res.user.uid);
        await firebase
          .database()
          .ref('/user/' + res.user.uid)
          .update({status: 'online'});
        AsyncStorage.setItem('uid', res.user.uid);
        AsyncStorage.setItem('name', res.user.username);
        AsyncStorage.setItem('image', res.user.image);

        Toast.show({
          text: `Welcome ${res.user.username}`,
          buttonText: 'Ok',
          type: 'success',
          position: 'bottom',
          duration: 4000,
          style: styles.toast,
        });

        this.props.navigation.navigate('HomeScreen');
      });
  };

  componentDidMount = async () => {
    await AsyncStorage.getItem('uid', (err, res) => {
      console.log(err, res);
      console.log('ini responnya =', res);
      if (res) {
        this.props.navigation.navigate('HomeScreen');
      }
    });
  };

  render() {
    return (
      <Fragment>
        <StatusBar translucent />
        <Container style={styles.container}>
          <Content showsVerticalScrollIndicator={false}>
            <View style={styles.title}>
              <Image source={Logo} style={styles.image} />
            </View>
            <Form style={styles.formSignin}>
              <Item floatingLabel>
                <Label>Email</Label>
                <Input
                  keyboardType="email-address"
                  autoCompleteType="email"
                  onChangeText={text => this.handleChange('email', text)}
                />
              </Item>
              <Item floatingLabel>
                <Label>Password</Label>
                <Input
                  secureTextEntry={true}
                  onChangeText={text => this.handleChange('password', text)}
                />
              </Item>
              <Button
                full
                dark
                rounded
                style={styles.btnSignin}
                // onPress={() => {
                //   this.props.navigation.navigate('HomeScreen');
                // }}
                onPress={this.handleSubmit}>
                <Text style={styles.textSignin}>Sign In</Text>
              </Button>
            </Form>
            <Row style={styles.foot}>
              <Col>
                <Text
                  style={styles.btnForgot}
                  onPress={() => {
                    this.props.navigation.navigate('SignupScreen');
                  }}>
                  Sign Up
                </Text>
              </Col>
              {/* <Col>
                <Text
                  style={styles.btnForgot}
                  onPress={() => {
                    this.props.navigation.navigate('HomeScreen');
                  }}>
                  as Guest...
                </Text>
              </Col> */}
            </Row>
          </Content>
        </Container>
      </Fragment>
    );
  }
}

export default Login;

// const mapStateToProps = state => {
//   return {
//     user: state.user,
//   };
// };

// export default connect(mapStateToProps)(Login);

let btnSignup = {
  textDecorationLine: 'underline',
  color: '#fb724a',
  fontWeight: 'bold',
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    marginTop: 20,
    resizeMode: 'contain',
  },
  containerHead: {
    height: 0,
  },
  container: {
    marginLeft: 20,
    marginRight: 35,
  },
  title: {
    padding: 10,
    alignItems: 'center',
  },

  btnSignin: {
    marginTop: 50,
    marginLeft: 15,
    backgroundColor: '#fb724a',
  },
  textSignin: {
    color: 'white',
  },
  foot: {
    marginTop: 100,
    marginBottom: 50,
    marginLeft: 15,
  },
  btnSignup: {
    ...btnSignup,
  },
  btnForgot: {
    ...btnSignup,
    textAlign: 'right',
  },
});
