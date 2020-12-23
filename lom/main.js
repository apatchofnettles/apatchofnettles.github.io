//////////////////////////////////////////////////////////////////
//
// Shuffle player launch point
//
//////////////////////////////////////////////////////////////////

// jQuery main()
$(function () {

	////////////////////////////////////////////////////////////////
	// SoundCloud operator

	SCrunning.artist = "zvukolom";

	SCrunning.getClient(function () {
		SCrunning.getArtist(function getItems(artist) {
			// get all artist 'TRACK' entries:
			SCrunning.rackArtist(SCrunning.rackTracks);
			// get optionally filtered playlists:
			// SCrunning.rackCarts(SCrunning.rackTracks);
		});
	});
});
