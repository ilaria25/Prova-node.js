async function send(id) {
  let res = await fetch(`http://localhost:3000/photos/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Gojo Satoru",
      link: "",
      description: "most powerful sorcerer",
      date: "",
    }),
  });
  let json = await res.json();
  console.log(json.status, res.status);
}
send(1);
