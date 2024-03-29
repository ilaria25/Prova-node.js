export const getAll = async (req, res) => {
  let foundPhotos = [];
  let db = await readDb();
  let keys = Object.keys(req.query);
  if (keys.length == 0) {
    res.json({ status: "ok", photos: db.photos });
    return;
  }
  for (let j = 0; j < db.photos.length; j++) {
    let photo = db.photos[j];
    let count = 0;
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      if (photo[key] == req.query[key]) {
        count++;
      }
    }
    if (req.query.choice == "or") {
      if (count > 0) {
        foundPhotos.push(photo);
      }
    } else {
      if (count == keys.length) {
        foundPhotos.push(photo);
      }
    }
  }
  res.json({ status: "ok", photos: foundPhotos });
};

export const getSingle = async (req, res) => {
  let db = await readDb();
  let photo = db.photos.find((photo) => photo.id == req.params.id);
  if (photo) {
    res.json({ status: "ok", photo: photo });
  } else {
    res.status(404).json({ status: "error" });
  }
};

export const deleteSinglePic = async (req, res) => {
  let db = await readDb();
  let photo = db.photos.find((photo) => photo.id == req.params.id);
  if (photo) {
    let photosToWrite = db.photos.filter((photo) => photo.id != req.params.id);
    db.photos = photosToWrite;
    await fs.writeFile("./db.json", JSON.stringify(db));
    res.json({ status: "ok", photo: photo });
  } else {
    res.status(404).json({ status: "error" });
  }
};

export const updateSingle = async (req, res) => {
  let db = await readDb();
  let photo = db.photos.find((photo) => photo.id == req.params.id);
  if (photo) {
    let newPhotoData = req.body;
    let nameExists = await photoNameExists(newPhotoData.name);
    if (ValidPhoto(newPhotoData) && !nameExists) {
      photo.name = newPhotoData.name;
      photo.created = newPhotoData.created;
      photo.edited = newPhotoData.edited;
      photo.hashtags = newPhotoData.hashtags;
      await fs.writeFile("./db.json", JSON.stringify(db));
      res.json({ status: "ok" });
    } else {
      res.status(400).json({ status: "error" });
    }
  } else {
    res.status(404).json({ status: "error" });
  }
};

function ValidPhoto(photo) {
  let keys = Object.keys(photo);
  return (
    keys.length == 4 &&
    photo.name &&
    photo.created &&
    photo.edited &&
    photo.hashtags
  );
}

export const create = async (req, res) => {
  if (ValidPhoto(req.body)) {
    res.status(201).json({ status: "ok", id: data });
  } else {
    res.status(400).json({ status: "error", msg: "Invalid photo attributes" });
  }
};

async function photoNameExists(name) {
  let db = await readDb();
  let photos = db.photos;
  let photosWithSameName = photos.filter((photo) => photo.name == name);
  return photosWithSameName.length > 0;
}
