import React, { useEffect } from 'react';
import { Image, View, Text } from 'react-native';
// import {
//   SafeAreaView,
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/core';
// import dd from '../../assets/favicon.png';
function Details(props: any) {
  const route = useRoute<any>();
  const { currentData } = route.params;

  useEffect(() => {}, []);

  return (
    <View>
      <Image
        style={{ width: '80%' }}
        source={require('../../assets/dobro.png')}
      />
      <Text style={{ padding: 18 }}>{JSON.stringify(currentData)}</Text>
    </View>
  );
}

export default Details;
