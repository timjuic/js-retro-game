import CornerWave from "../waves/corner-wave.js";
import LineWave from "../waves/line-wave.js";
import RandomWave from "../waves/random-wave.js";
import SquareWave from "../waves/square-wave.js";

export default class WaveTypes {
    static CORNER_WAVE = CornerWave;
    // static LINE_WAVE = LineWave;
    static SQUARE_WAVE = SquareWave;
    static RANDOM_WAVE = RandomWave;
}