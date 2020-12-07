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
			SCrunning.getArtist( function getItems(artist) {
				// get all artist 'TRACK' entries:
				SCrunning.rackArtist(SCrunning.rackTracks);
				// get optionally filtered playlists:
				// SCrunning.rackCarts(self.rackTracks);
			});
		};
	});

});