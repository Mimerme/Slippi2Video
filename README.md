# Slippi2Video
Script that automatically records Slippi replays

## Requirnments
- OBS
- OBS Websocket
- NodeJS

## Usage
1) Clone the entire repo (node_modules might get removed later but for now it stays)

2) Edit `slippirecord.js` and modify the variables `dolphin_path`, `replay_path`, `obs_port`, and `melee_path` accordingly

NOTE: currently the script doesn't support passwords when connecting to OBS websocket

3) Go into the Slippi Desktop App -> Configure Settings -> Configure Dolphin

4) Launch OBS -> Add Window Capture Source -> Add the Dolphin Window as a source

5) You can exit dolphin now

6) Go into the directory containing `slippirecord.js` and run `node slippirecord.js`

7) Enter the game id and watch ur replay get recorded.

## Notes
- All this script does is click the record button for you after launching Slippi's version of Dolphin. This means that you can configure OBS however you want.
- You might also want to configure Dolphin to use fullscreen when it launches in Graphics -> Display
- Might support batch replay recordings in the future
