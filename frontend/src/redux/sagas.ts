import { put, call, takeLatest, all, select } from "redux-saga/effects";
import {
  GET_EVENTS,
  GET_NOTES,
  setEventsAction,
  setNotesAction,
  requestSuccessAction,
} from "./actions";
import { fetchEvents, fetchResources } from "../api";
import { sortEvents } from "../helpers";
import {
  Event,
  Action,
  Note,
  Store,
  GroupedEventWithResources,
  EventWithResources,
  Resource,
} from "../types";

function* workerFetchEvents(): Generator {
  const events = yield call(fetchEvents);
  const sortedEvents = sortEvents(events as Event[]);

  yield put(setEventsAction(sortedEvents));
}

function* watchFetchEvents() {
  try {
    yield takeLatest(GET_EVENTS, workerFetchEvents);
  } catch (e) {}
}

function* workerFetchNotes({ payload }: Action): Generator {
  const eventsData = yield select((state) => state.events);
  const events = eventsData as EventWithResources[];

  const currentPage = payload;
  const start = currentPage;
  const initialStep = 10;
  const diff = events.length - currentPage;
  const step = currentPage + initialStep > events.length ? diff : initialStep;

  const newNotes: Note[] = [];

  const currentEvents = events.slice(start, start + step);

  const eventsIds = currentEvents.reduce((r: string[], a) => {
    return [...r, ...a?.resources];
  }, []);

  const allResourcesList = yield call(fetchResources, eventsIds);
  let filteredResources = allResourcesList as Resource[];

  currentEvents.forEach((event) => {
    const { name, formattedDate, id } = event;
    const eventResourcesList = filteredResources.slice(
      0,
      event.resources?.length
    );

    filteredResources = filteredResources.filter((el, i) => {
      return i >= event.resources?.length;
    });

    const note: Note = {
      name,
      resources: eventResourcesList,
      formattedDate,
      id,
    };

    newNotes.push(note);
  });

  yield put(setNotesAction(newNotes));
  yield put(requestSuccessAction());
}

function* watchFetchNotes() {
  try {
    yield takeLatest(GET_NOTES, workerFetchNotes);
  } catch (e) {}
}

export default function* rootSaga() {
  yield all([watchFetchEvents(), watchFetchNotes()]);
}
