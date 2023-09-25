import React from 'react';
import { Image, View, Text, Linking, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRoute } from '@react-navigation/core';
import { IMarkedData } from '../interfaces';

function Details() {
  const route = useRoute<any>();
  const { description, displayDate, name, responsible }: IMarkedData =
    route.params.currentData;

  const message = `Добрый день! Прошу записать меня на "${name}" (${displayDate})`;
  const onPressWhatsapp = () => {
    try {
      Linking.openURL(`whatsapp://send?text=${message}&phone=79686821493'`);
    } catch {
      alert('Ошибка! При открытии Whatsapp!');
    }
  };
  // const url = 'http://t.me/[bot-address]';
  const onPressTG = () => {
    Linking.openURL(
      `t.me/@ZenyaZhenya/${Date.now()}?single&comment=${message}`
    );

    //msg?text=${message}&to=@ZenyaZhenya`); //@ZenyaZhenya
  };
  const onPressEmail = () => {
    Linking.openURL(
      `mailto://msg?subject=Запись на ${displayDate}&body=${message}&to=anton@yandex.ru`
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
          }}
          source={require('../../assets/dobro.png')}
        />
      </View>
      {/* <Text style={{ paddingBottom: 12, fontSize: 24, textAlign: 'center' }}>
        {name}
      </Text> */}
      <Text style={{ paddingBottom: 18, fontSize: 24 }}>{displayDate}</Text>
      <View style={{ paddingBottom: 18 }}>
        {description.map((item) => (
          <Text
            style={{ textAlign: 'center', fontSize: 15, margin: 24 }}
            key={item}
          >
            {'\t'}
            {item.trim()}
          </Text>
        ))}
      </View>
      <Text style={{ paddingBottom: 12 }}>Ответственный: {responsible}</Text>
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
