export default class AssetLoader {
    constructor() {
        this.bulletAssets = {};
        this.enemyAssets = {}
        this.playerAsset;

        this.loadBulletAssets();
        this.loadEnemyAssets()
    }

    loadBulletAssets() {
        let bulletAssetNames = ['bullet.png'];
        this.loadImages(bulletAssetNames, this.bulletAssets);
    }

    loadEnemyAssets() {
        let enemyAssetNames = ['enemy1.png'];
        this.loadImages(enemyAssetNames, this.enemyAssets);   
    }

    loadImages(assetNames, assetType) {
        assetNames.forEach(assetName => {
            console.log(assetName);
            let assetImage = new Image();
            assetImage.src = `./assets/${assetName}`;
            assetType[assetName.split('.')[0]] = assetImage;
        });
        console.log(this.bulletAssets, this.enemyAssets);
    }

    loadPlayer() {

    }
}