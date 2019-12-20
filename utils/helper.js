module.exports = {
  filterSongs: (filterSongs = songs => {
    return songs.map(song => ({
      name: song.name
    }));
  })
};
