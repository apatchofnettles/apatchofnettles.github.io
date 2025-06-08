
export class Html5Audio {
    constructor({
        numBins = 4,
        cutoff = 2,
        smooth = 0.4,
        max = 15,
        scale = 10,
        isDrawing = false,
        parentEl = document.body,
        audioEl = document.querySelector("audio")
    }) {
        this.vol = 0
        this.scale = scale
        this.max = max
        this.cutoff = cutoff
        this.smooth = smooth
        this.setBins(numBins)
        // this could live in setBins
        // but is not known to original hydra/meyda audio
        // Allow for (de)normalise and skew of bins after sampling:
        this.binScales = Array(numBins).fill(0)

        // beat detection from: https://github.com/therewasaguy/p5-music-viz/blob/gh-pages/demos/01d_beat_detect_amplitude/sketch.js
        this.beat = {
            holdFrames: 20,
            threshold: 40,
            _cutoff: 0, // adaptive based on sound state
            decay: 0.98,
            _framesSinceBeat: 0 // keeps track of frames
        }

        // again, adding to original hydra/meyda
        // lets make beats do something, responding to each one
        // & hitting a callback on every 'n' cycle
        // a.liveBeats() sets these up for use
        this.beatCount = 0;
        this.beatCycle = 1024;
        this.beatCycleCallback = (() => { });
        // default beat action is to rescale bin denormalisation (ripple)
        // and re-register 'update' to modulate master time against bins (beatmod)
        // this is great to make non-reactive scripts automatically track audio
        // scripts already driving on a.bins() and hydra.update() likely won't need liveBeats()
        // applying your own hydra.update() will need attention to:
        //  - declaring a preferred beatCallback on liveBeats
        //  - and/or overloading betMod for your own actions
        this.beatCallback = (() => { });

        this.onBeat = () => {
            // console.log("beat")
        }

        this.canvas = document.createElement('canvas')
        this.canvas.width = 100
        this.canvas.height = 80
        this.canvas.style.width = "100px"
        this.canvas.style.height = "80px"
        this.canvas.style.position = 'absolute'
        this.canvas.style.right = '0px'
        this.canvas.style.bottom = '0px'
        parentEl.appendChild(this.canvas)

        this.isDrawing = isDrawing
        this.ctx = this.canvas.getContext('2d')
        this.ctx.fillStyle = "#DFFFFF"
        this.ctx.strokeStyle = "#0ff"
        this.ctx.lineWidth = 0.5

        if (!this.meyda) {
            const audioCtx = new AudioContext();
            const source = new MediaElementAudioSourceNode(audioCtx, {
                mediaElement: audioEl,
            });
            source.connect(audioCtx.destination);
            this.stream = source
            this.context = audioCtx;
            let audio_stream = source;
            this.meyda = Meyda.createMeydaAnalyzer({
                audioContext: this.context,
                source: audio_stream,
                featureExtractors: [
                    'loudness',
                    //  'perceptualSpread',
                    //  'perceptualSharpness',
                    //  'spectralCentroid'
                ]
            })
            //     })
            //     .catch((err) => console.log('ERROR', err))
            //   }
        }
    }

    detectBeat(level) {
        //console.log(level,   this.beat._cutoff)
        if (level > this.beat._cutoff && level > this.beat.threshold) {
            this.onBeat()
            this.beat._cutoff = level * 1.2
            this.beat._framesSinceBeat = 0
        } else {
            if (this.beat._framesSinceBeat <= this.beat.holdFrames) {
                this.beat._framesSinceBeat++;
            } else {
                this.beat._cutoff *= this.beat.decay
                this.beat._cutoff = Math.max(this.beat._cutoff, this.beat.threshold);
            }
        }
    }

