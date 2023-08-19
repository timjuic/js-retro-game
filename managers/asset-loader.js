export default class AssetLoader {
    constructor() {
        // this.bulletAssets = {};
        // this.enemyAssets = {}
        // this.otherAssets = {};
        // this.audioAssets = {}
        this.enemyImageDataObjects = {};
        this.playerAsset;

        this.loadBulletAssets();
        this.loadEnemyAssets()
        this.loadOtherAssets();
        this.loadEnemyImagesData();
        this.loadAudioAssets();

    }

    loadBulletAssets() {
        let bulletAssetNames = ['bullet.png', 'enemybullet.png'];
        this.loadImages('bullets', bulletAssetNames);
    }

    loadEnemyAssets() {
        let enemyAssetNames = ['basic.png', 'buff.png', 'tank.png', 'pufpuf.png', 'kamikaze.png', 'shielded.png', 'spawner.png', 'speedy.png', 'teleporter.png', 'player.png'];
        this.loadImages('characters', enemyAssetNames);   
    }

    loadOtherAssets() {
        let otherAssets = ['crosshair3.png'];
        this.loadImages('other', otherAssets);
    }

    loadImages(assetType, assetNames) {
        this[assetType] = {}
        assetNames.forEach(assetName => {
            let assetImage = new Image();
            assetImage.src = `./assets/${assetType}/${assetName}`;
            let assetNameBeforeExtension = assetName.split('.')[0]
            console.log(assetNameBeforeExtension);
            
            this[assetType][assetNameBeforeExtension] = assetImage;
        });
        console.log(this);
    }

    loadAudioAssets() {
        let audioAssetFileNames = ['enemy_death.wav', 'menu_hover.mp3'];
        audioAssetFileNames.forEach(fileName => {
            this.audioAssets = {};
            this.audioAssets[fileName.split('.')[0]] = new Audio(`./assets/sounds/${fileName}`)
        })
    }

    loadEnemyImagesData() {
        let testCanvas = document.createElement('canvas');
        let testContext = testCanvas.getContext('2d');
        Array.from(Object.keys(this.characters)).forEach(enemyAssetName => {
            let img = this.characters[enemyAssetName];
            img.onload = () => {
                testCanvas.width = img.width;
                testCanvas.height = img.height;
                testContext.drawImage(img, 0, 0, img.width, img.height);
                this.enemyImageDataObjects[enemyAssetName] = testContext.getImageData(0, 0, img.width, img.height)
            }
        })
    }
}