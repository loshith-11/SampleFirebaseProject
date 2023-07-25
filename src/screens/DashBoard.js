import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Images from '../constant/Images';
import Helpers from '../helpers/Helpers';
import auth from '@react-native-firebase/auth';

const DashBoard = () => {
  const navigation = useNavigation();
  const animation = useRef(new Animated.Value(0)).current;
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [dataLength, setDataLength] = useState(0);
  const [onlinePaymentTotal, setOnlinePaymentTotal] = useState(0);
  const [cashPaymentTotal, setCashPaymentTotal] = useState(0);
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [user, setUser] = useState();

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      console.log('useFocusEffect called');
      return () => {
        // Cleanup code, if any (optional)
      };
    }, []),
  );
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      console.log('user', JSON.stringify(user));
      setUser(user);
    });

    return subscriber;
  }, []);
  // greeting value
  var greeting = 'Good morning';
  greeting = Helpers.getGreeting();

  const toggleButton = () => {
    let toValue = isButtonClicked ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();
    setIsButtonClicked(!isButtonClicked);
  };
  const styleOne = {
    transform: [
      {scale: animation},
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -110],
        }),
      },
    ],
  };
  const styleTwo = {
    transform: [
      {scale: animation},
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -180],
        }),
      },
    ],
  };
  const styleThree = {
    transform: [
      {scale: animation},
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -250],
        }),
      },
    ],
  };
  const fetchData = async () => {
    const dataArray = await getDataBase();
    setDataLength(dataArray.length);
    calculateTotals(dataArray);
    const attendedArray = dataArray.filter(item => item.attendance === true);
    const count = attendedArray.length;
    setAttendanceCount(count);
    console.log('datarray====', dataArray);
  };

  // function called for get database from cloud firestore
  const getDataBase = async () => {
    let array = [];
    const response = await firestore()
      .collection('Sample Data')
      .doc('Data')
      .collection('data')
      .get();
    response?._docs?.map((item, index) => {
      let obj = {};
      let arr = item?._ref?._documentPath?._parts.slice(-1).pop();
      obj = item?._data;
      obj._id = arr;
      console.log('id===>', arr);
      array.push(obj);
    });
    return array;
  };
  // calculate amount from array of object based on payment type
  const calculateTotals = dataArray => {
    let onlineTotal = 0;
    let cashTotal = 0;
    dataArray.forEach(item => {
      if (item.paymentType === 'Online') {
        onlineTotal += parseInt(item.amountReceived);
        // console.log(item.amountReceived);
      } else if (item.paymentType === 'By cash') {
        cashTotal += parseInt(item.amountReceived);
      }
    });
    setOnlinePaymentTotal(onlineTotal);
    setCashPaymentTotal(cashTotal);
  };

  return (
    <View style={styles.container}>
      <View style={styles.secondBoxShape}>
        <Text style={{marginVertical: 5, fontSize: 22, color: 'black'}}>
          Hi Admin
        </Text>
        <Text style={{fontSize: 15, color: 'black'}}>{greeting}</Text>
      </View>
      {/* total Attendies, registered */}
      <View style={styles.boxView}>
        <View style={styles.boxShape}>
          <Image
            source={Images.ATTENDANCE_ICON}
            style={{
              width: responsiveWidth(8),
              height: responsiveHeight(5),
              tintColor: 'black',
            }}
          />
          <Text style={styles.boxText}> Total Attendies</Text>
          <Text style={styles.boxNumberText}>{attendanceCount}</Text>
        </View>
        <View style={[styles.boxShape, {marginLeft: responsiveHeight(5)}]}>
          <Image
            source={Images.REGISTERED_MEMBER_ICON}
            style={{
              width: responsiveWidth(10),
              height: responsiveHeight(5),
              tintColor: 'black',
            }}
          />
          <Text style={styles.boxText}>Registered</Text>
          <Text style={styles.boxNumberText}>{dataLength}</Text>
        </View>
      </View>
      {/* online Payment, Cash Received */}
      <View style={styles.boxView}>
        <View style={styles.boxShape}>
          <Image
            source={Images.ONLINE_PAYMENT}
            style={{
              width: responsiveWidth(10),
              height: responsiveHeight(5),
              tintColor: 'black',
            }}
          />
          <Text style={styles.boxText}>Online Payment</Text>
          <Text style={styles.boxNumberText}>Rs:{onlinePaymentTotal}</Text>
        </View>
        <View style={[styles.boxShape, {marginLeft: responsiveHeight(5)}]}>
          <Image
            source={Images.CASH_ON_HAND}
            style={{
              width: responsiveWidth(9),
              height: responsiveHeight(5),
              tintColor: 'black',
            }}
          />
          <Text style={styles.boxText}>Cash Received</Text>
          <Text style={styles.boxNumberText}> Rs:{cashPaymentTotal}</Text>
        </View>
      </View>
      {/* Buttons */}
      <View style={{marginTop: responsiveHeight(5)}}>
        <TouchableOpacity
          style={styles.createNewButton}
          onPress={() => navigation.navigate('CreateNewMember')}>
          <Image
            source={Images.ADD_MEMBER_ICON}
            style={{
              width: responsiveWidth(10),
              height: responsiveHeight(5),
              position: 'absolute',
              left: 50,
              tintColor: 'black',
            }}
          />
          <Text style={styles.buttonText}>Create new Member</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.createNewButton}
          onPress={() => navigation.navigate('RegisteredScreen')}>
          <Image
            source={Images.REGISTERED_MEMBER_ICON}
            style={{
              width: responsiveWidth(10),
              height: responsiveHeight(5),
              position: 'absolute',
              left: 55,
              tintColor: 'black',
            }}
          />
          <Text style={styles.buttonText}>Registered</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.createNewButton}
          onPress={() => navigation.navigate('ProfileScreen')}>
          <Image
            source={Images.MY_PROFILE_ICON}
            style={{
              width: responsiveWidth(6),
              height: responsiveHeight(3),
              position: 'absolute',
              left: 63,
              tintColor: 'black',
            }}
          />
          <Text style={styles.buttonText}>My Profile</Text>
        </TouchableOpacity>
      </View>
      {/* <View
        style={{
          position: 'absolute',
          bottom: 0,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 0,
            marginBottom: 10,
          }}
          onPress={() => navigation.navigate('CreateNewMember')}>
          <Animated.View
            style={[
              {
                width: responsiveWidth(85),
                height: responsiveHeight(8),
                backgroundColor: 'lightblue',
                justifyContent: 'center',
                alignItems: 'center',
              },
              styleThree,
            ]}>
            <Text style={{fontSize: 18, color: 'black'}}>
              Create new Member
            </Text>
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 0,
            marginBottom: 10,
          }} onPress={() => navigation.navigate('RegisteredScreen')}>
          <Animated.View
            style={[
              {
                width: responsiveWidth(85),
                height: responsiveHeight(8),
                backgroundColor: 'lightblue',
                justifyContent: 'center',
                alignItems: 'center',
              },
              styleTwo,
            ]}>
            <Text style={{fontSize: 18, color: 'black'}}>Registered</Text>
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 0,
            marginBottom: 10,
          }}
          onPress={() => navigation.navigate('ProfileScreen')}>
          <Animated.View
            style={[
              {
                width: responsiveWidth(85),
                height: responsiveHeight(8),
                backgroundColor: 'lightblue',
                justifyContent: 'center',
                alignItems: 'center',
              },
              styleOne,
            ]}>
            <Text style={{fontSize: 18, color: 'black'}}>My Profile</Text>
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginBottom: 10,
          }}
          onPress={toggleButton}>
          <Animated.View
            style={{
              width: responsiveWidth(100),
              height: responsiveHeight(9),
              backgroundColor: 'lightblue',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, color: 'black'}}>Menu</Text>
          </Animated.View>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default DashBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  boxView: {
    flexDirection: 'row',
  },
  boxShape: {
    height: responsiveHeight(15),
    width: responsiveWidth(35),
    backgroundColor: '#ebc249',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(5),
    marginLeft: responsiveHeight(5),
    marginRight: responsiveHeight(1),
    borderRadius: 5,
  },
  secondBoxShape: {
    height: responsiveHeight(10),
    width: responsiveWidth(85),
    marginTop: responsiveHeight(2),
    marginLeft: responsiveHeight(4),
  },
  createNewButton: {
    height: responsiveHeight(8),
    width: responsiveWidth(82),
    backgroundColor: '#ebc249',
    marginLeft: responsiveHeight(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(5),
    flexDirection: 'row',
    borderRadius: 5,
  },
  boxText: {
    color: 'white',
    fontSize: 13,
  },
  boxNumberText: {
    color: 'white',
    fontSize: 19,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
});
