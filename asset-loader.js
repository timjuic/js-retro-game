export default class AssetLoader {
    constructor() {
        this.bulletAssets = {};
        this.enemyAssets = {}
        this.otherAssets = {};
        this.audioAssets = {}
        this.enemyImageDataObjects = {};
        this.playerAsset;

        this.loadBulletAssets();
        this.loadEnemyAssets()
        this.loadOtherAssets();
        this.loadEnemyImagesData(); // Preloading image data for each enemy as cache for explosion effects
        this.loadAudioAssets();

    }

    loadBulletAssets() {
        let bulletAssetNames = ['bullet.png', 'enemybullet.png'];
        this.loadImages(bulletAssetNames, this.bulletAssets);
    }

    loadEnemyAssets() {
        let enemyAssetNames = ['enemy1.png', 'enemy2.png'];
        this.loadImages(enemyAssetNames, this.enemyAssets);   
    }

    loadOtherAssets() {
        let otherAssets = ['shield_icon.png'];
        this.loadImages(otherAssets, this.otherAssets);
    }

    loadImages(assetNames, assetType) {
        assetNames.forEach(assetName => {
            let assetImage = new Image();
            assetImage.src = `./assets/${assetName}`;
            assetType[assetName.split('.')[0]] = assetImage;
        });
    }

    loadAudioAssets() {
        let audioAssetFileNames = ['enemy_death.wav', 'menu_hover.mp3'];
        audioAssetFileNames.forEach(fileName => {
            this.audioAssets[fileName.split('.')[0]] = new Audio(`./assets/sounds/${fileName}`)
        })
    }

    loadEnemyImagesData() {
        let testCanvas = document.createElement('canvas');
        let testContext = testCanvas.getContext('2d');
        Array.from(Object.keys(this.enemyAssets)).forEach(enemyAssetName => {
            let img = this.enemyAssets[enemyAssetName];
            img.onload = () => {
                testCanvas.width = img.width;
                testCanvas.height = img.height;
                testContext.drawImage(img, 0, 0, img.width, img.height);
                this.enemyImageDataObjects[enemyAssetName] = testContext.getImageData(0, 0, img.width, img.height)
            }
        })
    }
    

    loadPlayer() {

    }
}