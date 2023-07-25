import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Images from '../constant/Images';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      console.log('user', JSON.stringify(user));
      setUser(user);
    });

    return subscriber;
  }, []);

  // Button Actions
  const backButtonAction = () => {
    console.log('goback Navigation......');
    navigation.goBack();
  };

  const logout = () => {
    Alert.alert(
      'Logout',
      'Are you sure want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            return null;
          },
        },
        {
          text: 'Confirm',
          onPress: () => {
            auth()
              .signOut()
              .then(
                () =>
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'Auth'}],
                  }),
                // navigation.replace('Auth')
              )
              .catch(error => {
                console.log(error);
                if (error.code === 'auth/no-current-user')
                  // navigation.replace('Auth');
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'Auth'}],
                  });
                else alert(error);
              });
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => backButtonAction()}>
          <Image style={styles.backArrow} source={Images.BACK_ARROW_IMAGE} />
        </TouchableOpacity>
        <Text style={styles.headingText}>My Profile</Text>
      </View>
      <Text style={styles.headingDescription}>About your profile</Text>

      <View style={styles.profileInfoBox}>
        <Text style={styles.welcomeText}>Welcome</Text>
        {user ? (
          <View>
            <Text style={styles.nameText}>{user.displayName}</Text>
            <Text style={styles.emailText}>{user.email}</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

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
  profileInfoBox: {
    height: responsiveHeight(15),
    width: responsiveWidth(95),
    backgroundColor: '#ebc249',
    marginLeft: responsiveHeight(1.5),
    borderRadius: responsiveHeight(1),
    elevation: 5,
  },
  buttonView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: responsiveHeight(35),
  },
  logoutButton: {
    height: responsiveHeight(5),
    width: responsiveWidth(85),
    backgroundColor: '#ebc249',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: responsiveHeight(2),
    marginTop: responsiveHeight(1),
  },
  nameText: {
    fontSize: 18,
    fontWeight: '300',
    color: 'white',
    paddingLeft: responsiveHeight(5),
    marginTop: responsiveHeight(1),
  },
  emailText: {
    fontSize: 16,
    fontWeight: '200',
    color: 'white',
    paddingLeft: responsiveHeight(5),
    marginTop: responsiveHeight(1),
  },
});
