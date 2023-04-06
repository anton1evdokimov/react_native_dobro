import React, { useEffect, useRef, useState } from 'react';
import { Button, View, Text } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Modalize } from 'react-native-modalize';

// import { useNavigation, useRoute } from '@react-navigation/core';
import eventsStore from '../store/EventsStore';

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

  const [currentData, setCurrentData] = useState<any>();

  const onDayPress = (day: DateData) => {
    if (eventsStore.markedDates[day.dateString]) {
      setCurrentData(eventsStore.markedDates[day.dateString]);
      modalizeRef.current?.open();
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
            fontSize: 18,
            padding: 12,
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
            padding: 12,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Text> {currentData?.name}</Text>
          <Button
            title="Подробнее"
            onPress={() => navigation.navigate('Details', { currentData })}
          />
        </View>
      </Modalize>
    </>
  );
}

export default observer(Main);
