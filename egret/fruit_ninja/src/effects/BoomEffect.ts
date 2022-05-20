class BoomEffect extends eui.Component {
    private static _instance;
    constructor() {
        super();
        this.skinName = "resource/eui_skins/eui/BoomAnimation.exml";
    }
    private boomEffect: egret.tween.TweenGroup;

    public playAnimation() {
        this.playBoom()
        this.addBoomSound();
    }

    /**
     * 添加音效
     */
    private addBoomSound() {
        const soundBoom: egret.Sound = RES.getRes("boom_mp3");
        const channelCut = soundBoom.play(0, 1);
    }

    private playBoom() {
        this.boomEffect.play(0);
    }

	/**
     * 单例模式取单例
     */
    public static getInstance() {
        if (this._instance === undefined) {
            this._instance = new BoomEffect()
        }
        return this._instance;
    }

	/**
	 * 销毁实例
	 */
    public static destroyInstance() {
        this._instance = undefined;
    }

}