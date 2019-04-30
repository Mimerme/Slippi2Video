const OBSWebSocket = require('obs-websocket-js');
const obs = new OBSWebSocket();
const child_process = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var dolphin_path = "C:\\Users\\Andros Yang\\AppData\\Roaming\\Slippi Desktop App\\dolphin\\Dolphin.exe";
var replay_path = "C:\\Users\\Andros Yang\\Desktop\\FM-v5.9-Slippi-r10-Win\\Slippi";
var replay_id = "Game_20190330T133316";
var obs_port = 4444;
var melee_path = "C:\\Users\\Andros Yang\\Desktop\\Dolphin\\SSBMv102.iso";

rl.question('Enter Slippi GameID: ', (answer) => {
	replay_id = answer;

	/*Generate the replay config file that slippi's custom dolphin build takes*/
	//idk why slippi needs this, seems kinda useless
	var uniqueID = crypto.randomBytes(3 * 4).toString('hex');
	var comm_config = {"mode": "normal", "replay": replay_path + "\\" + replay_id + ".slp", "isRealTimeMode": false, "commandId": uniqueID};
	var json = JSON.stringify(comm_config);
	fs.writeFile('slip.json', json, 'utf8', function(){});

	/*Begin the recording process*/
	obs.connect({ address: 'localhost:4444'}).then(() => {
		console.log("Connected to OBS. Starting the recording");
		obs.send("StartRecording");
		console.log("Dolphin started...");
		child_process.spawnSync(dolphin_path, ['-i', 'slip.json', '-b', '-e', melee_path]);
	})
	.then(() => {
		console.log("Dolphin stopped...\nStopping the recording");
		obs.send("StopRecording");
		obs.disconnect();
	});

  rl.close();
});