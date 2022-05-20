class HomePage extends eui.Component implements eui.UIComponent {

	private static _instance;
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/eui/HomePage.exml";
		this.init()
	}

	// 页面元素
	public headerTitle: eui.Image;
	public headerTip: eui.Image;
	public ringNewGame: eui.Image;
	public contentNewGame: eui.Image;

	public img: egret.Bitmap;
	public bgSound: egret.Sound;
	public stopMusic: egret.SoundChannel;

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}

	/**
	 * 初始化
	 */
	private init() {
		this.appear();
		// this.addSound()
	}

	public appear() {
		// 动画时间
		const duration_headerTitle = 1000;
		const duration_headerTip = 200;
		const duration_content = 300;
		this.addWaterMelon();

		// 添加动画
		const tw_headerTitle = egret.Tween.get(this.headerTitle).to({ y: 150 }, duration_headerTitle, egret.Ease.circOut);
		egret.setTimeout(function () {
			const tw_headerTip = egret.Tween.get(this.headerTip).to({ x: 350, y: 480 }, duration_headerTip, egret.Ease.circIn);
		}, this, duration_headerTitle - duration_headerTip);

		// contentEffect
		egret.setTimeout(function () {
			const tw_img = egret.Tween.get(this.img).to({ scaleX: 0.8, scaleY: 0.8 }, duration_content, egret.Ease.circOut);
			const tw_ringNewGame = egret.Tween.get(this.ringNewGame).to({ scaleX: 2, scaleY: 2 }, duration_content, egret.Ease.circOut);
		}, this, duration_headerTitle)

		// Effect
		egret.setTimeout(function () {
			Effects.leftRightRotate(this.headerTip, 2300, 13, true, true);
			Effects.rotate(this.ringNewGame, 36000, 360, true, true);
			Effects.rotate(this.img, 15000, 360, true, false);
		}, this, duration_content + duration_headerTitle)
	}
	
	public disappear() {
		var dur = 500;
		egret.Tween.get(this.headerTitle).to({ y: -319.5 }, dur);
        egret.Tween.get(this.headerTip).to({ x: -161, y: 288 }, dur);
        egret.Tween.get(this.contentNewGame).to({ scaleX: 0, scaleY: 0 }, dur);
        egret.Tween.get(this.ringNewGame).to({ scaleX: 0, scaleY: 0 }, dur);
		egret.Tween.removeTweens(this.img)
		this.removeChild(this.img)
		this.img = null
	}

	/**
     * 设置水果的属性
     */
	public addWaterMelon() {
		this.img = ClassName.HOMEWATERMELON();
		this.img.anchorOffsetX = 0;
		this.img.anchorOffsetY = 0;
		this.img.x = this.contentNewGame.x;
		this.img.y = this.contentNewGame.y;
		this.img.scaleX = 0;
		this.img.scaleY = 0;
		this.addChild(this.img);
		this.img.once(egret.TouchEvent.TOUCH_TAP, function () {
			Observer.getInstance().fire(Commands.OPEN_NEWGAME);
		}, this)
	}

	/**
     * 添加音效
     */
	public addSound() {
		// this.bgSound = RES.getRes('bjyy_mp3');
        // this.stopMusic = this.bgSound.play(0, 0);
	}

	public stopPlay() {
		// this.stopMusic.stop()
	}

	/**
     * 单例模式取单例
     */
	public static getInstance(container?:any) {
		if (this._instance === undefined) {
			this._instance = new HomePage()
		}
		if(container){
            container.addChild(this._instance)
        }
		return this._instance;
	}

	/**
	 * 销毁实例
	 */
	public static destroyInstance() {
		if(this._instance.parent){
            this._instance.parent.removeChild(this._instance)
        }
		// this._instance = undefined;
	}

}