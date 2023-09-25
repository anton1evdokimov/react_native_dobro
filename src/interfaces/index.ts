export interface IMarkedDatas {
  [key: string]: IMarkedData;
}
export interface IMarkedData {
  day: string;
  name: string;
  type: string;
  displayDate: string;
  selected: boolean;
  customStyles: any;
  responsible: string;
  description: string[];
  selectedColor: string;
  selectedTextColor: string;
}

export enum EEventsType {
  socialFeeding = 'Социальные кормления',
  socialEvents = 'Социальные мероприятия',
  sportEvents = 'Спортивные мероприятия',
  charityEvents = 'Благотворительные мероприятия',
  socialTrips = 'Социальные поездки',
  labor = 'Трудничество',
}

export interface IEventData {
  date: any;
  name: string;
  status: string;
  type: EEventsType;
  responsible: string;
  description: string;
}
