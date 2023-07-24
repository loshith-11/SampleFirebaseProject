import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAwareScrollView,
  Image,
  StatusBar,
  TextInput,
  BackHandler
} from 'react-native';
import React, {useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import Helpers from '../helpers/Helpers';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import auth from '@react-native-firebase/auth';
import Images from '../constant/Images';

const LoginScreen = () => {
  const navigation = useNavigation();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errortext, setErrortext] = useState('');

  // navigation.reset({
  //   index: 0,
  //   routes: [{name: 'Auth'}],
  // });
  // const isValidInputs = () => {
  //   var _isValidEmail = 0;
  //   var _isValidPassword = 0;
  //   if (email.length <= 0) {
  //     setEmailError('Please enter email');
  //     _isValidEmail = 0;
  //   } else if (Helpers.isEmailValid(email) !== true) {
  //     setEmailError('Invalid email address');
  //     _isValidEmail = 0;
  //   } else {
  //     setEmailError('');
  //     _isValidEmail = 1;
  //   }
  //   if (password.length === 0) {
  //     setPasswordError('Please enter password');
  //     _isValidPassword = 0;
  //   } else if (password.length < 6) {
  //     setPasswordError('Password should have minimum 4 characters');
  //     _isValidPassword = 0;
  //   } else {
  //     setPasswordError('');
  //     _isValidPassword = 1;
  //   }
  //   if (_isValidEmail === 1 && _isValidPassword === 1) {
  //     navigation.navigate('Dashboard');
  //   }
  // };

  
  // Button Actions
  const backButtonAction = () => {
    console.log('goback Navigation......');
    BackHandler.exitApp();
  };

  const handleSubmitPress = () => {
    setErrortext('');
    if (!email) {
      // setErrortext('Please fill Email');
      setEmailError('Please fill Email');
      return;
    }
    if (!password) {
      // setErrortext('Please fill Password');
      setPasswordError('Please fill Password');
      return;
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log(user);
        // If server response message same as Data Matched
        if (user) navigation.replace('Dashboard');
      })
      .catch(error => {
        console.log(error);
        if (error.code === 'auth/invalid-email') setErrortext(error.message);
        else if (error.code === 'auth/user-not-found')
          setErrortext('No User Found');
        else {
          setErrortext('Please check your email id or password');
        }
      });
  };
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
     <TouchableOpacity onPress={() => backButtonAction()}>
          <Image style={styles.backArrow} source={Images.BACK_ARROW_IMAGE} />
        </TouchableOpacity>
      <View style={{alignItems: 'center', marginBottom: 85}}>
        <Text style={{fontSize: 20, color: 'light grey'}}>
          Welcome to login page
        </Text>
      </View>
      <View>
        <TextInput
          style={{
            marginTop: 70,
            marginLeft: 37,
            marginRight: 37,
            height: 40,
            fontSize: 16,
            color: 'black',
            borderBottomWidth: 1,
          }}
          ref={emailRef}
          placeholder={'Username'}
          placeholderTextColor={'black'}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType={'next'}
          autoComplete={'off'}
          blurOnSubmit={false}
          onChangeText={text => setEmail(text)}
          onSubmitEditing={() => {
            emailRef.current.focus();
          }}
        />
        <View
          style={{
            height: 1,
            marginLeft: 37,
            marginRight: 37,
            marginTop: 5,
            backgroundColor: 'light grey',
          }}
        />
        <Text style={{marginLeft: responsiveHeight(28), color: 'red'}}>
          {emailError}
        </Text>
      </View>
      <View
        style={{
          // flexDirection: 'row',
          justifyContent: 'center',
          height: 40,
          marginHorizontal: 20,
        }}>
        <TextInput
          style={{
            marginTop: 70,
            marginLeft: 20,
            marginRight: 20,
            height: 40,
            fontSize: 16,
            color: 'black',
            borderBottomWidth: 1,
          }}
          ref={passwordRef}
          placeholder={'Password'}
          placeholderTextColor={'black'}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType={'next'}
          autoComplete={'off'}
          blurOnSubmit={false}
          onChangeText={text => setPassword(text)}
          onSubmitEditing={() => {
            passwordRef.current.focus();
          }}
        />

        <Text style={{marginLeft: responsiveHeight(23), color: 'red'}}>
          {passwordError}
        </Text>
      </View>

      {errortext != '' ? (
        <Text style={styles.validationText}> {errortext} </Text>
      ) : null}
      <TouchableOpacity
        onPress={handleSubmitPress}
        style={{
          marginTop: 100,
          backgroundColor: 'lightblue',
          width: 141,
          height: 42,
          alignSelf: 'center',
          justifyContent: 'center',
          marginBottom: 30,
        }}>
        <Text
          style={{
            color: 'black',
            alignSelf: 'center',
            fontSize: 16,
          }}>
          Login
        </Text>
      </TouchableOpacity>
      {/* <Text
        style={styles.registerTextStyle}
        onPress={navigation.navigate('RegisterScreen')}>
        New Here ? Register
      </Text> */}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  errorTextStyle: {
    color: 'red',
    fontSize: 14,
    marginTop: responsiveHeight(5),
    marginLeft: responsiveHeight(12),
  },
  validationText: {
    color: 'red',
    fontSize: 14,
    marginTop: responsiveHeight(5),
    marginLeft: responsiveHeight(12),
  },
  registerTextStyle: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  backArrow: {
    marginLeft: 16,
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginVertical: responsiveHeight(3),
    position:'absolute',
    bottom:responsiveHeight(12)
  },
});
