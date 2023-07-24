import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import Images from '../constant/Images';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import auth from '@react-native-firebase/auth';

const UserRegisterScreen = () => {
  const navigation = useNavigation();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errortext, setErrortext] = useState('');
  // Button Actions
  const backButtonAction = () => {
    console.log('goback Navigation......');
    navigation.goBack();
  };

  const handleSubmitButton = () => {
    setErrortext('');
    if (!userName) return alert('Please fill Name');
    if (!email) return alert('Please fill Email');
    if (!password) return alert('Please fill Address');

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log('Registration Successful. Please Login to proceed');
        console.log(user);
        if (user) {
          auth()
            .currentUser.updateProfile({
              displayName: userName,
            })
            .then(() => navigation.replace('Dashboard'))
            .catch(error => {
              alert(error);
              console.error(error);
            });
        }
      })
      .catch(error => {
        console.log(error);
        if (error.code === 'auth/email-already-in-use') {
          setErrortext('That email address is already in use!');
        } else {
          setErrortext(error.message);
        }
      });
  };
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => backButtonAction()}>
          <Image style={styles.backArrow} source={Images.BACK_ARROW_IMAGE} />
        </TouchableOpacity>
        <Text style={styles.headingText}>Register</Text>
      </View>
      <Text style={styles.headingDescription}>New user register here</Text>

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
          placeholder={'Enter name'}
          placeholderTextColor={'black'}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType={'next'}
          autoComplete={'off'}
          blurOnSubmit={false}
          onChangeText={text => setUserName(text)}
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
        {/* <Text style={{marginLeft: responsiveHeight(28), color: 'red'}}>
          {emailError}
        </Text> */}
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
          placeholder={'Enter email'}
          placeholderTextColor={'black'}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType={'next'}
          autoComplete={'off'}
          blurOnSubmit={false}
          onChangeText={text => setEmail(text)}
          onSubmitEditing={() => {
            passwordRef.current.focus();
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
        {/* <Text style={{marginLeft: responsiveHeight(28), color: 'red'}}>
          {emailError}
        </Text> */}
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
          placeholder={'Enter password'}
          placeholderTextColor={'black'}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType={'next'}
          autoComplete={'off'}
          blurOnSubmit={false}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
          //   onSubmitEditing={() => {
          //     passwordRef.current.focus();
          //   }}
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
        {/* <Text style={{marginLeft: responsiveHeight(28), color: 'red'}}>
          {emailError}
        </Text> */}
      </View>

      {errortext != '' ? (
        <Text style={styles.errorTextStyle}> {errortext} </Text>
      ) : null}
      <TouchableOpacity
        onPress={handleSubmitButton}
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
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserRegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backArrow: {
    marginLeft: 16,
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginVertical: responsiveHeight(3),
  },
  headingText: {
    marginVertical: responsiveHeight(2),
    marginLeft: responsiveHeight(3),
    fontSize: 20,
    color: 'grey',
  },
  headingDescription: {
    marginVertical: responsiveHeight(5),
    marginLeft: responsiveHeight(3),
    fontSize: 16,
    color: 'grey',
  },
  errorTextStyle: {
    color: 'red',
    fontSize: 14,
    marginTop: responsiveHeight(5),
    marginLeft: responsiveHeight(12),
  },
});
