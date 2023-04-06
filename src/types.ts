export enum EEventsType {
  socialFeeding = 'Социальные кормления',
  socialEvents = 'Социальные мероприятия',
  charityEvents = 'Благотворительные мероприятия',
  socialTrips = 'Социальные поездки',
}

export interface IEventData {
  date: any;
  name: string;
  status: string;
  type: EEventsType;
  responsible: string;
  description: string;
}
