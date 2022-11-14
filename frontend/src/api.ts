const eventsAPI = "http://localhost:5010/events";
const resourcesAPI = "http://localhost:5010/resources";

export const fetchEvents = async () => {
  const data = await fetch(eventsAPI, {
    method: "POST",
  })
    .then((response) => response.json())
    .catch((e) => console.log(e));

  return data.items;
};

export const fetchResources = async (ids: string[]) => {
  const data = await fetch(resourcesAPI, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ids,
    }),
  })
    .then((response) => response.json())
    .catch((e) => console.log(e));

  return data.items;
};
