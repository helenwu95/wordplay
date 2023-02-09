import MeasurementType from '@nodes/MeasurementType';
import type Evaluator from '@runtime/Evaluator';
import Measurement from '@runtime/Measurement';
import { getDocTranslations } from '@translation/getDocTranslations';
import { getNameTranslations } from '@translation/getNameTranslations';
import TemporalStream from '../runtime/TemporalStream';
import MicrophoneDefinition from './MicrophoneDefinition';

const FFT_SIZE = 32;
const DEFAULT_FREQUENCY = 33;

// A helpful article on getting raw data streams:
// https://stackoverflow.com/questions/69237143/how-do-i-get-the-audio-frequency-from-my-mic-using-javascript
export default class Microphone extends TemporalStream<Measurement> {
    stream: MediaStreamAudioSourceNode | undefined;
    context: AudioContext | undefined;
    analyzer: AnalyserNode | undefined;
    frequencies: Uint8Array = new Uint8Array(FFT_SIZE);
    lastSampleTime: number | undefined = undefined;

    frequency: number;

    constructor(evaluator: Evaluator, frequency: number | undefined) {
        super(
            evaluator,
            MicrophoneDefinition,
            new Measurement(evaluator.getMain(), 100)
        );
        this.frequency = frequency ?? DEFAULT_FREQUENCY;
    }

    computeDocs() {
        return getDocTranslations((t) => t.input.microphone.doc);
    }

    computeNames() {
        return getNameTranslations((t) => t.input.microphone.name);
    }

    // Compute the maximum frequency in the same and convert it to a percentage.
    percent(frequencies: number[]) {
        return new Measurement(
            this.creator,
            Math.floor((100 * Math.max.apply(undefined, frequencies)) / 256)
        );
    }

    tick(time: DOMHighResTimeStamp) {
        if (this.analyzer === undefined) return;

        if (
            this.lastSampleTime === undefined ||
            time - this.lastSampleTime > this.frequency
        ) {
            // Remember when we got the sample.
            this.lastSampleTime = time;

            // Get the sample.
            this.analyzer.getByteFrequencyData(this.frequencies);
            // Get a copy of the frequencies.
            const frequencies = Array.from(this.frequencies);
            // Add the stream value.
            this.add(this.percent(frequencies));
        }
    }

    connect() {
        if (this.analyzer === undefined) return;
        if (this.stream === undefined) return;
        this.stream.connect(this.analyzer);
    }

    setFrequency(frequency: number | undefined) {
        this.frequency = frequency ?? DEFAULT_FREQUENCY;
    }

    start() {
        if (
            typeof navigator === 'undefined' ||
            typeof navigator.mediaDevices == 'undefined'
        )
            return;
        if (this.stream !== undefined) return;

        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            // Create an analyzer that gets 64 frequency samples per time frame.
            this.context = new AudioContext();
            this.analyzer = this.context.createAnalyser();
            this.analyzer.fftSize = FFT_SIZE;
            this.stream = this.context.createMediaStreamSource(stream);

            this.connect();
        });
    }

    stop() {
        // Stop streaming microphone input.
        if (this.stream !== undefined) this.stream.disconnect();
    }

    getType() {
        return MeasurementType.make();
    }
}