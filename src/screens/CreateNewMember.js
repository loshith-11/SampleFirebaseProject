import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Images from '../constant/Images';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Helpers from '../helpers/Helpers';

const CreateNewMember = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [batch, setBatch] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [amountReceived, setAmountReceived] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [nameError, setNameError] = useState('');
  const [rollNoError, setRollNoError] = useState('');
  const [batchError, setBatchError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileNoError, setMobileNoError] = useState('');
  const [paymentTypeError, setPaymentTypeError] = useState('');
  const [amountReceivedError, setAmountReceivedError] = useState('');
  const [transactionIdError, setTransactionIdError] = useState('');

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const paymentTypes = ['Online', 'By cash'];

  const nameRef = useRef();
  const rollNoRef = useRef();
  const batchRef = useRef();
  const emailRef = useRef();
  const mobileNoRef = useRef();
  const paymentTypeRef = useRef();
  const amountReceivedRef = useRef();
  const transactionIdRef = useRef();

  const handleSubmit = () => {
    console.log('handleSubimt called')
    if (isValidFields() === true) {
      addDataBase();
    }
  };

  const isValidFields = () => {
    var isValidName = 0;
    var isValidRollNo = 0;
    var isValidBatch = 0;
    var isValidEmail = 0;
    var isValidMobileNo = 0;
    var isValidPaymentType = 0;
    var isValidAmountReceived = 0;
    var isValidTransactionId = 0;

    if (name.trim().length === 0) {
      isValidName = 0;
      setNameError('please enter the name');
    } else {
      isValidName = 1;
      setNameError('');
    }

    if (rollNo.trim().length === 0) {
      isValidRollNo = 0;
      setRollNoError('please enter the Roll No');
    } else if (rollNo.trim().length < 2 || rollNo.trim().length > 4) {
      isValidRollNo = 0;
      setRollNoError('please enter the valid Roll No');
    } else {
      isValidRollNo = 1;
      setRollNoError('');
    }

    if (batch.trim().length === 0) {
      isValidBatch = 0;
      setBatchError('please enter the batch');
    } else if (batch.trim().length < 4 || batch.trim().length > 5) {
      isValidBatch = 0;
      setBatchError('please enter the valid batch');
    } else {
      isValidBatch = 1;
      setBatchError('');
    }
    if (email.trim().length === 0) {
      isValidEmail = 0;
      setEmailError('Please enter email address');
    } else if (Helpers.isEmailValid(email) === false) {
      isValidEmail = 0;
      setEmailError('Please enter a valid email');
    } else {
      isValidEmail = 1;
      setEmailError('');
    }

    if (mobileNo.trim().length === 0) {
      isValidMobileNo = 0;
      setMobileNoError('Please enter phone number');
    } else if (mobileNo.trim().length < 10 || mobileNo.trim().length > 12) {
      isValidMobileNo = 0;
      setMobileNoError('Please enter valid phone number');
    } else {
      isValidMobileNo = 1;
      setMobileNoError('');
    }
    if (paymentType.trim().length === 0) {
      isValidPaymentType = 0;
      setPaymentTypeError('Please select payment Type');
    } else {
      isValidPaymentType = 1;
      setPaymentTypeError('');
    }

    if (amountReceived.trim().length === 0) {
      isValidAmountReceived = 0;
      setAmountReceivedError('please enter the amount');
    } else if (batch.trim().length < 4 || batch.trim().length > 5) {
      isValidAmountReceived = 0;
      setAmountReceivedError('Please enter valid amount');
    } else {
      isValidAmountReceived = 1;
      setAmountReceivedError('');
    }
    if (transactionId.trim().length === 0) {
      isValidTransactionId = 0;
      setTransactionIdError('please enter the TransactionId');
    // } else if (batch.trim().length < 12 || batch.trim().length > 14) {
    //   isValidTransactionId = 0;
    //   setTransactionIdError('please enter valid  TransactionId');
    } else {
      isValidTransactionId = 1;
      setTransactionIdError('');
    }
    if (
      isValidName === 1 &&
      isValidRollNo === 1 &&
      isValidBatch === 1 &&
      isValidEmail === 1 &&
      isValidMobileNo === 1 &&
      isValidPaymentType === 1 &&
      isValidAmountReceived === 1 &&
      isValidTransactionId === 1
    ) {
      console.log('Form submitted');
      return true;
    } else {

      return false;
    }
  };
  // Function to handle form submission
  // const handleSubmit = () => {
  //   // Perform validation here
  //   if (
  //     !name ||
  //     !rollNo ||
  //     !batch ||
  //     !email ||
  //     !mobileNo ||
  //     !paymentType ||
  //     !amountReceived ||
  //     !transactionId
  //   ) {
  //     setNameError('please enter the name');
  //     setRollNoError('please enter the Roll No');
  //     setBatchError('please enter the batch');
  //     setEmailError('please enter the email');
  //     setMobileNoError('please enter the Mobile Number');
  //     setPaymentTypeError('please select the payment type');
  //     setAmountReceivedError('please enter the amount');
  //     setTransactionIdError('please enter the TransactionId');

  //     // Display an error message or handle the validation error
  //     console.log('Please fill in all the required fields');
  //     return;
  //   }
  //   const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //   if (!emailPattern.test(email)) {
  //     setEmailError('Please enter a valid email address');
  //     console.log('Invalid email format');
  //     return;
  //   }

  //   // Submit the form or perform further actions
  //   console.log('Form submitted');
  //   addDataBase();
  // };

  // Button Actions
  const backButtonAction = () => {
    console.log('goback Navigation......');
    navigation.goBack();
  };

  // Function to handle dropdown icon press
  const handleDropdownIconPress = () => {
    setIsDropdownOpen(!isDropdownOpen);
    console.log('pressed');
  };

  // Function to handle payment type selection
  const handlePaymentTypeSelect = selectedType => {
    setPaymentType(selectedType);
    setIsDropdownOpen(false);
    setPaymentTypeError('');
  };

  // add data inside cloud firestore
  const addDataBase = async () => {
    try {
      firestore()
        .collection('Sample Data')
        .doc('Data')
        .collection('data')
        .add({
          name: name,
          rollNo: rollNo,
          batch: batch,
          email: email,
          mobileNo: mobileNo,
          paymentType: paymentType,
          amountReceived: amountReceived,
          transactionId: transactionId,
        })
        .then(() => {
          Alert.alert('Success', 'Successfully created new Member', [
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
        <Text style={styles.headingText}>Create a new member</Text>
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
          ref={nameRef}
          placeholder="Name"
          placeholderTextColor={'black'}
          value={name}
          onChangeText={value => setName(value)}
        />
        <Text style={{marginLeft: responsiveHeight(27), color: 'red'}}>
          {nameError}
        </Text>
      </View>
      {/* Roll no feild */}
      <View style={{marginTop: responsiveHeight(0)}}>
        <TextInput
          style={{
            color: 'black',
            borderBottomWidth: 1,
            width: responsiveWidth(85),
            marginHorizontal: 30,
            marginTop: 20,
          }}
          placeholder="Roll no"
          placeholderTextColor={'black'}
          ref={rollNoRef}
          value={rollNo}
          onChangeText={value => setRollNo(value)}
          keyboardType="numeric"
        />
        <Text style={{marginLeft: responsiveHeight(26), color: 'red'}}>
          {rollNoError}
        </Text>
      </View>
      {/* batch */}
      <View style={{marginTop: responsiveHeight(0)}}>
        <TextInput
          style={{
            color: 'black',
            borderBottomWidth: 1,
            width: responsiveWidth(85),
            marginHorizontal: 30,
            marginTop: 20,
          }}
          placeholder="Batch"
          placeholderTextColor={'black'}
          ref={batchRef}
          value={batch}
          onChangeText={value => setBatch(value)}
          keyboardType="numeric"
        />
        <Text style={{marginLeft: responsiveHeight(27), color: 'red'}}>
          {batchError}
        </Text>
      </View>
      {/* email */}
      <View style={{marginTop: responsiveHeight(0)}}>
        <TextInput
          style={{
            color: 'black',
            borderBottomWidth: 1,
            width: responsiveWidth(85),
            marginHorizontal: 30,
            marginTop: 20,
          }}
          placeholder="Email"
          placeholderTextColor={'black'}
          ref={emailRef}
          value={email}
          onChangeText={value => setEmail(value)}
          keyboardType="email-address"
        />
        <Text style={{marginLeft: responsiveHeight(23), color: 'red'}}>
          {emailError}
        </Text>
      </View>
      {/* mobile no */}
      <View style={{marginTop: responsiveHeight(0)}}>
        <TextInput
          style={{
            color: 'black',
            borderBottomWidth: 1,
            width: responsiveWidth(85),
            marginHorizontal: 30,
            marginTop: 20,
          }}
          placeholder="Mobile no"
          placeholderTextColor={'black'}
          ref={mobileNoRef}
          value={mobileNo}
          onChangeText={value => setMobileNo(value)}
          keyboardType="phone-pad"
        />
        <Text style={{marginLeft: responsiveHeight(23), color: 'red'}}>
          {mobileNoError}
        </Text>
      </View>
      {/* payment Type */}
      <View>
        <TouchableOpacity onPress={handleDropdownIconPress}>
          <Image style={styles.dropDownImage} source={Images.DROPDOWN_ICON} />
        </TouchableOpacity>
        <View>
          <TextInput
            style={{
              color: 'black',
              borderBottomWidth: 1,
              width: responsiveWidth(85),
              marginHorizontal: 30,
              marginTop: 20,
            }}
            placeholder="Payment Type"
            placeholderTextColor={'black'}
            ref={paymentTypeRef}
            value={paymentType}
            onChangeText={value => setPaymentType(value)}
            editable={false}
          />
        </View>
        {isDropdownOpen && (
          <View style={styles.dropDownBox}>
            {paymentTypes.map(type => (
              <TouchableOpacity
                key={type}
                onPress={() => handlePaymentTypeSelect(type)}
                style={{
                  paddingLeft: responsiveHeight(2),
                  marginTop: responsiveHeight(2),
                }}>
                <Text style={styles.dropDownText}>{type}</Text>
              </TouchableOpacity>
            ))}
            {/* <TouchableOpacity
              onPress={() => handlePaymentTypeSelect(paymentType)}
              style={{
                paddingLeft: responsiveHeight(2),
                marginTop: responsiveHeight(2),
              }}>
              <Text style={styles.dropDownText}>By cash</Text>
            </TouchableOpacity> */}
          </View>
        )}

        <Text style={{marginLeft: responsiveHeight(22), color: 'red'}}>
          {paymentTypeError}
        </Text>
      </View>
      {/* amount received */}
      <View style={{marginTop: responsiveHeight(0)}}>
        <TextInput
          style={{
            color: 'black',
            borderBottomWidth: 1,
            width: responsiveWidth(85),
            marginHorizontal: 30,
            marginTop: 20,
          }}
          placeholder="Amount Received"
          placeholderTextColor={'black'}
          ref={amountReceivedRef}
          value={amountReceived}
          onChangeText={value => setAmountReceived(value)}
          keyboardType="numeric"
        />
        <Text style={{marginLeft: responsiveHeight(25), color: 'red'}}>
          {amountReceivedError}
        </Text>
      </View>
      {/* Transcantion id */}
      <View style={{marginTop: responsiveHeight(0)}}>
        <TextInput
          style={{
            color: 'black',
            borderBottomWidth: 1,
            width: responsiveWidth(85),
            marginHorizontal: 30,
            marginTop: 20,
          }}
          placeholder="Transaction Id"
          placeholderTextColor={'black'}
          ref={transactionIdRef}
          value={transactionId}
          onChangeText={value => setTransactionId(value)}
          keyboardType="numeric"
        />
        <Text style={{marginLeft: responsiveHeight(20), color: 'red'}}>
          {transactionIdError}
        </Text>
      </View>
      <TouchableOpacity style={styles.buttonStyle} onPress={handleSubmit}>
        <Text style={{color: 'white'}}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateNewMember;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headingText: {
    marginTop: responsiveHeight(1.5),
    marginLeft: responsiveHeight(3),
    fontSize: 16,
    color: 'grey',
  },
  buttonStyle: {
    height: responsiveHeight(5),
    width: responsiveWidth(55),
    backgroundColor: '#ebc249',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: responsiveHeight(12),
    marginTop: responsiveHeight(4),
  },
  backArrow: {
    marginLeft: 16,
    width: 16,
    height: 16,
    marginTop: responsiveHeight(2),
    resizeMode: 'contain',
  },
  dropDownImage: {
    position: 'absolute',
    left: responsiveHeight(43),
    top: responsiveHeight(6),
  },
  dropDownBox: {
    height: responsiveHeight(12),
    width: responsiveWidth(85),
    backgroundColor: 'white',
    marginLeft: responsiveHeight(3.6),
    elevation: 10,
    borderWidth: 0.5,
  },
  dropDownText: {
    color: 'black',
    fontSize: 15,
    borderBottomWidth: 0.2,
    borderBottomColor: 'lightgrey',
  },
});
