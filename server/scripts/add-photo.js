async function send() {
  let res = await fetch("http://localhost:3000/photos", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Roronoa Zoro",
      created: "29-03-2024",
      edited: "",
      hashtags: "#mightiestswordman",
    }),
  });
  let json = await res.json();
  console.log(res.status, json);
}
send();
