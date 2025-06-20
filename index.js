import { getTextAsset, getJsonAsset } from "./util.js"
import { Tracking } from "./play_list.js"
import { Html5Audio } from "./player_extension.js"
import { show } from "./player_visuals.js"

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// setup interface/theme parts
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const asPage = document.querySelector('#htkpage');
const ashtk = document.querySelector('body');

const leadIns = document.querySelectorAll(".msg-htkstart");
const modalLayup = document.querySelector("#htkmodal");
const modalInfo = document.querySelector("#htkinfo");
const modalClose = document.querySelector("#htkdropinfo");
const infoText = document.querySelector("#htktext");

const localBrowsing = document.querySelector("#htklocal");
const fileBrowser = document.querySelector("#htkselect");

const audioElement = document.querySelector("audio");
const audioProgress = document.querySelector("#htkprog");
const audioScaled = document.querySelector("#htkscaled");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// setup hydra and playlist class backend
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const canvas = document.querySelector('#htkcanvas');

const hydra = new Hydra({
    canvas: canvas,
    detectAudio: false
});

const params = new URLSearchParams(document.location.search);

const appDeployed = (await getJsonAsset("app_config.json"));
let appCatalogue = ((appDeployed?.albums) ?? []);

const singleLink = params.get("single");
if (singleLink) {
    appCatalogue.push({
        "title": "Single Play",
        "path": "",
        "notes": {
            "caption": params.get("message") ?? "Now on hTrack.",
            "artist": params.get("artist") ?? "From the web.",
            "attribution": params.get("license") ?? "Shared by link."
        },
        "tracks": [
            {
                "track": singleLink,
                "name": params.get("name") ?? "Sent To You",
                "download": false,
                "share": false,
            },
        ]
    });
    appDeployed.message = appDeployed.message??"Wild growth outside the walled gardens.";
    appDeployed.description = appDeployed.description??"Enjoy.";
}

