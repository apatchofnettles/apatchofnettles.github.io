//////////////////////////////////////////////////////////////////
//
// Radically bind DOM objects to SC operators
//
//////////////////////////////////////////////////////////////////

var SCrunning;

SCrunning = null;
SCrunning = new SCoperator();
SCrunning.matchPlaylists = [];

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

