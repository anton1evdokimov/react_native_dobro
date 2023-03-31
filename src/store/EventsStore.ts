import { makeAutoObservable, runInAction } from 'mobx';
// import Api from 'api';
import firestore from '@react-native-firebase/firestore';

class EventsStore {
  private eventsCollection = firestore().collection('Events');
  events = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchEvents() {
      const data = await this.eventsCollection.get();
      console.log(data)
  }
}

const eventsStore = new EventsStore();
export default eventsStore;
