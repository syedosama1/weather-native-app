import React, { useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Cards from './Cards';
import { deviceHeight, deviceWidth } from './Dimensions';

export default function Home(props) {
  const [city, setCity] = useState('');
  const cities = [
    {
      name: 'New Delhi',
      image: require('../assets/images/image3.webp'),
    },
    {
      name: 'New York',
      image: require('../assets/images/image4.jpg'),
    },
    {
      name: 'London',
      image: require('../assets/images/image5.webp'),
    },
    {
      name: 'San Francisco',
      image: require('../assets/images/image6.jpg'),
    },
    {
      name: 'New Jersey',
      image: require('../assets/images/image7.webp'),
    },
  ];

  return (
    <View>
      <Image
        source={require('../assets/images/background.jpg')}
        style={{ height: deviceHeight, width: deviceWidth }}
        imageStyle={{ opacity: 0.6, backgroundColor: 'black' }}
      />
      <View style={{ position: 'absolute' }}>
        <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
          <Icon name="menu" size={46} color="white" />
        </View>
        <View style={{ paddingHorizontal: 20, marginTop: 100 }}>
          <Text style={{ fontSize: 40, color: 'white' }}>Hello S.G.</Text>
          <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>
            Search the city by the name
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 50,
              borderWidth: 1,
              borderColor: 'white',
              marginTop: 16,
              paddingHorizontal: 10,
            }}>
            <TextInput
              value={city}
              onChangeText={(val) => setCity(val)}
              placeholder="Search City"
              placeholderTextColor="white"
              style={{ paddingHorizontal: 10, color: 'white', fontSize: 16 }}
            />
            <TouchableOpacity onPress={() => props.navigation.navigate('Details', { name: city })}>
              <Icon name="search" size={22} color="white" />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              color: 'white',
              fontSize: 25,
              paddingHorizontal: 10,
              marginTop: 20, // Changed marginTop to 20 for better spacing
              marginBottom: 20,
            }}>
            My Locations
          </Text>
          <FlatList
            horizontal
            data={cities}
            renderItem={({ item }) => (
              <Cards name={item.name} image={item.image} navigation={props.navigation} />
            )}
            keyExtractor={(item) => item.name} // Added keyExtractor to prevent warning
          />
        </View>
      </View>
    </View>
  );
}
