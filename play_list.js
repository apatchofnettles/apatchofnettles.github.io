
export class Tracking {

    constructor({
        container, canvas, standby, catalogue
    }) {
        this.oled_container = container;
        this.oled_canvas = canvas;
        this.oled_ctx = this.oled_canvas.getContext('2d');
        this.oled_scrollX = 0;
        this.oled_scrollSpeed = 4;
        this.redrawn = 0;

        this.localMode = (catalogue.length == 0);
        if (this.localMode) {
            this.albums = this.albumDefaults();
        } else {
            this.albums = catalogue;
        }

        this.album = {};
        this.trackPos = 0;
        this.track = "";
        this.trackName = "";
        this.shuffle = false;
        this.trackLength = 0;
        this.detail = "";
        this.standbyText = standby;

        this.first();
        this.unmarq();
        this.oled_draw();
    }

    linerNotes() {
        const notes = {
            album: this.album?.title ?? "Unreleased",
            track: this.track ?? "",
            trackname: ((this.trackName == "") ? this.track : this.trackName),
            names: [],
            pitch: this.album?.notes?.caption ?? "",
            artist: this.album?.notes?.artist ?? "",
            attribution: this.album?.notes?.attribution ?? "",
            download: this.album?.tracks[this.trackPos]?.download ?? false,
            share: this.album?.tracks[this.trackPos]?.share ?? false,
        };
        this.album?.tracks.forEach((t) => { notes.names.push((t?.name) ? t.name : t.track); });

        notes.download = encodeURIComponent((notes.album + "_" + notes.track).replace(/[^a-z0-9\.]/gi, '_').toLowerCase());
        notes.trackrequest = (new URL(window.location)?.origin ?? "")
            + "/?titled="+notes.download
            +"&request=" + btoa(JSON.stringify({ "album": notes.album, "track": notes.track }));
        notes.trackorigin = (new URL(window.location)?.origin ?? "")
            + "/" + this.pathPrepended();
        return notes;
    }

    pathPrepended() {
        return this.album.path ? (this.album.path + "/" + this.track) : this.track;
    }

    mountTrack() {
        this.track = this.album.tracks[this.trackPos].track;
        this.trackName = (this.album.tracks[this.trackPos]?.name) ? this.album.tracks[this.trackPos].name : "";
        this.remarq();
        return this.pathPrepended();
    }

    shuffleMode(mode) {
        this.shuffle = mode;
        this.remarq();
    }

    seek(album, track) {
        this.album=this.albums[Number(album)];
        this.trackPos=Number(track);
            return this.mountTrack();
    }

    request(trackRequest) {
        try {
            const choose = JSON.parse(atob(trackRequest));
            const chooseAlbum = this.albums.find((a) => a.title == choose?.album);
            if (!chooseAlbum) { return this.mountTrack(); }
            this.album = chooseAlbum;
            this.trackPos = 0;
            let pos = 0;
            const chooseTrack = chooseAlbum.tracks.find((t) => { pos++; return t.track == choose?.track; });
            if (!chooseTrack) { return this.mountTrack(); }
            this.trackPos = pos - 1;
            return this.mountTrack();
        } catch {
            return this.mountTrack();
        }
    }

    now() {
        return this.pathPrepended();
    }

    first() {
        this.album = this.albums[Math.floor((Math.random() * this.albums.length))];
        this.trackPos = 0;
        return this.mountTrack();
    }

    next() {
        if (this.shuffle) return this.anyOf();
        let next = this.trackPos + 1;
        if (next == this.album.tracks.length) {
            next = (this.albums.indexOf(this.album) + 1) % this.albums.length;
            this.album = this.albums[next];
            next = 0;
        }
        this.trackPos = next;
        return this.mountTrack();
    }

    prev() {
        if (this.shuffle) return this.anyOf();
        let prev = this.trackPos - 1;
        if (prev < 0) {
            prev = (this.albums.indexOf(this.album) - 1);
            if (prev < 0) {
                prev = this.albums.length - 1;
            }
            this.album = this.albums[prev];
            prev = this.album.tracks.length - 1;
        }
        this.trackPos = prev;
        return this.mountTrack();
    }

    anyOf() {
        this.album = this.albums[Math.floor((Math.random() * this.albums.length))];
        this.trackPos = Math.floor((Math.random() * this.album.tracks.length));
        return this.mountTrack();
    }

    timeTrack(trackLength) {
        this.trackLength = trackLength;
        this.detail = " : "
            + Math.floor(trackLength / 60)
            + ":" + String(Math.floor(trackLength % 60)).padStart(2, '0');
    }

