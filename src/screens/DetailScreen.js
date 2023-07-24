import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Images from '../constant/Images';
import {useNavigation} from '@react-navigation/native';
import Globals from '../constant/Globals';
import firestore from '@react-native-firebase/firestore';

const DetailScreen = () => {
  const navigation = useNavigation();
  const [attendance, setAttendance] = useState(false);
  console.log('item ====>>', Globals.SELECTED_ID);
  // Button Actions
  const backButtonAction = () => {
    console.log('goback Navigation......');
    navigation.goBack();
  };
  const addDataBase = async () => {
    const selectedItemId = Globals.SELECTED_ID._id;
    console.log('SELECTED_ID',selectedItemId);
    try {
      firestore()
        .collection('Sample Data')
        .doc('Data')
        .collection('data')
        .doc(selectedItemId)
        .update({
          attendance: true,
        })
        .then(() => {
          Alert.alert('Success', 'Successfully added attendance', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => navigation.goBack()},
          ]);
        });
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => backButtonAction()}>
          <Image style={styles.backArrow} source={Images.BACK_ARROW_IMAGE} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Detail of Registered Member</Text>
      </View>

      {/* Name feild */}
      <View style={{marginTop: responsiveHeight(1)}}>
        <TextInput
          style={{
            color: 'black',
            borderBottomWidth: 1,
            width: responsiveWidth(85),
            marginHorizontal: 30,
            marginTop: 20,
          }}
          placeholder={Globals.SELECTED_ID.name}
          placeholderTextColor={'black'}
          editable={false}
        />
      </View>
      {/* Roll no feild */}
      <View style={{marginTop: responsiveHeight(2)}}>
        <TextInput
          style={{
            color: 'black',
            borderBottomWidth: 1,
            width: responsiveWidth(85),
            marginHorizontal: 30,
            marginTop: 20,
          }}
          placeholder={Globals.SELECTED_ID.rollNo}
          placeholderTextColor={'black'}
          editable={false}
        />
      </View>
      {/* batch */}
      <View style={{marginTop: responsiveHeight(2)}}>
        <TextInput
          style={{
            color: 'black',
            borderBottomWidth: 1,
            width: responsiveWidth(85),
            marginHorizontal: 30,
            marginTop: 20,
          }}
          placeholder={Globals.SELECTED_ID.batch}
          placeholderTextColor={'black'}
          editable={false}
        />
      </View>
      {/* email */}
      <View style={{marginTop: responsiveHeight(2)}}>
        <TextInput
          style={{
            color: 'black',
            borderBottomWidth: 1,
            width: responsiveWidth(85),
            marginHorizontal: 30,
            marginTop: 20,
          }}
          placeholder={Globals.SELECTED_ID.email}
          placeholderTextColor={'black'}
          editable={false}
        />
      </View>
      {/* mobile no */}
      <View style={{marginTop: responsiveHeight(2)}}>
        <TextInput
          style={{
            color: 'black',
            borderBottomWidth: 1,
            width: responsiveWidth(85),
            marginHorizontal: 30,
            marginTop: 20,
          }}
          placeholder={Globals.SELECTED_ID.mobileNo}
          placeholderTextColor={'black'}
          editable={false}
        />
      </View>
      {/* payment Type */}
      <View style={{marginTop: responsiveHeight(2)}}>
        <TextInput
          style={{
            color: 'black',
            borderBottomWidth: 1,
            width: responsiveWidth(85),
            marginHorizontal: 30,
            marginTop: 20,
          }}
          placeholder={Globals.SELECTED_ID.paymentType}
          placeholderTextColor={'black'}
          editable={false}
        />
      </View>
      {/* amount received */}
      <View style={{marginTop: responsiveHeight(2)}}>
        <TextInput
          style={{
            color: 'black',
            borderBottomWidth: 1,
            width: responsiveWidth(85),
            marginHorizontal: 30,
            marginTop: 20,
          }}
          placeholder={Globals.SELECTED_ID.amountReceived}
          placeholderTextColor={'black'}
          editable={false}
        />
      </View>
      {/* Transcantion id */}
      <View style={{marginTop: responsiveHeight(2)}}>
        <TextInput
          style={{
            color: 'black',
            borderBottomWidth: 1,
            width: responsiveWidth(85),
            marginHorizontal: 30,
            marginTop: 20,
          }}
          placeholder={Globals.SELECTED_ID.transactionId}
          placeholderTextColor={'black'}
          editable={false}
        />
      </View>
      <View style={{marginTop: responsiveHeight(2)}}>
        {/* <TextInput
          style={{
            color: 'black',
            borderBottomWidth: 1,
            width: responsiveWidth(85),
            marginHorizontal: 30,
            marginTop: 20,
          }}
          placeholder={'Mark the attendance '}
          placeholderTextColor={'black'}
          onChangeText={value => setAttendance(value)}
        /> */}
      </View>
      <TouchableOpacity style={styles.confirmButton} onPress={addDataBase}>
        <Text style={styles.buttonText}>Confirm & Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerText: {
    marginLeft: responsiveHeight(2),
    marginTop: responsiveHeight(1.5),
    color: 'grey',
    fontSize: 16,
  },
  backArrow: {
    marginLeft: 16,
    width: 16,
    height: 16,
    marginTop: responsiveHeight(2),
    resizeMode: 'contain',
  },
  confirmButton: {
    height: responsiveHeight(6),
    width: responsiveWidth(45),
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: responsiveHeight(3),
    marginHorizontal: responsiveHeight(14),
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});
