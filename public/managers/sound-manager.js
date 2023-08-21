export default class SoundManager {
    constructor(game) {
        this.game = game;
        this.soundEnabled = false;
        this.toggleButton = document.querySelector('.toggle-sound-button');
        this.menuButtons = document.querySelectorAll(".menu-button");
        this.soundEnabledIcon = '<i class="fa-solid fa-volume-high icon"></i>'
        this.soundDisabledIcon = '<i class="fa-solid fa-volume-xmark icon"></i>'

        this.updateMenuButton()
        this.toggleButton.addEventListener('click', () => {
            this.toggleSound();
        })

        this.menuButtons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.playSound('menu_hover.mp3')
            })
        })
    }

    playSound(soundName) {
        if (!this.soundEnabled) return;
        let fullPath = `./assets/sounds/${soundName}`
        let sound = new Audio(fullPath);
        sound.play();
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        this.updateMenuButton()
    }

    updateMenuButton() {
        if (this.soundEnabled) {
            this.toggleButton.querySelector('i').className = 'fa-solid fa-volume-high';
        } else {
            this.toggleButton.querySelector('i').className = 'fa-solid fa-volume-xmark';
        }
    }
}