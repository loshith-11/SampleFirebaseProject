import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Images from '../constant/Images';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace(auth().currentUser ? 'Dashboard' : 'Auth');
      // navigation.navigate('Auth');
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={Images.FIREBASE_ICON} />
      <Text style={styles.splashHeading}>Firebase Project</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashHeading: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
});
