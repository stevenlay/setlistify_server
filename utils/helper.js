module.exports = {
  filterSongs: (filterSongs = songs => {
    return songs.map(song => ({
      name: song.name
    }));
  }),

  formatSetlistData: (formatSetlistData = unformattedData => {
    return unformattedData.map(setlist => ({
      artist: setlist.artist ? setlist.artist.name : false,
      date: setlist.eventDate ? setlist.eventDate : false,
      venue: setlist.venue ? setlist.venue.name : false,
      city: setlist.venue.city
        ? `${setlist.venue.city.name}, ${setlist.venue.city.country.name}`
        : false,
      tour: setlist.tour ? setlist.tour.name : false,
      songs:
        setlist.sets && setlist.sets.set[0]
          ? filterSongs(setlist.sets.set[0].song)
          : false,
      encore:
        setlist.sets && setlist.sets.set[1] ? setlist.sets.set[1].song : false
    }));
  }),

  uniqueArtists: (uniqueArtists = results => {
    let setlistArtists = results.map(setlist => {
      return setlist.artist;
    });
    return new Set(setlistArtists);
  })
};