    remarq() {
        this.oled_text = this.album['title'] + " : "
            + ((this.trackName == "") ? this.track : this.trackName);
        this.oled_text += this.detail;
        this.oled_text += " : ";
        this.oled_text += (this.shuffle ? "SHUFFLE" : "PLAYING") + " : ";
        this.oled_layup();
    }

    unmarq() {
        this.oled_text = this.standbyText;
        this.oled_layup();
    }

    loadLocal(fileList) {
        this.albums = [{
            title: "Loaded Playlist",
            path: "",
            tracks: fileList,
            notes: {
                caption: "Now playing on hTrack.",
                artist: "",
                attribution: "Use the player buttons to control audio and images.",
            }
        }];
        return this.first();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    oled_layup() {
        this.oled_canvas.width = this.oled_container.clientWidth;
        this.oled_canvas.height = this.oled_container.clientHeight;
        this.oled_wires = this.oled_mask();
        const styler = window.getComputedStyle(this.oled_container, null);
        this.textFlare = " 900 " + styler.getPropertyValue("font");
        this.textFlat = " 550 " + styler.getPropertyValue("font");
        this.oled_ctx.font = this.textFlat;
        this.oled_ctx.fillStyle = "rgba(0,0,0,0)";
        this.oled_ctx.strokeStyle = "rgba(0,0,0,0)";
        this.oled_ctx.filter = "none";
        this.oled_ctx.textBaseline = 'middle';
        this.textWidth = this.oled_ctx.measureText(this.oled_text).width;
    }

    oled_mask() {
        this.oled_ctx.filter = "none";
        this.oled_ctx.lineWidth = 1;
        this.oled_ctx.strokeStyle = "rgba(0,0,0,0.275)";
        for (var y = 0; y < this.oled_canvas.height; y += 5) {
            for (var x = 0; x < this.oled_canvas.width; x += 5) {
                this.oled_ctx.strokeRect(x + 1, y + 1, 5, 5);
            }
        }
        const image = new Image();
        image.id = "oled_wires";
        image.src = this.oled_canvas.toDataURL();
        return image;
    }

    oled_stamp() {
        // Draw current
        this.oled_ctx.fillText(this.oled_text, this.oled_scrollX, this.oled_canvas.height / 2);
        // And scrolling tail copy
        this.oled_ctx.fillText(this.oled_text, this.oled_scrollX + this.textWidth, this.oled_canvas.height / 2);
    }

    oled_draw() {
        this.redrawn++;
        // skip frames:
        // reduces animation overheads
        // and shuffles flare effects onto 'factorials'
        if (this.redrawn % 3) { requestAnimationFrame(this.oled_draw.bind(this)); return; }

        this.oled_ctx.filter = "none";
        this.oled_ctx.clearRect(0, 0, this.oled_canvas.width, this.oled_canvas.height);

        if (this.oled_scrollX < -this.textWidth) {
            this.oled_scrollX = 0;
        }

        if (!(this.redrawn % 2)) {
            this.oled_ctx.filter =
                "opacity(1) drop-shadow("
                + ((this.redrawn % 11) - 6) / 4 + "px "
                + ((this.redrawn % 13) - 7) / 5 + "px "
                + (this.redrawn % 2) + "px red) blur("
                + (this.redrawn % 4) + "px) brightness( "
                + ((this.redrawn % 7) / 3) + ")";
            this.oled_ctx.fillStyle = "orangered";
            this.oled_ctx.font = this.textFlare;
            this.oled_stamp();
        }

        this.oled_ctx.filter = "none";
        this.oled_ctx.fillStyle = "orange";
        this.oled_ctx.font = this.textFlat;
        this.oled_stamp();

        this.oled_ctx.drawImage(this.oled_wires, 0, 0);

        this.oled_scrollX -= this.oled_scrollSpeed;
        requestAnimationFrame(this.oled_draw.bind(this));
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    albumDefaults() {
        return [
            {
                "title": "Welcome to hTrack",
                "path": "",
                "notes": {
                    "caption": "Select files on your device to start a playlist.",
                    "artist": "Use the player buttons to control audio and images.",
                    "attribution": "Clone hTrack to host your own album releases.<br/><br/>"+
                    "Demo Vibes from: <a target='_blank' rel='noopener noreferrer'"
                        +" href='https://archive.org/details/SawOctet' style='text-decoration: none'>"
                        +"Saw Octet, Johannes Bergmark</a> by CC license."
                },
                "tracks": [
                    {
                        track: "demo.mp3",
                        name: "Demo Vibes",
                    }
                ],
            },
        ];
    }
}