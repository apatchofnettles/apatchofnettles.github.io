# hTrack - An audio player in html5

# Why does this exist?
 - To present and share a gallery of video animations made with <a href="https://hydra.ojack.xyz">Hydra</a> video synth, without needing to share numerous code links and explain how to run and hide open code.
 - To easily upload and share audio albums without engagement of large media platforms or concerted interest in promotion and distribution.

 # How would I use it?
  - Quickly explore hTrack running as a local-file audio player in demo mode from <a href="https://apatchofnettles.github.io">here</a>.
  - Clone, fork or download the hTrack repository.<br><br>

  - hTrack will run properly anywhere you can host it as a static site. 
  - Github Pages is a simple option, if you do not have a large quantity of audio files.
  - If you want to host a lot of audio, investigate options allowing distinction between code and data assets.
  - A Bucket or CDN type storage for audio files may be attractive.
  - Decide how you want to host the static site, and confirm you can deploy hTrack in demo mode, without any changes to the original repository.<br><br>

  - Make note of <a href="https://github.com/apatchofnettles/apatchofnettles.github.io/blob/master/example_app_config.json">"example_app_config.json"</a>
  - Upload your audio/albums, whether by adding folders and files to the static site repo source or by uploading directly to some accessible storage.
  - Create a new "app_config.json" file following the example.
  - If tracks in albums have a common file path prefix, set it as the album path like: {"path":"albumStorageURI"}.
  - Otherwise fully qualifify each {"tracks":[{"track":"mixedStorageURI/hasFilename.mp3"}]} with the full path and filename.
  - True/False values do not need to be quoted, eg: {"tracks":[{"share": true}]} will tell hTrack to allow clipboarding share links of the track when playing.<br><br>

  - Deploy hTrack with the new app_config and your audio assets uploaded.
  - Check that albums and tracks are presented as expected.
  - Take close note of the various release, license, description fields and further customise app_config for desired information.
  - Also note <a href="https://github.com/apatchofnettles/apatchofnettles.github.io/blob/master/app_launch.html">"app_launch.html"</a>.
  - Replace with your own HTML to customise a splash screen or release page. 
  - Set app_config {"launch":true,false} to control whether the splash is displayed.<br><br>


# Attribution
  - You can use and deploy hTrack freely, but be sure to preserve the existing attribution.
  - Clarify your own attribution and media licensing in app_config as relevant.
  - Do not alter the standing attribution messages coded into the hTrack source.<br><br>

hTrack is from the Gooseyard.
Hydra is by <a href='https://ojack.xyz/about/'>ojack</a>
, used here under <a href='https://github.com/hydra-synth/hydra-synth/blob/main/LICENSE'>AGPL</a>.
Hydra audio extensions use <a href='https://meyda.js.org/'>Meyda</a>
under <a href='https://github.com/meyda/meyda/blob/main/LICENSE.md'>MIT</a> license.
