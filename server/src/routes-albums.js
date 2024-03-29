export const addPhotoToAlbum = async (req, res) => {
  let albumId = parseInt(req.params.albumId, 10);
  let photoId = parseInt(req.params.photoId, 10);

  if (!(await exists("albums", albumId))) {
    return res.status(404).send({ status: "error" });
  }

  if (!(await exists("photos", photoId))) {
    return res.status(404).send({ status: "error" });
  }

  let albumContainingPhoto = await getAlbumForPhoto(photoId);
  if (albumContainingPhoto && albumContainingPhoto.id == albumId) {
    return res
      .status(409)
      .send({ status: "error", msg: "photo already in this album" });
  }

  if (albumContainingPhoto) {
    await removePhotoFromAlbum(albumContainingPhoto, photoId);
  }

  await addPhotoToAlbum(albumId, photoId);

  res.json({ status: "ok" });
};
