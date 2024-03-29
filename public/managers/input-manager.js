import InputType from "../enums/input-type.js";

export default class InputManager {
    constructor(game) {
        this.game = game;
        this.pressedControls = {}
        this.loadDefaultControls()
        this.registerListeners()
    }

    loadDefaultControls() {
        this.controls = {};
        this.controls[`${InputType.UP}`] = ['w', 'ArrowUp'];
        this.controls[`${InputType.RIGHT}`] = ['d', 'ArrowRight'];
        this.controls[`${InputType.DOWN}`] = ['s', 'ArrowDown'];
        this.controls[`${InputType.LEFT}`] = ['a', 'ArrowLeft'];
        this.controls[`${InputType.SHOOT}`] = [0]
        this.controls[`${InputType.TOGGLEPAUSE}`] = ['Escape']
    }

    registerListeners() {
        window.addEventListener('keydown', (event) => {
            let control = this.#getPressedControl(event)
            if (!control) return
            if (this.pressedControls[control]) return;
            this.pressedControls[control] = true;
            this.game.events.emit('playerInput', control, true)
        })
        window.addEventListener('keyup', (event) => {
            let control = this.#getPressedControl(event)
            if (!control) return
            this.pressedControls[control] = false;
            this.game.events.emit('playerInput', control, false)
        })
        window.addEventListener('mousedown', (event) => {
            let control = this.#getPressedControl(event)
            if (!control) return
            if (this.pressedControls[control]) return;
            this.pressedControls[control] = true;
            this.game.events.emit('playerInput', control, true)
        })
        window.addEventListener('mouseup', (event) => {
            let control = this.#getPressedControl(event)
            if (!control) return
            this.pressedControls[control] = false;
            this.game.events.emit('playerInput', control, false)
        })
        window.addEventListener('wheel', (event) => {
            if (event.wheelDelta > 0) {
                this.game.events.emit('weaponChange', true);
            } else if (event.wheelDelta < 0) {
                this.game.events.emit('weaponChange', false);
            }
        })
    }

    #getPressedControl(event) {
        for (const [control, keys] of Object.entries(this.controls)) {
            if (keys.includes(event.key) || keys.includes(event.button)) {
                return control
            }
        }
        return false;
    }
}