//////////////////////////////////////////////////////////////////
//
// Shuffle player launch point
//
//////////////////////////////////////////////////////////////////


// jQuery main()
$(function () {

	////////////////////////////////////////////////////////////////
	// SoundCloud operator

	SCrunning.getClient(function () {

		var allPages =
			[
				"apatchofnettles",
				"ascythethroughnettles",
				"asoupofnettles",
				"andretthenettles",
				"tosowgreennettles",
				"pangaeanpermafaction",
				"user-512294964"
			];

		for (var i = 0; i < allPages.length; i++) {
			if (i == allPages.length - 1) {
				SCrunning.mediaLaunch = true;
			}
			SCrunning.artist = allPages[i];
			SCrunning.getArtist(function getItems(artist) {
				// get all artist 'TRACK' entries:
				if (SCrunning.searchExternals(artist) == false) {
					SCrunning.rackArtist(SCrunning.rackTracks);
				}
				// get optionally filtered playlists:
				SCrunning.rackCarts(SCrunning.rackTracks);
			});
		};
	});
});
