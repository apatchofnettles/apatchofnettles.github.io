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
	SCrunning.tryAutoPlay = function () {}


	////////////////////////////////////////////////////////////////
	// SoundCloud operator

	SCrunning.getClient(function () {
	
	var allPages = 
		[
		"user-846101526",
		"user-951561459",
		"user-999161418",
		"user-209817502",
		"numbersinthedarkness",
		"numbersinthedream",
		"numbersinthedream-1",
		"heumbersnheream",
		"thenumbersinthedream",
		"user-385468087"
		];
		
		for(var i=0; i < allPages.length; i++) {
			if ( i == allPages.length-1 ) {
				SCrunning.mediaLaunch = true;
			}
			SCrunning.artist = allPages[i];
			SCrunning.getArtist( function getItems() {
				// get all artist 'TRACK' entries:
				SCrunning.rackArtist(self.rackTracks);
				// get optionally filtered playlists:
				// SCrunning.rackCarts(self.rackTracks);
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