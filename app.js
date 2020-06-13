class DrumKit {
    constructor() {
        this.pads = document.querySelectorAll(".pad");
        this.playBtn = document.querySelector(".play");
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
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
            this.playBtn.innerText = "Stop";
            // If Not - Begin Interval
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
        } else {
            this.playBtn.innerText = "Play";
            // If It Is - Stop Interval
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
    }
}

const drumKit = new DrumKit();

drumKit.pads.forEach((pad) => {
    pad.addEventListener("click", drumKit.activatePad);
    pad.addEventListener("animationend", function () {
        this.style.animation = "";
    });
});

drumKit.playBtn.addEventListener("click", () => drumKit.start());
