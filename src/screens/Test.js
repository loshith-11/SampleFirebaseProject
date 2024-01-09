import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState ,useEffect} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Images from '../constant/Images';
import axios from 'axios';

const Test = () => {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        const fetchData = async () => {
          try {
            const response = await axios.get(
              'http://iroidtechnologies.in/Fressery/Fressery_Api/products'
            );
            setProductData(response.data); // Assuming the response data is an array
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
  const dummyProductListingData = [
    {
      id: '1',
      productName: 'Raw pomegranate ',
      gram: '500 gm',
      price: '250.00',
      productImage: Images.BANANA_IMG,
      grams: '250 gm',
    },
    {
      id: '2',
      productName: 'Raw pomegranate ',
      gram: '500 gm',
      price: '250.00',
      productImage: Images.BANANA_IMG,
      grams: '250 gm',
    },
  ];
  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          height: responsiveHeight(20),
          width: responsiveWidth(90),
          backgroundColor: 'white',
          marginLeft: 20,
          marginTop: 25,
          elevation: 15,
        }}>
        <View style={{marginLeft: 25, marginTop: 15}}>
          <Image source={item?.productImage} style={{height: 70, width: 70}} />
        </View>
        <View style={{marginTop: -100}}>
          <Text
            style={{
              fontSize: 18,
              marginLeft: responsiveHeight(15),
              marginTop: responsiveHeight(5),
              color: 'black',
            }}>
            {item?.productName}
          </Text>
        </View>
        <Text style={{color: 'black', marginLeft: responsiveHeight(15)}}>
          size
        </Text>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              width: '15%',
              height: 25,
              backgroundColor: 'white',
              marginLeft: responsiveHeight(15),
              borderRadius: 10,
              borderWidth: 0.5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'black', fontSize: 10}}>{item?.gram}</Text>
          </View>
          <View
            style={{
              width: '15%',
              height: 25,
              backgroundColor: 'white',
              marginLeft: responsiveHeight(2),
              borderRadius: 10,
              borderWidth: 0.5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'black', fontSize: 10}}>{item?.grams}</Text>
          </View>
        </View>
        <View
          style={{
            height: responsiveHeight(4),
            width: responsiveWidth(20),
            backgroundColor: 'lightgrey',
            position: 'absolute',
            left: responsiveHeight(12),
            top: responsiveHeight(13),
            flexDirection: 'row',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: responsiveHeight(1),
            }}>
            <Image source={Images.MINUS_ICON} style={{tintColor: 'black'}} />
          </TouchableOpacity>
          <Text style={{color: 'black'}}>0</Text>
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: responsiveHeight(1),
            }}>
            <Image
              source={Images.ADD_ICON}
              style={{
                tintColor: 'black',
                height: 20,
                width: 20,
              }}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            height: responsiveHeight(4),
            width: responsiveWidth(25),
            backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            left: responsiveHeight(25),
            top: responsiveHeight(13),
            borderRadius: 6,
          }}>
          <Text
            style={{
              fontSize: responsiveFontSize(1.5),
              color: Colors.WHITE_COLOR,
              fontWeight: '700',
            }}>
            Add to cart
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{backgroundColor: 'white'}}>
      <View
        style={{
          backgroundColor: 'red',
          height: 125,
          width: '100%',
          flexDirection: 'row',
        }}>
        <Text style={{marginHorizontal: 45, color: 'white', marginTop: 15}}>
          PLAIN
        </Text>
        <Text style={{marginHorizontal: 45, color: 'white', marginTop: 15}}>
          MIX
        </Text>
        <Text style={{marginHorizontal: 45, color: 'white', marginTop: 15}}>
          GREEN
        </Text>
      </View>
      <View style={{marginTop:-95}}>
        <FlatList
          data={dummyProductListingData}
          renderItem={renderItem}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
        />
      </View>
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({});
