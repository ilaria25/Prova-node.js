async function send(id) {
  let res = await fetch(`http://localhost:3000/albums/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Jujutsu Kaisen",
      photos: [],
      created: "01-03-2024",
      edited: "",
      hashtags: "#JujutsuKaisenPics",
    }),
  });
  let json = await res.json();
  console.log(json.status, res.status);
}
send(1);
