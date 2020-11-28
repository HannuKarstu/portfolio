/* Luo mediaplayer-olio */

var Mediaplayer = function() {

	var audio = document.getElementById('audio');

	var songs = ["http://opengameart.org/sites/default/files/Soliloquy_1.mp3",
				 "http://opengameart.org/sites/default/files/Sigil_3.ogg",
				 "http://opengameart.org/sites/default/files/sadorchestralbgm%28syncopika%29.wav",];

		
	// LOAD FIRST SONG
	audio.src = songs[0];


	// SONG LIST
	var x = document.getElementById("selectlista");

	for (var song in songs) {
		var biisi = document.createElement("option");
		teksti = songs[song].toString().trim().split("http://opengameart.org/sites/default/files/")
		biisi.text = teksti[1];
		let a = song;
		biisi.addEventListener('click', function() {chooseSong(a);}, false);
		// biisi.addEventListener('click', chooseSong(song), false); // EI TOIMI, AJAA FUNKTION 3 KRT HETI KÄYNNISTÄESSÄ
		// biisi.addEventListener('click', chooseSong, false);
		x.options.add(biisi);
	}


	/* Alusta mediasoitin */
	initMediaplayer();

	/* Alusta soitin, luo tapahtumat */
	function initMediaplayer() {
		document.getElementById('btnPlay').addEventListener('click', playMusic, false);
		document.getElementById('btnPause').addEventListener('click', pauseMusic, false);
		document.getElementById('btnStop').addEventListener('click', stopMusic, false);
		// document.getElementById('btnVolUp').addEventListener('click', volumeUp, false);
		// document.getElementById('btnVolDown').addEventListener('click', volumeDown, false);
		document.getElementById('btnNext').addEventListener('click', nextSong, false);
		document.getElementById('btnPrev').addEventListener('click', prevSong, false);
		
		
	}
	
	// VOLUME SLIDER
	var slider = document.getElementById("Volume");
	var outputvol = document.getElementById("Volume_is");
	outputvol.innerHTML = slider.value;

	slider.oninput = function() {
		audio.volume = this.value/100;
		outputvol.innerHTML = parseInt(audio.volume*100);
	}

	// DURATION SLIDER
	var sliderdur = document.getElementById("Duration");
	sliderdur.onchange = function() {
		audio.currentTime = this.value;
	}

	// SHOW DURATION / LENGTH / SONG NAME
	var outputdur = document.getElementById("Duration_is");
	var outputlen = document.getElementById("Length_is");
	var outputrem = document.getElementById("Remaining_is")
	var outputsong = document.getElementById("Song_is");
	//outputdur.innerHTML = sliderdur.value;

	var myVar;

	function myFunction() {
		myVar = setInterval(kesto, 1000);
	}


	// SECONDS TO MINUTES
	function timebymin(seconds) {
		return parseInt((seconds/60));
	}

	// DURATION + DURATION SLIDER + SONG NAME
	// UPDATE ON MUSIC TIME
	audio.ontimeupdate = function() {

		// CURRENT TIME
		var minutes = timebymin(audio.currentTime)
		var seconds = parseInt(audio.currentTime) - timebymin(audio.currentTime)*60;
		outputdur.innerHTML = minutes + ":" + seconds;

		// REMAINING TIME
		var minutesrem = timebymin(audio.duration - audio.currentTime)
		var secondsrem = parseInt(audio.duration - audio.currentTime) - timebymin(audio.duration - audio.currentTime)*60;
		outputrem.innerHTML = minutesrem + ":" + secondsrem;

		// DURATION OF SONG
		var minutesdur = timebymin(audio.duration)
		var secondsdur = parseInt(audio.duration) - timebymin(audio.duration)*60;
		outputlen.innerHTML = minutesdur + ":" + secondsdur;

		// SLIDER
		sliderdur.value = parseInt(audio.currentTime);
		sliderdur.max = parseInt(audio.duration);

		// SONG NAME
		outputsong.innerHTML = audio.src.toString().trim().split("http://opengameart.org/sites/default/files/");

		// NEXT SONG WHEN AT THE END
		if ((audio.duration - audio.currentTime) <= 1) {
			nextSong();
		}

	}


	// PLAY
	function playMusic() {
		audio.play();
		audio.volume = 0.5;
	}

	// STOP
	function stopMusic() {
		audio.pause();
		audio.currentTime = 0;
	}

	// PAUSE
	function pauseMusic() {
		audio.pause();
		/* Lisää toiminnallisuus */
	}

	// VOL UP
	function volumeUp() {
		audio.volume = audio.volume + 0.1;
		/* Lisää toiminnallisuus */
	}


	// VOL DOWN
	function volumeDown() {
		audio.volume = audio.volume - 0.1;
		/* Lisää toiminnallisuus */
	}

	currentsong = 0;

	// NEXT
	function nextSong() {
		if (currentsong == (songs.length - 1)) {
			audio.src = songs[currentsong];
		}
		else {
		currentsong = currentsong + 1;
		audio.src = songs[currentsong];}
		
		audio.play();
	}

	// PREV
	function prevSong() {
		// alert(this.innerHTML);
		if (currentsong == 0) {
			audio.src = songs[currentsong];
		}
		else {
		currentsong = currentsong - 1;
		audio.src = songs[currentsong];}

		audio.play();
	}

	function chooseSong(a) {
		// alert("choosesong");
		audio.src = songs[a];
		audio.play();
	}

}
