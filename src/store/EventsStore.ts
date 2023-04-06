import { makeAutoObservable, runInAction } from 'mobx';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import moment from 'moment';
import { EEventsType, IEventData } from '../types';

const colorMap = {
  [EEventsType.socialEvents]: '#fbbc06', // Социальные мероприятия
  [EEventsType.charityEvents]: '#d5a6bd', // Благотворительные мероприятия
  [EEventsType.socialTrips]: '#ffe598', // Социальные поездки
  [EEventsType.socialFeeding]: '#e6febe', // Социальные кормления
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
  markedDates: any = {};

  constructor() {
    makeAutoObservable(this);
  }

  async fetchEvents() {
    const querySnapshot = await getDocs<IEventData>(
      collection(db, this.eventsCollection) as any
    );

    const markedData: any = {};

    querySnapshot.forEach((doc) => {
      const { date, description, type, name, status, ...rest } = doc.data();

      const day = moment(date.toDate()).format('yyyy-MM-DD');

      markedData[day] = {
        ...selectedStyle,
        day,
        name,
        description,
        selectedColor: colorMap[type],
      };
    });

    runInAction(() => {
      this.markedDates = markedData;
    });
  }
}

const eventsStore = new EventsStore();

export default eventsStore;
