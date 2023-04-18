import React from 'react';
import { Image, View, Text, Linking, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRoute } from '@react-navigation/core';
import { IMarkedData } from '../store/EventsStore';

function Details() {
  const route = useRoute<any>();
  const data: IMarkedData = route.params.currentData;

  const message = `Добрый день! Прошу записать меня на "${data.name}" (${data.displayDate})`;
  const onPressWhatsapp = () => {
    Linking.openURL(`whatsapp://send?text=${message}&phone=79686821493'`);
  };
  // const url = 'http://t.me/[bot-address]';
  const onPressTG = () => {
    Linking.openURL(`tg://msg?text=${message}&to=@ZenyaZhenya`);
  };
  const onPressEmail = () => {
    Linking.openURL(
      `mailto://msg?subject=Запись на ${data.displayDate}&body=${message}&to=anton@yandex.ru`
    );
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        height: '100%',
        padding: 23,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: '100%',
          height: 153,
          alignItems: 'center',
          borderRadius: 50,
          overflow: 'hidden',
        }}
      >
        <Image
          style={{
            width: '50%',
            height: '100%',
            resizeMode: 'contain',
            borderRadius: 110,
          }}
          source={require('../../assets/dobro.png')}
        />
      </View>
      <Text style={{ paddingBottom: 12, fontSize: 24, textAlign: 'center' }}>
        {data.name}
      </Text>
      <Text style={{ paddingBottom: 18 }}>{data.displayDate}</Text>
      <Text style={{ paddingBottom: 18, fontSize: 14 }}>
        {data.description}
      </Text>
      <Text style={{ paddingBottom: 12 }}>Записаться на мероприятие:</Text>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          onPress={onPressWhatsapp}
          style={{ paddingBottom: 15 }}
        >
          <Text style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="logo-whatsapp" size={39} color="green" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressTG} style={{ paddingBottom: 15 }}>
          <Text>
            <FontAwesome name="telegram" size={39} color="#3bb6f2" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressEmail} style={{ paddingBottom: 15 }}>
          <Text>
            <Ionicons name="mail" size={39} color="#edb951dd" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Details;
