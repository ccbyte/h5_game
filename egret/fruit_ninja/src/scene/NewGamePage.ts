/**
 * 游戏界面
 */
class FruitNewGamePage extends eui.Component {
    private static _instance;
    constructor () {
        super();
        this.skinName = "resource/eui_skins/eui/NewGamePage.exml";
        this.init();
    }

    private gameContainer: GameContainer;

    // 页面元素
    public gameX;
    public gameXX;
    public gameXXX;
    public gameXF;
    public gameXXF;
    public gameXXXF;
    public gameover;

    public failedCount: number;

    private init() {
        this.addEffects();
        this.failedCount = 0;
        this.gameContainer = GameContainer.getInstance();
        this.gameContainer.width = this.width;
        this.gameContainer.height = this.height;
        this.addChild(this.gameContainer);
    }

    private addEffects() {
        const dur = 700;
        egret.Tween.get(this.gameX).to({x: 1509}, dur, egret.Ease.backOut);
        egret.Tween.get(this.gameXX).to({x: 1570}, dur, egret.Ease.backOut);
        egret.Tween.get(this.gameXXX).to({x: 1644}, dur, egret.Ease.backOut);
    }

    public reset() {
        this.failedCount = 0;
        this.gameX.x = 1921
        this.gameXX.x = 1943
        this.gameXXX.x = 1970
        this.gameXF.scaleX = 0
        this.gameXXF.scaleX = 0
        this.gameXXXF.scaleX = 0
        this.gameXF.scaleY = 0
        this.gameXXF.scaleY = 0
        this.gameXXXF.scaleY = 0
        this.gameover.scaleX = 0
        this.gameover.scaleY = 0
        this.gameover.alpha = 0
    }

    public static getInstance(container?:any) {
        if (this._instance === undefined) {
            this._instance = new FruitNewGamePage();
            // console.log('create new FruitNewGamePage')
        }
        if(container){
            container.addChild(this._instance)
        }
        return this._instance;
    }

    public static destroyInstance() {
        if(this._instance.parent){
            this._instance.parent.removeChild(this._instance)
            // console.log('remove FruitNewGamePage instance')
        }
        GameContainer.destroyInstance()
        this._instance = undefined;
    }
}