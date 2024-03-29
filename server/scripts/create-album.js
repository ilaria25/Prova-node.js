async function send() {
  let res = await fetch("http://localhost:3000/albums", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "One Piece",
      photos: [],
      created: "29-04-2024",
      edited: "29-04-2024",
      hashtags: "#OPpics",
    }),
  });
  let json = await res.json();
  console.log(res.status, json);
}
send();
