//////////////////////////////////////////////////////////////////
//
// Shuffle player launch point
//
//////////////////////////////////////////////////////////////////

var SCrunning;

// jQuery main()
$(function () {
	SCrunning = null;
	SCrunning = new SCoperator();
	SCrunning.configAPI("V1");
	SCrunning.mediaLaunch = false;
	SCrunning.matchPlaylists = [];


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


	////////////////////////////////////////////////////////////////
	// tiles

	var base = document.querySelector('#TrackList'); // the container for the variable content
	var selector = '.sound-tile'; // any css selector for children

	base.addEventListener('click', function (event) {
		// find the closest match of the event target
		var closest = event.target.closest(selector);
		if (closest && base.contains(closest) && SCrunning.isPlayable(closest)) {
			SCrunning.spoolTrack(closest);
		}
	});

	////////////////////////////////////////////////////////////////
	// play bar

	$("audio").on("ended", function () {
		SCrunning.actOnMedia(SCrunning, $(".sound-tile").length);
	});

});
