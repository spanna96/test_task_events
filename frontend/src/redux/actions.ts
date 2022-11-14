import { EventWithResources, Note } from "../types";

export const GET_EVENTS = "GET_EVENTS";
export const SET_EVENTS = "SET_EVENTS";
export const GET_NOTES = "GET_NOTES";
export const SET_NOTES = "SET_NOTES";
export const CLEAR_STORE = "CLEAR_STORE";
export const REQUEST_SUCCESS = "REQUEST_SUCCESS";

export const getEventsAction = () => ({
  type: GET_EVENTS,
});

export const setEventsAction = (payload: EventWithResources[]) => ({
  type: SET_EVENTS,
  payload,
});

export const getNotesAction = (payload: number) => ({
  type: GET_NOTES,
  payload,
});

export const setNotesAction = (payload: Note[]) => ({
  type: SET_NOTES,
  payload,
});

export const clearStoreAction = () => ({
  type: CLEAR_STORE,
});

export const requestSuccessAction = () => ({
  type: REQUEST_SUCCESS,
});