    tick() {
        if (this.meyda) {
            var features = this.meyda.get()
            if (features && features !== null) {
                this.vol = features.loudness.total
                this.detectBeat(this.vol)
                // reduce loudness array to number of bins
                const reducer = (accumulator, currentValue) => accumulator + currentValue;
                let spacing = Math.floor(features.loudness.specific.length / this.bins.length)
                this.prevBins = this.bins.slice(0)
                this.bins = this.bins.map((bin, index) => {
                    return features.loudness.specific.slice(index * spacing, (index + 1) * spacing).reduce(reducer)
                }).map((bin, index) => {
                    // map to specified range

                    // return (bin * (1.0 - this.smooth) + this.prevBins[index] * this.smooth)
                    return (bin * (1.0 - this.settings[index].smooth) + this.prevBins[index] * this.settings[index].smooth)
                })
                // var y = this.canvas.height - scale*this.settings[index].cutoff
                // this.ctx.beginPath()
                // this.ctx.moveTo(index*spacing, y)
                // this.ctx.lineTo((index+1)*spacing, y)
                // this.ctx.stroke()
                //
                // var yMax = this.canvas.height - scale*(this.settings[index].scale + this.settings[index].cutoff)
                this.fft = this.bins.map((bin, index) => (
                    // Math.max(0, (bin - this.cutoff) / (this.max - this.cutoff))
                    Math.max(0, (bin - this.settings[index].cutoff) / this.settings[index].scale)
                ))
                if (this.isDrawing) this.draw()
            }
        }
    }

    setCutoff(cutoff) {
        this.cutoff = cutoff
        this.settings = this.settings.map((el) => {
            el.cutoff = cutoff
            return el
        })
    }

    setSmooth(smooth) {
        this.smooth = smooth
        this.settings = this.settings.map((el) => {
            el.smooth = smooth
            return el
        })
    }

    setBins(numBins) {
        this.bins = Array(numBins).fill(0)
        this.prevBins = Array(numBins).fill(0)
        this.fft = Array(numBins).fill(0)
        this.settings = Array(numBins).fill(0).map(() => ({
            cutoff: this.cutoff,
            scale: this.scale,
            smooth: this.smooth
        }))
        // to do: what to do in non-global mode?
        this.bins.forEach((bin, index) => {
            window['a' + index] = (scale = 1, offset = 0) => () => (a.fft[index] * scale + offset)
        })
        //  console.log(this.settings)
    }

    setScale(scale) {
        this.scale = scale
        this.settings = this.settings.map((el) => {
            el.scale = scale
            return el
        })
    }

    setMax(max) {
        this.max = max
        console.log('set max is deprecated')
    }
    hide() {
        this.isDrawing = false
        this.canvas.style.display = 'none'
    }

    show() {
        this.isDrawing = true
        this.canvas.style.display = 'block'

    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        var spacing = this.canvas.width / this.bins.length
        var scale = this.canvas.height / (this.max * 2)
        //  console.log(this.bins)
        this.bins.forEach((bin, index) => {

            var height = bin * scale

            this.ctx.fillRect(index * spacing, this.canvas.height - height, spacing, height)

            //   console.log(this.settings[index])
            var y = this.canvas.height - scale * this.settings[index].cutoff
            this.ctx.beginPath()
            this.ctx.moveTo(index * spacing, y)
            this.ctx.lineTo((index + 1) * spacing, y)
            this.ctx.stroke()

            var yMax = this.canvas.height - scale * (this.settings[index].scale + this.settings[index].cutoff)
            this.ctx.beginPath()
            this.ctx.moveTo(index * spacing, yMax)
            this.ctx.lineTo((index + 1) * spacing, yMax)
            this.ctx.stroke()
        })
    }

    // Note! beat and ripple here do not pretend to act well if non-global
    // ToDo?

    liveBeats(cycle, cycleCallback, beatCallback) {
        this.beatCycle = cycle ?? 1024;
        this.beatCycleCallback = cycleCallback ?? (() => { });
        this.beatCallback = beatCallback ?? this.ripple;
        const self = this;
        this.onBeat = () => {
            self.beatCount++;
            if (!(self.beatCount % self.beatCycle)) {
                self.beatCycleCallback();
            };
            self.beatCallback();
        }
    }

    ripple() {
        self = this;
        if (typeof (a) != "undefined") {
            for (let i = 1; i < this.bins.length; i++) {
                this.binScales[i] = Math.random() + (this.bins[i] / this.bins[0]);
            }
            this.binScales[0] = this.bins[this.bins.length - 1];
            update = self.beatMod;
        }
    }

    beatMod() {
        time = time + (
            (a.beat._framesSinceBeat * (a.binScales[0] + a.binScales[5]) * (a.binScales[1] + a.binScales[4]) * a.fft[0] / 2)
            + (a.fft[0] * a.fft[3] * (a.binScales[0] + a.binScales[3]))
            - (a.fft[1] * a.fft[4] * (a.binScales[1] + a.binScales[4]))
            - (a.fft[2] * a.fft[5] * (a.binScales[2] + a.binScales[5]))
        ) / 32;
    };
}
