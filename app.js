class DrumKit {
    constructor() {
        this.pads = document.querySelectorAll(".pad");
        this.playBtn = document.querySelector(".play");
        this.muteBtns = document.querySelectorAll(".mute");
        this.selects = document.querySelectorAll("select");
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.currentKick = "./sounds/kick-classic.wav";
        this.currentSnare = "./sounds/snare-acoustic01.wav";
        this.currentHihat = "./sounds/hihat-acoustic01.wav";
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
        this.tempoSlider = document.querySelector(".tempo-slider");
    }
    activatePad() {
        this.classList.toggle("active");
    }
    repeat() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);

        // Access Each Bars Pads
        activeBars.forEach((bar) => {
            bar.style.animation = "playTrack 0.3s alternate ease-in-out 2";

            // Check Active Pads
            if (bar.classList.contains("active")) {
                // Play Sound Specific to Each Bar
                if (bar.classList.contains("kick-pad")) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (bar.classList.contains("snare-pad")) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if (bar.classList.contains("hihat-pad")) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        });
        this.index++;
    }
    start() {
        const interval = (60 / this.bpm) * 1000;

        // Check If Already Playing
        if (!this.isPlaying) {
            this.playBtn.classList.add("active");
            this.playBtn.innerText = "Stop";
            // If Not - Begin Interval
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
        } else {
            this.playBtn.classList.remove("active");
            this.playBtn.innerText = "Play";
            // If It Is - Stop Interval
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
    }
    changeSound(e) {
        const trackSelected = e.target.name;
        const soundSelected = e.target.value;
        switch (trackSelected) {
            case "kick-select":
                this.kickAudio.src = soundSelected;
                break;
            case "snare-select":
                this.snareAudio.src = soundSelected;
                break;
            case "hihat-select":
                this.hihatAudio.src = soundSelected;
                break;
        }
    }
    muteTrack(e) {
        const trackIndex = e.target.getAttribute("data-track");
        console.log(e.target.classList);
        e.target.classList.toggle("active");
        if (e.target.classList.contains("active")) {
            switch (trackIndex) {
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.snareAudio.volume = 0;
                    break;
                case "2":
                    this.hihatAudio.volume = 0;
                    break;
            }
        } else {
            switch (trackIndex) {
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.snareAudio.volume = 1;
                    break;
                case "2":
                    this.hihatAudio.volume = 1;
                    break;
            }
        }
    }
    changeTempo(e) {
        const tempoText = document.querySelector(".tempo-num");
        tempoText.innerText = e.target.value;
    }
    updateTempo(e) {
        this.bpm = e.target.value;

        clearInterval(this.isPlaying);
        this.isPlaying = null;

        const playBtn = document.querySelector(".play");
        if (playBtn.classList.contains("active")) {
            this.start();
        }

        console.log(`Current BPM: ${this.bpm}`);
    }
}

const drumKit = new DrumKit();

// Event Listeners
drumKit.pads.forEach((pad) => {
    pad.addEventListener("click", drumKit.activatePad);
    pad.addEventListener("animationend", function () {
        this.style.animation = "";
    });
});

drumKit.playBtn.addEventListener("click", () => drumKit.start());

drumKit.selects.forEach((select) => {
    select.addEventListener("change", (e) => drumKit.changeSound(e));
});

drumKit.muteBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => drumKit.muteTrack(e));
});

drumKit.tempoSlider.addEventListener("input", (e) => {
    drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener("change", (e) => {
    drumKit.updateTempo(e);
});
