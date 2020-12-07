//////////////////////////////////////////////////////////////////
//
// Shuffle player launch point
//
//////////////////////////////////////////////////////////////////

// jQuery main()
$(function () {

	////////////////////////////////////////////////////////////////
	// SoundCloud operator

	SCrunning.artist = "yellow-salamandr-4";

	SCrunning.matchPlaylists =
		[
			"https://soundcloud.com/yellow-salamandr-4/sets/yellow-salamandr-entire",
			"https://soundcloud.com/yellow-salamandr-4/sets/ys4"
		];

	SCrunning.getClient(function () {
		SCrunning.getArtist(function getItems(artist) {
			// get all artist 'TRACK' entries:
			// SCrunning.rackArtist(SCrunning.rackTracks);
			// get optionally filtered playlists:
			SCrunning.rackCarts(SCrunning.rackTracks);
		});
	});
});
