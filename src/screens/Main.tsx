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
import { observer } from 'mobx-react-lite';

import { useNavigation, useRoute } from '@react-navigation/core';
import eventsStore from '../store/EventsStore';

interface Props {
  navigation: any;
}
// Дата Название описание
function Main({ navigation }: Props) {
    useEffect(() => {
      eventsStore.fetchEvents()
  }, []);

  return (
    <View>
      <Text>Main</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

export default observer(Main);