const playlist = new Tracking({
    container: document.querySelector('#oled-screen'),
    canvas: document.querySelector('#oled-htk'),
    standby: "hTrack player * from the Gooseyard * "
        + ((appDeployed?.brand) ? appDeployed.brand + " * " : "")
        + ((appDeployed?.license) ? appDeployed.license + " * " : "")
        + "hydra by ojack * "
        + ((appDeployed?.message) ? appDeployed.message + " * " : ""),
    catalogue: appCatalogue
});
const launchPage = await getTextAsset("app_launch.html");
engineReady();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// launch interfaces against hydra and playlist
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function engineReady() {
    leadIns.forEach((dropOut) => { dropOut.style.display = "none"; });
    if (playlist.localMode) {
        localBrowsing.style.display = "block";
    }
    reformViewFrame();
    audioElement.src = playlist.now();
    if (appDeployed.launch || playlist.localMode) {
        appLaunch();
    }
    const trackRequest = params.get("request");
    if (trackRequest) {
        playRequest(trackRequest);
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// setup button bar and playlist integration
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.querySelector(".vis-page").addEventListener("click", nextVis);
document.querySelector(".vis-bump").addEventListener("click", enterFullscreen);
document.querySelector(".aud-stop").addEventListener("click", stopAudio);
document.querySelector(".aud-play").addEventListener("mouseup", playAudio);
document.querySelector(".aud-prev").addEventListener("click", prevAudio);
document.querySelector(".aud-next").addEventListener("click", nextAudio);
document.querySelector(".aud-rand").addEventListener("click", randAudio);
document.querySelector(".app-info").addEventListener("click", appInfo);

audioElement.addEventListener("ended", nextAudio);
audioElement.addEventListener("timeupdate", progAudio);
audioElement.addEventListener("durationchange", timeAudio);
audioScaled.addEventListener("click", scrubAudio);

fileBrowser.addEventListener("change", updateUserPlaylist);

function btnToggle(e) {
    const grpButton = e.target.closest("button");
    return grpButton.classList.toggle("active");
}
function randAudio(e) {
    playlist.shuffleMode(btnToggle(e));
    if (playlist.shuffle && audioElement.paused) {
        audioElement.src = playlist.next();
        playlist.unmarq();
    }
}
function playRequest(requested) {
    audioElement.src = playlist.request(requested);
    dropModal();
    rehydrate();
}
function playAudio() {
    if (!audioElement.paused) return;
    audioElement.play();
    rehydrate();
    playlist.remarq();
}
function stopAudio() {
    audioElement.pause();
    dehydrate();
    playlist.unmarq();
}
function prevAudio() {
    audioElement.src = playlist.prev();
    playAudio();
}
function nextAudio() {
    audioElement.src = playlist.next();
    playAudio();
}
function timeAudio() {
    playlist.timeTrack(audioElement.duration);
    if (!audioElement.paused) playlist.remarq();
}
function progAudio() {
    if (audioElement.currentTime && audioElement.duration) {
        audioProgress.style.width = audioElement.currentTime / audioElement.duration * 100 + "%";
    } else {
        audioProgress.style.width = "0.1%";
    }
}
function scrubAudio(e) {
    const within = audioScaled.getBoundingClientRect();
    const islit = audioProgress.getBoundingClientRect();
    const pack = (islit.left - within.left) * 2;
    let pct = (e.clientX - islit.left) / (audioScaled.clientWidth - pack);
    pct = (pct < 0) ? 0 : ((pct > 1) ? 1 : pct);
    if (audioElement.currentTime && audioElement.duration) {
        audioElement.currentTime = audioElement.duration * pct;
    }
}

function nextVis() {
    rehydrate();
}

function updateUserPlaylist() {
    const tracks = [];
    Array.from(fileBrowser.files).forEach((playFile) => {
        const objectURL = URL.createObjectURL(playFile);
        tracks.push({ track: objectURL, name: playFile.name });
    });
    audioElement.src = playlist.loadLocal(tracks);
    playAudio();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// info modal parts
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

modalClose.addEventListener("click", () => {
    dropModal();
});

window.addEventListener("click", (e) => {
    if (e.target == modalLayup) {
        dropModal();
    }
});

function dropModal() {
    modalLayup.style.display = "none";
}

function popModal() {
    modalLayup.style.display = "block";
    const w = asPage.clientWidth * 0.6;
    const h = asPage.clientHeight * 0.88;
    modalInfo.style.width = w + "px";
    modalInfo.style.height = h + "px";
    infoText.innerHTML = "";
    const options = document.querySelectorAll("#htkopts .btn-htkinline");
    options.forEach((dropOpt) => { dropOpt.style.display = "none"; });
    modalInfo.scrollTo(0, 0);
}

function appInfo() {
    popModal();
    const notes = playlist.linerNotes();
    const localMode = playlist.localMode;

    let namedBlock = "";
    if (notes.names.length > 1) {
        notes.names.forEach((hasName) => {
            namedBlock += (namedBlock) ? "&nbsp;&bullet;&nbsp;" : "";
            namedBlock += hasName;
        });
    }

    if (!localMode) {
        const picker = document.querySelector("#htkoptchoose");
        picker.removeEventListener("click", picker.clicker);
        picker.addEventListener("click", picker.clicker = () => { appBrowse(); });
        picker.style.display = "inline-block";

        if (notes.share && notes.share == true) {
            const linker = document.querySelector("#htkoptlink");
            linker.removeEventListener("click", linker.clicker);
            linker.addEventListener("click", linker.clicker = () => { navigator.clipboard.writeText(notes.trackrequest) });
            linker.style.display = "inline-block";
        }

        if (notes.download && notes.download == true) {
            const loader = document.querySelector("#htkoptdownload");
            loader.href = notes.trackorigin;
            loader.download = notes.download;
            loader.style.display = "inline-block";
        }
    }

    infoText.innerHTML = ""
        + "<h2><strong>"
        + ((notes.album) ? notes.album : "")
        + ((notes.album) ? ("&nbsp;&bullet;&nbsp;" + notes.trackname) : notes.trackname)
        + "</h2></strong>"
        + "<strong>" + notes.pitch + "</strong>"
        + ((namedBlock.length) ? ("<br/><br/><strong>" + namedBlock + "</strong><br/><br/>") : "<br/><br/>")
        + ((notes.artist) ? notes.artist + "<br/><br/>" : "")
        + ((notes.attribution) ? notes.attribution + "<br/><br/>" : "")
        + "<i><small>hTrack is from the Gooseyard after the eras of Nettles and GreyBox."
        + " All are experiments in collage, processing, chaos, generation and collaboration"
        + " yielding sound tracks as musical mimesis."
        + " Hydra is by <a target='_blank' rel='noopener noreferrer' href='https://ojack.xyz/about/'>ojack</a>"
        + ", used here under <a target='_blank' rel='noopener noreferrer'"
        + " href='https://github.com/hydra-synth/hydra-synth/blob/main/LICENSE'>AGPL</a>."
        + " Hydra audio extensions use <a target='_blank' rel='noopener noreferrer' href='https://meyda.js.org/'>Meyda</a>"
        + "  under <a target='_blank' rel='noopener noreferrer'"
        + " href='https://github.com/meyda/meyda/blob/main/LICENSE.md'>MIT</a> license."
        + "</small></i><br/><br/>"
        + ((appDeployed?.description) ? appDeployed.description + "<br/><br/>" : "");
}

function appBrowse() {
    popModal();
    infoText.innerHTML = appDeployed.message + "<hr/>"
        + "<div id='browsealbums'></div>"
        + "<div id='browsetracks'></div>"
        + appDeployed.description
        + "<br/><br/>"
        + "<button id='browseok' class='btn-htkaction btn-htkwide'>PLAY</button>"
        + "<hr/>";
    const picked = document.querySelector("#browseok");
    picked.addEventListener("click", browseOK);
    albumBrowse();
}

function browseOK() {
    let album;
    let track = 0;
    const tunedSelectors = document.querySelectorAll('#htktext .btn-htkaction.active');
    tunedSelectors.forEach((b) => {
        const opts = b.value.split("::");
        album = (opts[0]) ? opts[0] : album;
        track = (opts[1]) ? opts[1] : track;
    });
    if (album) {
        audioElement.src = playlist.seek(album, track);
        playAudio();
    }
    dropModal();
    rehydrate();
}

function albumBrowse() {
    let albumList = "Albums:<br/>";
    let i = 0;
    playlist.albums.forEach((a) => {
        albumList += "<button class='btn-htkaction' value='" + i + "'>" + ((a?.title) ?? "Unreleased") + "</button>";
        i++;
    });
    if (i > 0) {
        albumList += "<hr/>";
    }
    document.querySelector("#browsealbums").innerHTML = albumList;
    tuneRadios("browsealbums", "album-select", albumSelected);
}

function albumSelected(channel, signal) {
    trackBrowse(signal);
};

function trackBrowse(album) {
    if (!album) { return ""; }
    const showAs = playlist.albums[album]?.notes?.caption;
    let trackList = (showAs) ? showAs : playlist.albums[album]?.title;
    trackList += "<hr/>";
    let i = 0;
    playlist.albums[album]?.tracks.forEach((t) => {
        trackList += "<button class='btn-htkaction' value='" + album + "::" + i + "'>"
            + ((t?.name) ? t.name : t.track)
            + "</button>";
        i++;
    });
    if (i > 0) {
        trackList += "<hr/>";
    }
    document.querySelector("#browsetracks").innerHTML = trackList;
    tuneRadios("browsetracks", "track-select", trackSelected);
}

function trackSelected(channel, signal) {
};

function tuneRadios(tuner, tuned, broadcast) {
    const tunedConsole = document.querySelectorAll("#" + tuner + " .btn-htkaction");
    tunedConsole.forEach((b) => {
        b.addEventListener("click", btnRadio);
        b.tuned = tuned;
        b.respond = broadcast;
    });
}

function btnRadio(e) {
    const grpButton = e.target.closest("button");
    const wireless = grpButton.tuned;
    const tunedConsole = document.querySelectorAll('#htktext .btn-htkaction');
    tunedConsole.forEach((b) => {
        if (b.tuned == wireless) {
            b.classList.remove("active");
        }
    });
    grpButton.classList.toggle("active");
    grpButton.respond(wireless, grpButton.value);
}

function appLaunch() {
    popModal();
    try {
        infoText.innerHTML = launchPage ?? "";
    } catch {
        dropModal();
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// manage canvas changes
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

canvas.addEventListener("click", rehydrate);

addEventListener("resize", reformViewFrame);
if (document.addEventListener) {
    document.addEventListener('fullscreenchange', reformViewFrame, false);
    document.addEventListener('mozfullscreenchange', reformViewFrame, false);
    document.addEventListener('MSFullscreenChange', reformViewFrame, false);
    document.addEventListener('webkitfullscreenchange', reformViewFrame, false);
}

function reformViewFrame() {
    modalLayup.style.display = "none";
    const triggered = typeof e;
    if (
        (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement)
        && (triggered !== 'fullscreenchange' && triggered !== 'mozfullscreenchange' && triggered !== 'MSFullscreenChange' && triggered !== 'webkitfullscreenchange')
    ) {
        // just resizing browser in window view
        asPage.appendChild(canvas);
        canvas.classList.add("cnv-htk");
        canvas.style.width = window.innerWidth * 0.95 + "px";
        canvas.style.height = window.innerHeight * 0.9 + "px";
        hydra.synth.setResolution(window.innerWidth * 0.95, window.innerHeight * 0.85);
        rehydrate();
        playlist.oled_layup();
    }
    if (
        (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement)
        && (triggered == 'fullscreenchange' || triggered == 'mozfullscreenchange' || triggered == 'MSFullscreenChange' || triggered == 'webkitfullscreenchange')
    ) {
        // first firing of fullscreen and remap element visibility
        canvas.classList.remove("cnv-htk");
        ashtk.appendChild(canvas);
        canvas.style.width = screen.width + "px";
        canvas.style.height = screen.height + "px";
        hydra.synth.setResolution(screen.width, screen.height);
        rehydrate()
    }
    if (
        (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement)
        && (triggered !== 'fullscreenchange' && triggered !== 'mozfullscreenchange' && triggered !== 'MSFullscreenChange' && triggered !== 'webkitfullscreenchange')
    ) {
        // full screen adjusted! eg: mobile view rotated
        canvas.style.width = screen.width + "px";
        canvas.style.height = screen.height + "px";
        hydra.synth.setResolution(screen.width, screen.height);
        rehydrate()
    }
}

function enterFullscreen() {
    if (!document.fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.mozRequestFullScreen) { // Firefox
            canvas.mozRequestFullScreen();
        } else if (canvas.webkitRequestFullscreen) { // Chrome, Safari and Opera
            canvas.webkitRequestFullscreen();
        } else if (canvas.msRequestFullscreen) { // IE/Edge
            canvas.msRequestFullscreen();
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// manage hydra changes
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function dehydrate() {
    render(o0);
    speed = 20;
    src(o0)
        .blend(
            src(o0)
                .scale(1, 3.3, 3.3, 0.5, 0.5).modulate(noise(92, 2).thresh(0.6, 0), 0.2)
                .invert()
                .modulate(noise(877, 0.06), 0.002)
            , 0.36).out(o0);
}

function rehydrate() {
    hush();
    speed = 1;
    show();
    flowaudio();
}

function flowaudio() {
    if (audioElement.paused) {
        return;
    }
    if (typeof (hydra.synth.a) == "undefined") {
        hydra.synth.a = new Html5Audio({
            numBins: 6,
            parentEl: hydra.canvas.parentNode,
            sourceEl: audioElement
        });
        hydra.detectAudio = true;
        hydra.sandbox.add("a");
        a.hide();
        a.setScale(6); a.setCutoff(4); a.setSmooth(0.8);
        a.beat.threshold = 24;
        a.liveBeats(36, rehydrate);
    }
    a.beatCount = 1;
}