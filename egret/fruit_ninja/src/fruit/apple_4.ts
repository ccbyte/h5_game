class AppleFour extends BaseFruit {
    constructor() {
        super();
        this.img.texture = RES.getRes('apple-4_png');
        this.img_part1.texture = RES.getRes('apple-1_png');
        this.img_part2.texture = RES.getRes('apple-2_png');
        this.splash_part1.texture = RES.getRes('apple-splash-1_png');
        this.splash_part1.x = this.splash_part1.x - 45;
        this.splash_part1.y = this.splash_part1.y - 45;
        this.initRotation = 45;
        this.rotationIndex = 0;
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
