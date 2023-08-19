
export default class CrosshairManager {
    constructor(game) {
        this.game = game
        let canvas = this.game.getCanvasManager().getCanvas('playerCanvas');
        this.baseWidth = 6 / 100;
        this.baseHeight = 6 / 100;
        this.posX;
        this.posY;
        this.aimX;
        this.aimY;
        this.width = this.baseWidth * canvas.width
        this.height = this.baseHeight * canvas.width
        this.color = "blue"
        this.image = this.game.getAssetManager().other.crosshair3;

        let crosshairCanvas = this.game.getCanvasManager().getCanvas("crosshairCanvas")
        window.addEventListener('mousemove', (e) => {
            let upperBorderHeight = (window.innerHeight - crosshairCanvas.height) / 2
            let leftBorderWidth = (window.innerWidth - crosshairCanvas.width) / 2
            this.posX = e.pageX - leftBorderWidth - this.width / 2;
            this.posY = e.pageY - upperBorderHeight - this.height / 2;
            this.aimX = this.posX + this.width / 2;
            this.aimY = this.posY + this.height / 2
            this.draw('crosshairCanvas')
        })
    }

    draw(canvasName) {
        let canvas = this.game.getCanvasManager().getCanvas(canvasName)
        let ctx = this.game.getCanvasManager().getContext(canvasName)
        ctx.fillStyle = this.color
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
     }
}