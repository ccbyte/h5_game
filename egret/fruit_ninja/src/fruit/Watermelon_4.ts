class WatermelonFour extends BaseFruit {
    constructor() {
        super();
        this.img.texture = RES.getRes('watermelon-4_png');
        this.initRotation = 60;
        this.rotationIndex = 1;
        this.errorFruit = true;
        this.setSize();
    }

    private boomEffect;
    /**
     * 重写切开后的动作
     */
    public cutFruit() {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.cutFruit, this);

        this.cutIndex = true;
        this.boomEffect = BoomEffect.getInstance();
        this.boomEffect.anchorOffsetX = this.boomEffect.width / 2;
        this.boomEffect.anchorOffsetY = this.boomEffect.height / 2;
        this.addChild(this.boomEffect);
        this.removeChild(this.img);
        this.boomEffect.playAnimation();
        Observer.getInstance().fire(Commands.ADD_FAILED);
    }

}
