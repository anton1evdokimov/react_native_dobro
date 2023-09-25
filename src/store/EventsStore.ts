import { makeAutoObservable, runInAction } from 'mobx';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import moment from 'moment';
import { EEventsType, IEventData, IMarkedDatas } from '../interfaces';

const colorMap: { [key: string]: string } = {
  [EEventsType.socialEvents]: '#fbbc06', // Социальные мероприятия
  [EEventsType.charityEvents]: '#d5a6bd', // Благотворительные мероприятия
  [EEventsType.socialTrips]: '#ffe598', // Социальные поездки
  [EEventsType.socialFeeding]: '#f2cda3', // Социальные кормления
  [EEventsType.sportEvents]: '#bed6ae', // sportEvents
};

const monthNameMap: { [key: number]: string } = {
  [0]: 'января',
  [1]: 'февраля',
  [2]: 'марта',
  [3]: 'апреля',
  [4]: 'мая',
  [5]: 'июня',
  [6]: 'июля',
  [7]: 'августа',
  [8]: 'сентября',
  [9]: 'октября',
  [10]: 'ноября',
  [11]: 'декабря',
};

const CONTAINER_SIZE = 40;

const selectedStyle = {
  selected: true,
  customStyles: {
    container: {
      top: -4,
      position: 'relative',
      paddingTop: 4,
      width: CONTAINER_SIZE,
      height: CONTAINER_SIZE,
      borderRadius: CONTAINER_SIZE / 2,
    },
  },
  selectedTextColor: '#000',
};

class EventsStore {
  private eventsCollection = 'events';
  events = {};
  markedDates: IMarkedDatas = {};
  isFetching = true;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchEvents() {
    const querySnapshot = await getDocs<IEventData>(
      collection(db, this.eventsCollection) as any
    );

    const markedData: IMarkedDatas = {};

    querySnapshot.forEach((doc) => {
      const { date, description, type, name, status, responsible } = doc.data();

      const d: Date = date.toDate();
      const day = moment(d).format('yyyy-MM-DD');
      const displayDate = `${d.getDate()} ${monthNameMap[d.getMonth()]}`;
      // const d1 = 'Мастер-класс по Мезенской росписи/ Ведущая мастер-класса: Титова Анна/ Стоимость: 250 рублей/ Место проведения: Храм св.мч. Флора и Лавра (ул. Дубининская, д.9, с.1)'

      markedData[day] = {
        ...selectedStyle,
        day,
        name,
        type,
        description: [description],
        displayDate,
        selectedColor: colorMap[type],
        responsible,
      };
    });

    runInAction(() => {
      this.markedDates = markedData;
      this.isFetching = false;
    });
  }
}

const eventsStore = new EventsStore();

export default eventsStore;
