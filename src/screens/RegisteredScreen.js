import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Images from '../constant/Images';
import Globals from '../constant/Globals';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const RegisteredScreen = () => {
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);
  const [myData, setMyData] = useState([]);

  const searchRef = useRef();

  // const dummyData = [
  //   {
  //     id: '1',
  //     name: 'Ram',
  //     rollNo: '25',
  //     batch: '2020',
  //     email: 'abcd@gmail.com',
  //     mobileNumber: '7934658955',
  //     paymentType: 'online',
  //     amountReceived: '5000',
  //     transactionId: '669856234152',
  //   },
  //   {
  //     id: '2',
  //     name: 'Anu',
  //     rollNo: '26',
  //     batch: '2020',
  //     email: 'abcd@gmail.com',
  //     mobileNumber: '7934658955',
  //     paymentType: 'online',
  //     amountReceived: '5000',
  //     transactionId: '669856234152',
  //   },
  //   {
  //     id: '3',
  //     name: 'Raj kumar',
  //     rollNo: '27',
  //     batch: '2020',
  //     email: 'abcd@gmail.com',
  //     mobileNumber: '7934658955',
  //     paymentType: 'online',
  //     amountReceived: '5000',
  //     transactionId: '669856234152',
  //   },
  //   {
  //     id: '4',
  //     name: 'Thomas',
  //     rollNo: '28',
  //     batch: '2020',
  //     email: 'abcd@gmail.com',
  //     mobileNumber: '7934658955',
  //     paymentType: 'online',
  //     amountReceived: '5000',
  //     transactionId: '669856234152',
  //   },
  // ];

  useEffect(() => {
    getDataBase().then(res => {
      setMyData(res);
      setFilteredData(res);
      console.log('response from database==..',res);
    });
    console.log('useEffect called');
    console.log('myData++++>>>', myData);
  }, []);
  
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
  // Function to handle search input change
  const handleSearch = text => {
    setSearchQuery(text);
    filterData(text);
    // filterData(searchQuery);
  };

  // Function to filter the data based on search query
  const filterData = text => {
    const filtered = myData.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredData(filtered);
    setIsSearchEmpty(filtered.length === 0);
  };

  // Button Actions
  const backButtonAction = () => {
    console.log('goback Navigation......');
    navigation.goBack();
  };

  const Item = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.memberBox}
        onPress={() => {
          Globals.SELECTED_ID = item;
          navigation.navigate('DetailScreen');
        }}>
        <Image source={Images.DEMO_USER_IMAGE} style={styles.defaultImage} />
        <View
          style={{
            marginTop: 15,
            marginHorizontal: responsiveHeight(15),
            flexDirection: 'row',
          }}>
          <Text style={{color: 'black'}}>Name:</Text>
          <Text style={{color: 'black'}}>{item.name}</Text>
        </View>
        <View
          style={{
            marginTop: 15,
            marginHorizontal: responsiveHeight(15),
            flexDirection: 'row',
          }}>
          <Text style={{color: 'black'}}>Roll No:</Text>
          <Text style={{color: 'black'}}>{item.rollNo}</Text>
        </View>
        <View
          style={{
            marginTop: 15,
            marginHorizontal: responsiveHeight(15),
            flexDirection: 'row',
          }}>
          <Text style={{color: 'black'}}>Batch:</Text>
          <Text style={{color: 'black'}}>{item.batch}</Text>
        </View>
        {/* <TouchableOpacity
          style={styles.moreButton}
          onPress={() => {
            Globals.SELECTED_ID = item;
            navigation.navigate('DetailScreen');
          }}>
          <Text>More Detail</Text>
        </TouchableOpacity> */}
      </TouchableOpacity>
    );
  };

  //final return
  return (
    <ScrollView style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => backButtonAction()}>
          <Image style={styles.backArrow} source={Images.BACK_ARROW_IMAGE} />
        </TouchableOpacity>
        <Text style={styles.mainText}>Registered Members</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchButton}>
          <Image
            style={{tintColor: 'grey', marginBottom: 4}}
            source={Images.SEARCH_LENS_ICON}
          />
        </View>
        <TextInput
          style={{
            flex: 1,
            backgroundColor: 'white',
            paddingLeft: 5,
            color: 'black',
          }}
          ref={searchRef}
          placeholder="Search Member"
          placeholderTextColor={'black'}
          value={searchQuery}
          onChangeText={handleSearch}
        />

        {searchQuery == '' ? null : (
          <TouchableOpacity
            style={styles.clossButton}
            onPress={() => handleSearch('')}>
            <Image source={Images.CLOSE_ROUND_ICON} />
          </TouchableOpacity>
        )}
      </View>

      {isSearchEmpty ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: responsiveHeight(15),
          }}>
          <Text style={styles.emptyText}>No Result Found !</Text>
        </View>
      ) : (
        <View>
          <FlatList
            data={filteredData}
            renderItem={({item}) => (
              <Item item={item} navigation={navigation} />
            )}
            keyExtractor={item => item.id}
            scrollEnabled={true}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default RegisteredScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainText: {
    marginLeft: responsiveHeight(2),
    marginTop: responsiveHeight(2),
    fontSize: 16,
    color: 'grey',
  },
  searchContainer: {
    height: responsiveHeight(5),
    width: responsiveWidth(86),
    borderWidth: 1,
    borderColor: 'black',
    marginLeft: responsiveHeight(4),
    marginTop: responsiveHeight(3),
    borderRadius: 5,
    fontSize: 14,
    flexDirection: 'row',
  },
  searchButton: {
    width: 30,
    height: 30,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    marginLeft: 10,
    backgroundColor: 'white',
  },
  clossButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    backgroundColor: 'white',
  },
  memberBox: {
    height: responsiveHeight(14),
    width: responsiveWidth(90),
    elevation: 3,
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    marginTop: responsiveHeight(2),
    marginLeft: responsiveHeight(3),
  },
  moreButton: {
    height: responsiveHeight(3),
    width: responsiveWidth(25),
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: responsiveHeight(30),
    marginTop: responsiveHeight(6),
  },
  backArrow: {
    marginLeft: 16,
    width: 16,
    height: 16,
    marginTop: responsiveHeight(2.8),
    resizeMode: 'contain',
  },
  emptyText: {
    color: 'red',
    fontSize: 25,
  },
  defaultImage: {
    height: responsiveHeight(8),
    width: responsiveWidth(16),
    position: 'absolute',
    top: 30,
    left: 35,
  },
});
