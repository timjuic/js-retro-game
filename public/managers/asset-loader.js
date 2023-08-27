import EventEmmiter from "../helpers/event-emmiter.js";

export default class AssetLoader {
    constructor() {
        this.enemyImageDataObjects = {};
        this.eventEmitter = new EventEmmiter;
        this.loadAssets();
    }

    loadAssets() {
        this.loadBulletAssets();
        this.loadEnemyAssets();
        this.loadOtherAssets();
        this.loadEnemyImagesData();
    }

    loadBulletAssets() {
        let bulletAssetNames = ['bullet1.png', 'enemybullet.png', 'bullet2.png', 'bullet3.png'];
        this.loadImages('bullets', bulletAssetNames);
    }

    loadEnemyAssets() {
        let enemyAssetNames = ['basic.png', 'buff.png', 'tank.png', 'pufpuf.png', 'kamikaze.png', 'shielded.png', 'spawner.png', 'speedy.png', 'teleporter.png', 'growing.png', 'reflector.png', 'splitting.png', 'wanderer.png', 'ghost.png', 'player.png'];
        this.loadImages('characters', enemyAssetNames);
    }

    loadOtherAssets() {
        let otherAssets = ['crosshair3.png'];
        this.loadImages('other', otherAssets);
    }

    loadImages(assetType, assetNames) {
        this[assetType] = {};
        let loadedCount = 0;
        
        assetNames.forEach(assetName => {
            let assetImage = new Image();
            assetImage.src = `./assets/${assetType}/${assetName}`;
            let assetNameBeforeExtension = assetName.split('.')[0]
            
            assetImage.onload = () => {
                loadedCount++;
                this[assetType][assetNameBeforeExtension] = assetImage;
                
                if (loadedCount === assetNames.length && assetType === 'characters') {
                    this.eventEmitter.emit('assetsLoaded');
                }
            };
        });
    }

    loadEnemyImagesData() {
        this.eventEmitter.on('assetsLoaded', () => {
            let testCanvas = document.createElement('canvas');
            let testContext = testCanvas.getContext('2d');
            Array.from(Object.keys(this.characters)).forEach(enemyAssetName => {
                let img = this.characters[enemyAssetName];
                testCanvas.width = img.width;
                testCanvas.height = img.height;
                testContext.drawImage(img, 0, 0, img.width, img.height);
                this.enemyImageDataObjects[enemyAssetName] = testContext.getImageData(0, 0, img.width, img.height)
                console.log(this.enemyImageDataObjects);
            })
        })
    }
}
