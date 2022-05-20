/**
 * 场景控制
 */
class SceneManager {
    private fruitNewGamePage;
    private status = 1;         // 1: homePage; 2:gamePage

    constructor() {
        this.registObserver();
    }

    /**
     * 注册命令
     */
    private registObserver() {
        Observer.getInstance().regist(Commands.OPEN_NEWGAME, this.openNewGame, this);
        Observer.getInstance().regist(Commands.CLOSE_NEWGAME, this.closeNewGame, this);
        Observer.getInstance().regist(Commands.ADD_FAILED, this.addFailed, this)
        Observer.getInstance().regist(Commands.GAME_OVER, this.gameOver, this)
    }

    /**
     * 失败
     */
    private addFailed() {
        if(this.status==1) return
        const fruitNewGamePage = FruitNewGamePage.getInstance()
        fruitNewGamePage.failedCount += 1;
        if (fruitNewGamePage.failedCount === 1) {
            egret.Tween.get(fruitNewGamePage.gameXF).to({ scaleX: 2, scaleY: 2 }, 200, egret.Ease.backOut);
        } else if (fruitNewGamePage.failedCount === 2) {
            egret.Tween.get(fruitNewGamePage.gameXXF).to({ scaleX: 2, scaleY: 2 }, 200, egret.Ease.backOut)
        } else if (fruitNewGamePage.failedCount >= 3) {
            egret.Tween.get(fruitNewGamePage.gameXXXF).to({ scaleX: 2, scaleY: 2 }, 200, egret.Ease.backOut);
            this.gameOver()
        }
    }

    /**
     * 游戏结束
     */
    private gameOver() {
        const fruitNewGamePage = FruitNewGamePage.getInstance()
        const gameContainer = GameContainer.getInstance();
        gameContainer.timer.stop();
        const tw_gameOver = egret.Tween.get(fruitNewGamePage.gameover).to({scaleX: 2, scaleY: 2, alpha: 1}, 500, egret.Ease.backOut)
    }

    private quitGamePage() {
        // this.fruitNewGamePage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.quitGamePage, this);
        Observer.getInstance().fire(Commands.CLOSE_NEWGAME)
    }

    private openNewGame() {
        const homePage = HomePage.getInstance();
        const parentNote = homePage.parent;
        const fruitNewGamePage = FruitNewGamePage.getInstance()
        // this.disappearHomePage(homePage, dur);
        homePage.disappear()
        fruitNewGamePage.gameover.once(egret.TouchEvent.TOUCH_TAP, this.quitGamePage, this);
        egret.setTimeout(function () {
            if(!parentNote){
                console.log('openNewGame no parentNote')
                return;
            }
            // parentNote.removeChild(homePage);
            HomePage.destroyInstance()
            parentNote.addChild(fruitNewGamePage);
            this.status = 2
        }, this, 200);
    }

    private disappearHomePage(fruithomePage, dur) {
        var tw_headerTitle = egret.Tween.get(fruithomePage.headerTitle).to({ y: -319.5 }, dur);
        var tw_headerTip = egret.Tween.get(fruithomePage.headerTip).to({ x: -161, y: 288 }, dur);

        var tw_contentNewGame = egret.Tween.get(fruithomePage.contentNewGame).to({ scaleX: 0, scaleY: 0 }, dur);
        var tw_ringNewGame = egret.Tween.get(fruithomePage.ringNewGame).to({ scaleX: 0, scaleY: 0 }, dur);
    }

    public closeNewGame() {
        if(this.status==1) return
        egret.setTimeout(function () {
            const homePage = HomePage.getInstance();
            const fruitNewGamePage = FruitNewGamePage.getInstance()
            const parentNote = fruitNewGamePage.parent;
            if(!parentNote){
                console.log('closeNewGame no parentNote')
                return;
            }
            // parentNote.removeChild(fruitNewGamePage);
            homePage.appear()
            // homePage.stopPlay();
            FruitNewGamePage.destroyInstance();
            GameContainer.destroyInstance();
            parentNote.addChild(homePage);
            this.status = 1
        }, this, 400);
    }
}