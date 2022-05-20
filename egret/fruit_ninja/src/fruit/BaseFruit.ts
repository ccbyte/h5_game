/**
 * 水果基类
 */
class BaseFruit extends egret.DisplayObjectContainer {
    constructor() {
        super()
        this.init()
    }

    public img: egret.Bitmap;
    public img_part1: egret.Bitmap;
    public img_part2: egret.Bitmap;
    public splash_part1: egret.Bitmap;
    public splash_part2: egret.Bitmap;


    // 初始速度、加速度
    public accelerateX: number;
    public accelerateY: number;
    public accelerateRotate: number;
    public speedX: number;
    public speedY: number;
    public speedRotate: number;

    public initRotation: number;
    public rotationIndex: number;
    public randomX: number;

    // 初始时间
    public beginTime;
    public beginTimeSplash;
    public splashEffect;

    // 初始位置
    public initX: number;
    public initY: number;

    // 果汁颜色
    public splashColor;

    // 是否切开标志
    public cutIndex: boolean;
    public errorFruit: boolean;

    /**
     * 初始化水果的基本属性，添加时间和动画
     */
    private init() {
        this.accelerateX = 0;
        this.accelerateRotate = 0;
        this.accelerateY = 400;
        this.speedX = (Math.random() - 0.5) * 717;
        this.speedY = -700;
        this.speedRotate = (Math.random() - 0.5) * 360;

        this.randomX = Math.random() * 700 ;
        this.x = this.initX = this.speedX>0?960-this.randomX:960+this.randomX;  // this.randomX + (Math.random() - 0.5) * Math.floor(Math.random() * 100) + 150 * Math.random();
        this.y = this.initY = 1000;
        this.img = new egret.Bitmap();
        this.splash_part1 = new egret.Bitmap();
        this.img_part1 = new egret.Bitmap();
        this.img_part2 = new egret.Bitmap();
        this.splash_part2 = new egret.Bitmap();
        this.addChild(this.img);

        this.beginTime = egret.getTimer();
        this.touchEnabled = true;
        this.cutIndex = false;
        // console.log(this.x, this.speedX)
        this.addEventListener(egret.Event.ENTER_FRAME, this.freeFalling, this);
        this.once(egret.TouchEvent.TOUCH_TAP, this.cutFruit, this);
    }

    /**
     * 自由落体计算
     * @param evt
     */
    public freeFalling(evt: egret.Event) {
        let now = (egret.getTimer() - this.beginTime) / 1000;

        // x轴移动距离
        this.x = this.initX + this.speedX * now;

        // 已知加速度和实践，求自由落体移动距离 y = v0 * t + 1/2 * a * t^2
        this.y = this.speedY * now + 0.5 * this.accelerateY * now * now + this.initY;
        this.img.rotation = this.initRotation * now;

        // 当正确的水果落到this.y = 1000时，则认为水果一直没被切
        if (this.y>1500 && !this.cutIndex && !this.errorFruit) {
            this.cutIndex = true;
            this.addFailed()
        }
        if(now>10){
            this.clear()
        }
    }

