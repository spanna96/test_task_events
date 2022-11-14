export interface Event {
  appointmentId?: string;
  date: string;
  id: string;
  name: string;
  resource: string;
}

export interface GroupedEvent extends EventWithFormattedDate {
  events: EventWithFormattedDate[];
}

export interface EventWithFormattedDate extends Event {
  formattedDate: string;
}

export interface EventWithResources extends EventWithFormattedDate {
  resources: string[];
}

export interface GroupedEventWithResources extends EventWithFormattedDate {
  events: EventWithResources[];
}

export interface Note {
  formattedDate: string;
  id: string;
  name: string;
  resources: Resource[];
}

export interface Resource {
  id: string;
  details: string;
  values?: string[] | NumberValue[];
  code?: string;
}

export interface NumberValue {
  value: number;
  unit: string;
}

export interface Store {
  events: GroupedEventWithResources[];
  notes: Note[];
  loading: boolean;
}

export interface Action {
  type: string;
  payload: any;
}
