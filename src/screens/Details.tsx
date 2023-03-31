import React, { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  Platform,
  TouchableOpacity,
  Image,
  View,
  Text,
} from 'react-native';
// import {
//   SafeAreaView,
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/core';

function Details() {
  const navigation = useNavigation();

  useEffect(() => {}, []);

  return (
    <View>
      <Text>Details</Text>
    </View>
  );
}

export default Details;
