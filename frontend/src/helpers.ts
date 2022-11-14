import moment from "moment";
import {
  Event,
  EventWithFormattedDate,
  GroupedEvent,
  EventWithResources,
  GroupedEventWithResources,
} from "./types";

export const getFlatArr = (arr: GroupedEventWithResources[]) => {
  let newArr: EventWithResources[] = [];
  arr.forEach((element) => (newArr = newArr.concat(element.events)));

  return newArr;
};

export const formatName = (name: string) => {
  return name.split(/(?=[A-Z])/)[0];
};

export const formatDate = (date: string) => {
  return moment(date).format("MMM DD, YYYY");
};

export const capitalizeFirstLetter = (string: string) => {
  return string[0].toUpperCase() + string.slice(1);
};

export const sortEvents = (data: Event[]) => {
  const items = data
    .sort(function (a, b) {
      return new Date(b.date).valueOf() - new Date(a.date).valueOf();
    })
    .map((el) => {
      const formattedDate = formatDate(el.date);

      return { ...el, formattedDate };
    });

  let arr: GroupedEvent[] = [];

  items.forEach((el) => {
    const events: EventWithFormattedDate[] = [
      el,
      ...items.filter(({ appointmentId }) => appointmentId === el.id),
    ];

    let item: GroupedEvent = {
      ...el,
      events,
    };

    const arrHasTheSameEvent = arr.filter(({ name, formattedDate }) => {
      return (
        name === el.name &&
        formattedDate === el.formattedDate &&
        name !== "Appointment"
      );
    });

    if (
      (!el.appointmentId &&
        el.name !== "Appointment" &&
        !arrHasTheSameEvent.length) ||
      el.name === "Appointment"
    ) {
      arr.push(item);
    }
  });

  arr = arr.map((el) => {
    let groupedArr: EventWithResources[] = [];

    el.events.forEach((event) => {
      const eventWithResources = event as EventWithResources;

      const inx = groupedArr.filter(
        ({ name, formattedDate }) =>
          name === event.name && formattedDate === event.formattedDate
      );

      const eventResourceId = `${event.resource}/${event.id}`;

      if (!inx.length) {
        eventWithResources.resources = [eventResourceId];

        groupedArr.push(eventWithResources);
      } else {
        groupedArr = groupedArr.map((elt) => {
          const { name, formattedDate, resources } = elt;

          if (name === event.name && formattedDate === event.formattedDate) {
            resources.push(eventResourceId);
          }

          return elt;
        });
      }
    });

    return {
      ...el,
      events: groupedArr,
    };
  });

  return getFlatArr(arr as GroupedEventWithResources[]);
};
