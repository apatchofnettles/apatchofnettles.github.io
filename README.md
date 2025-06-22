# hTrack, From The Gooseyard
# An audio player in html5
<br>

# Why does this exist?

+    To present and share a gallery of video animations made with <a href="https://hydra.ojack.xyz">Hydra</a> video synth, without needing to share numerous code links and explain how to run and hide open code.
+    To easily upload and share audio albums without engagement of large media platforms or concerted interest in promotion and distribution.<br><br>

# What can hTrack do?

+    Play audio tracks from your device's local file system with sound reactive visualisations. (Demo mode)
+    Load audio from a URL / remote resource and play it with descriptive annotations. (Single Play)
+    Catalogue and present albums hosted on remote storage with simple to set up branding and attribution.
+    Manage a gallery of audio visualisations written using Hydra.<br><br>

# How would I use it?

+    Quickly explore hTrack running as a local file audio player in demo mode from <a href="https://apatchofnettles.github.io">here</a>
+    You can also make links for public files from the web, by adding a path and parameters to the URL.
+    A link is indicated by '?single=' and hTrack will adapt annotations if you provide 'name=', 'artist=', 'message=' or 'license='.
+    eg:
~~~
apatchofnettles.github.io?name=Shared For You&single=https://apatchofnettles.github.io/demo.mp3&message=New Track Today!
~~~
+    Consider hTrack to catalogue and share your own audio uploads.
+    Clone, fork or download the hTrack repository.<br><br>
+    hTrack will run properly anywhere you can host it as a static site. 
+    Github Pages is a simple option, if you do not have a large quantity of audio files.
+    If you want to host a lot of audio, investigate options allowing distinction between code and data assets.
+    A Bucket or CDN type storage for audio files may be attractive.<br><br>
+    Decide how you want to host the static site, and confirm you can deploy hTrack in demo mode, without any changes to the original repository.
+    Make note of <a href="https://github.com/apatchofnettles/apatchofnettles.github.io/blob/master/example_app_config.json">"example_app_config.json"</a>
+    Upload your audio/albums, whether by adding folders and files to the static site source or by uploading directly to some accessible storage.<br><br>
+    Create a new "app_config.json" file following the example.
+    If tracks in albums have a common file path prefix, set it as the album path like: {"path":"albumStorageURI"}.
+    Otherwise fully qualifify each {"tracks":[{"track":"mixedStorageURI/hasFilename.mp3"}]} with the full path and filename.
+    True/False values do not need to be quoted, eg: {"tracks":[{"share": true}]} will tell hTrack to allow clipboarding share links of the track when playing.<br><br>
+    Deploy hTrack with the new app_config and your audio assets uploaded.
+    Check that albums and tracks are presented as expected.
+    Take close note of the various release, license, description fields and further customise app_config for desired information.<br><br>
+    Also note <a href="https://github.com/apatchofnettles/apatchofnettles.github.io/blob/master/app_launch.html">"app_launch.html"</a>.
+    Replace with your own HTML to customise a splash screen or release page. 
+    Set app_config {"launch":true,false} to control whether the splash is displayed.<br><br>

# How can I change the visuals?

+    See <a href="https://github.com/apatchofnettles/apatchofnettles.github.io/blob/master/player_visuals.js">"player_visuals.js"</a>.
+    Replace the show() function if you have ambitions to generate code algorithmically or stream/inline it from some external source!
+    Otherwise, freely add and remove functions from the exported shows[()=>{},] array of Hydra patches.
+    If you have patches using Hydra's audio and FFT numerics they will work as expected.
+    hTrack also automatically makes simple time based animations become audio responsive.
+    The primary time value is modulated with FFT derived values keyed to the Hydra/Meyda beat detection functions.<br><br>

# Attribution

+    You can use and deploy hTrack freely, but be sure to preserve the existing attribution.
+    Clarify your own attribution and media licensing in app_config as relevant.
+    Check first and be clear regarding correct attribution and licensing when sharing other people's work.
+    Do not alter the standing attribution messages coded into the hTrack source.<br><br>

hTrack is from the Gooseyard.
Hydra is by <a href='https://ojack.xyz/about/'>ojack</a>
, used here under <a href='https://github.com/hydra+   synth/hydra+   synth/blob/main/LICENSE'>AGPL</a>.
Hydra audio extensions use <a href='https://meyda.js.org/'>Meyda</a>
under <a href='https://github.com/meyda/meyda/blob/main/LICENSE.md'>MIT</a> license.
