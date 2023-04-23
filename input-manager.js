export default class InputManager {
    constructor(game) {
        this.game = game;
        this.pressedControls = {}
        this.loadDefaultControls()
        this.registerListeners()
    }

    loadDefaultControls() {
        this.controls = {
            moveUp: ['w'],
            moveRight: ['d'],
            moveDown: ['s'],
            moveLeft: ['a'],
            shoot: [0]
        }
    }

    registerListeners() {
        window.addEventListener('keydown', (event) => {
            let control = this.#getPressedControl(event)
            if (!control) return
            if (this.pressedControls[control]) return;
            this.pressedControls[control] = true;
            this.game.events.emit('playerInput', control)
        })
        window.addEventListener('keyup', (event) => {
            let control = this.#getPressedControl(event)
            if (!control) return
            this.pressedControls[control] = false;
            this.game.events.emit('playerInput', control)
        })
        window.addEventListener('mousedown', (event) => {
            let control = this.#getPressedControl(event)
            if (!control) return
            if (this.pressedControls[control]) return;
            this.pressedControls[control] = true;
            this.game.events.emit('playerInput', control)
        })
        window.addEventListener('mouseup', (event) => {
            let control = this.#getPressedControl(event)
            if (!control) return
            this.pressedControls[control] = false;
            this.game.events.emit('playerInput', control)
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