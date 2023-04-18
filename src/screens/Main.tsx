import React, { useEffect, useRef, useState } from 'react';
import { Button, View, Text, Alert, ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Modalize } from 'react-native-modalize';

// import { useNavigation, useRoute } from '@react-navigation/core';
import eventsStore, { IMarkedData } from '../store/EventsStore';

import { DateData, LocaleConfig, CalendarList } from 'react-native-calendars';

LocaleConfig.locales['ru'] = {
  monthNames: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабарь',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье',
  ],
  dayNamesShort: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вск'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'ru';

interface Props {
  navigation: any;
}

function Main({ navigation }: Props) {
  const modalizeRef = useRef<Modalize>(null);

  useEffect(() => {
    eventsStore.fetchEvents();
  }, []);

  const [currentData, setCurrentData] = useState<IMarkedData>();
  // const currentData = useRef<IMarkedData>();

  const onDayPress = (day: DateData) => {
    if (eventsStore.markedDates[day.dateString]) {
      // Alert.alert('modalizeRef 15');
      setCurrentData(eventsStore.markedDates[day.dateString]);
      setTimeout(() => {
        modalizeRef.current?.open();
      }, 1000);
    }
  };

  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - 1);

  return (
    <>
      <View style={{ width: '100%', height: '100%' }}>
        <Text
          style={{
            backgroundColor: '#FF6D01',
            textAlign: 'center',
            padding: 21,
            fontSize: 18,
          }}
        >
          Календарь мероприятий #ДОБРОпомощи
        </Text>
        <CalendarList
          firstDay={1}
          style={{
            borderWidth: 1,
            borderColor: '#9c9c9c33',
            // height: 350
          }}
          // Callback which gets executed when visible months change in scroll view. Default = undefined
          onVisibleMonthsChange={(months) => {
            console.log('now these months are visible', months);
          }}
          // Max amount of months allowed to scroll to the past. Default = 50
          pastScrollRange={12}
          // Max amount of months allowed to scroll to the future. Default = 50
          futureScrollRange={12}
          // Enable or disable scrolling of calendar list
          scrollEnabled={true}
          // Enable or disable vertical scroll indicator. Default = false
          showScrollIndicator={true}
          theme={{
            calendarBackground: 'white',
          }}
          minDate={currentDate.toDateString()}
          markedDates={eventsStore.markedDates}
          markingType={'custom'}
          onDayPress={onDayPress}
        />
      </View>
      <Modalize ref={modalizeRef} adjustToContentHeight={true}>
        <View
          style={{
            height: 300,
            width: '100%',
            padding: 18,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Text
            style={{ fontFamily: 'Georgia', fontSize: 24, textAlign: 'center' }}
          >
            {currentData?.name}
          </Text>
          <Text
            style={{
              fontFamily: 'Georgia',
              textAlign: 'center',
              marginTop: 4,
              marginBottom: 21,
              fontSize: 18,
            }}
          >
            {currentData?.displayDate}
          </Text>
          <Button
            title="Подробнее"
            color="#2196F3"
            onPress={() => navigation.navigate('Details', { currentData })}
          />
        </View>
      </Modalize>
      <View
        style={{
          display: eventsStore.isFetching ? 'flex' : 'none',
          zIndex: 999,
          position: 'absolute',
          backgroundColor: 'white',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: '50%',
        }}
      >
        <ActivityIndicator size={50} animating={true} />
      </View>
    </>
  );
}

export default observer(Main);
