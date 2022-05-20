/**
 * 切水果时水汁四溅效果
 */
class SplashEffect extends egret.DisplayObjectContainer {

    // 水花颜色
    private splashColor;
    public constructor(splashColor) {
        super();
        this.splashColor = splashColor;
        this.start();
    }

    /**
     * 添加水花粒子
     */
    private start() {
        for (let i = 0; i < 20; i++) {
            let radius = Math.random() * 10 + 8;
            let speed = Math.random() * 300 + 200;
            let dir = Math.random() * 360;
            let splashUnit = new Splash(radius, speed, dir, this.splashColor);
            this.addChild(splashUnit);
        }
    }
}

/**
 * 水花粒子
 */
class Splash extends egret.Shape {

    private radius: number;    //溅射半径
    private speed: number;     //初始速度
    private direction: number; //初始方向
    private splashColor;       //颜色
    private beginTime;         //水花动画开始的时间
    private initX;             //初始x位置
    private initY;             //初始y位置

    public constructor (radius, speed, direction, splashColor) {
        super()
        this.radius = radius;
        this.speed = speed;
        this.direction = direction;
        this.splashColor = splashColor;
        this.initX = this.x;
        this.initY = this.y;
        this.beginTime = egret.getTimer()

        this.init();

        /* 改变水花大小 */
        let tw_splash = egret.Tween.get(this).to({scaleX: 0.5, scaleY: 0.5}, 390).call(function () {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.updateLocation, this);
        })
        this.addEventListener(egret.Event.ENTER_FRAME, this.updateLocation, this);
    }

    /**
     * 画小圆点模拟水花
     */
    private init() {
        this.graphics.beginFill(this.splashColor, 1);
        this.graphics.drawCircle(0, 0, this.radius);
        this.graphics.endFill();
    }

    /**
     * 实时计算位置 公式为sinA=a/c，cosA=b/c
     */
    private updateLocation() {
       this.x = this.initX + this.speed * (egret.getTimer() - this.beginTime) / 1000 * Math.cos(this.direction / 57.3);
       this.y = this.initY + this.speed * (egret.getTimer() - this.beginTime) / 1000 * Math.sin(this.direction / 57.3);
    }
}