import { makeAutoObservable, runInAction } from 'mobx';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import moment from 'moment';
import { EEventsType, IEventData } from '../types';
import { Alert } from 'react-native/types';

const colorMap: { [key: string]: string } = {
  [EEventsType.socialEvents]: '#fbbc06', // Социальные мероприятия
  [EEventsType.charityEvents]: '#d5a6bd', // Благотворительные мероприятия
  [EEventsType.socialTrips]: '#ffe598', // Социальные поездки
  [EEventsType.socialFeeding]: '#e6febe', // Социальные кормления
};

const monthNameMap: { [key: number]: string } = {
  [0]: 'января',
  [1]: 'февраля',
  [2]: 'марта',
  [3]: 'апреля',
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

export interface IMarkedDatas {
  [key: string]: IMarkedData;
}
export interface IMarkedData {
  day: string;
  name: string;
  displayDate: string;
  selected: boolean;
  customStyles: any;
  description: string;
  selectedColor: string;
  selectedTextColor: string;
}

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
      const { date, description, type, name, status, ...rest } = doc.data();

      const d: Date = date.toDate();
      const day = moment(d).format('yyyy-MM-DD');

      markedData[day] = {
        ...selectedStyle,
        day,
        name,
        description,
        displayDate: `${d.getDay()} ${monthNameMap[d.getMonth()]}`,
        selectedColor: colorMap[type],
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