    public clear() {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.freeFalling, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.cutFreeFalling, this);
        // console.log('base fruit clear')
    }

    /**
     * 设置水果的属性
     */
    public setSize() {
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.img.anchorOffsetX = this.img.width / 2;
        this.img.anchorOffsetY = this.img.height / 2;
        this.img_part1.anchorOffsetX = this.img.width / 2;
        this.img_part1.anchorOffsetY = this.img.height / 2;
        this.img_part2.anchorOffsetX = this.img.width / 2;
        this.img_part2.anchorOffsetY = this.img.height / 2;
        this.splash_part1.anchorOffsetX = this.img.width / 2;
        this.splash_part1.anchorOffsetY = this.img.height / 2;
        this.splash_part2.anchorOffsetX = this.img.width / 2;
        this.splash_part2.anchorOffsetY = this.img.height / 2;
    }

    /**
     * 切开水果后的动作
     */
    public cutFruit() {
        this.cutIndex = true;
        /* 切开水果的刀光动画 */
        this.splitEffect();
        /* 添加音效 */
        this.addCutSound();
        /* 水果一分为二 */
        this.cutEffect();
        /* 果汁溅射动画 */
        this.splashEffectFun();
        this.splashFalling()
    }

    /**
     * 切开水果刀光剑影
     */
    public splitBitmap: egret.Bitmap;
    public splitEffect() {
        this.splitBitmap = new egret.Bitmap();
        this.splitBitmap.texture = RES.getRes('flash_png');
        this.splitBitmap.anchorOffsetX = this.splitBitmap.width / 2;
        this.splitBitmap.anchorOffsetY = this.splitBitmap.height / 2;
        this.splitBitmap.x = this.img.x;
        this.splitBitmap.y = this.img.y;
        this.splitBitmap.scaleX = 0.8;
        this.splitBitmap.scaleY = 0.8;
        this.addChild(this.splitBitmap);
        egret.Tween.get(this.splitBitmap).to({ alpha: 1 }, 120).to({ alpha: 1 }, 120).call(function () {
            if( this.splitBitmap && this.splitBitmap.parent ){
                this.splitBitmap.parent.removeChild( this.splitBitmap );
            }
            // this.removeChild(this.splitBitmap);
            this.splitBitmap = null;
        }, this)
    }

    /**
     * 添加音效
     */
    public addCutSound() {
        const soundCut: egret.Sound = RES.getRes('splatter_mp3');
        const channelCut = soundCut.play(0, 1);
    }

    /**
     * 水果一分为二
     */
    private cutEffect() {
        if( this.img.parent ){
            this.img.parent.removeChild( this.img );
        }
        // this.removeChild(this.img);
        this.addChild(this.splash_part1);
        this.addChild(this.img_part1);
        this.addChild(this.img_part2);
        this.addChild(this.splash_part2);
        this.addEventListener(egret.Event.ENTER_FRAME, this.cutFreeFalling, this);
    }

    /**
     * 果汁四溅
     */
    private splashEffectFun() {
        if (this.splashColor) {
            this.splashEffect = new SplashEffect(this.splashColor);
            this.addChild(this.splashEffect);
            egret.setTimeout(function () {
                if( this.img.parent ){
                    this.removeChild(this.splashEffect)
                }
            }, this, 400)
        }
    }

    /**
     * 切开水果的位置
     */
    private cutFreeFalling() {
        this.img_part1.x -= 2;
        this.img_part2.x += 2;
        this.img_part1.rotation -= 2;
        this.img_part2.rotation += 2;
    }

    /**
     * 切开水果后汁水的位置
     */
    private splashFalling() {
        egret.setTimeout(function () {
            egret.Tween.get(this.splash_part1).to({ alpha: 0 }, 400).call(function () {
                if( this.parent && this.parent.splash_part1 ){
                    this.removeChild(this.splash_part1);
                }
            }, this)
            egret.Tween.get(this.splash_part2).to({ alpha: 0 }, 400).call(function () {
                if( this.parent && this.parent.splash_part2 ){
                    this.removeChild(this.splash_part2);
                }
            }, this)
        }, this, 500)
    }

    /**
     * 没有切到正确的水果
     */
    private addFailed() {
        // const seft = this;
        // const loseLogo: egret.Bitmap = new egret.Bitmap();
        // loseLogo.texture = RES.getRes('lose_png')
        // loseLogo.anchorOffsetX = loseLogo.width / 2;
        // loseLogo.anchorOffsetY = loseLogo.height / 2;
        // loseLogo.scaleX = 0;
        // loseLogo.scaleY = 0;
        // loseLogo.x = this.x - this.width / 2;
        // loseLogo.y = 800;
        // this.parent.addChild(loseLogo);
        // const tw_loseLogo = egret.Tween.get(loseLogo).to({scaleX: 2, scaleY: 2}, 600).wait(600).call(function () {
        //     seft.parent.removeChild(loseLogo);
        // });
        Observer.getInstance().fire(Commands.ADD_FAILED);
    }

}