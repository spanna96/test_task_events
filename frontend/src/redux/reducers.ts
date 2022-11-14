import {
  GET_EVENTS,
  GET_NOTES,
  SET_EVENTS,
  SET_NOTES,
  CLEAR_STORE,
  REQUEST_SUCCESS,
} from "./actions";
import { Store, Action } from "../types";

const initialState = {
  events: [],
  notes: [],
  loading: false,
};

const events = (state: Store = initialState, action: Action) => {
  switch (action.type) {
    case GET_EVENTS:
    case GET_NOTES:
      return {
        ...state,
        loading: true,
      };
    case SET_EVENTS:
      return {
        ...state,
        events: [...state.events, ...action.payload],
      };
    case SET_NOTES:
      return {
        ...state,
        notes: [...state.notes, ...action.payload],
      };
    case CLEAR_STORE:
      return {
        ...state,
        notes: [],
        events: [],
      };
    case REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default events;
