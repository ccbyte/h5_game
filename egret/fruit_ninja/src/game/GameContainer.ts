/**
 * 游戏容器
 */
class GameContainer extends egret.DisplayObjectContainer {
    private static _instance;
    private fruitArray;
    private fruitNum: number;
    private timer: egret.Timer;

    constructor() {
        super()
        this.init()
    }

    private init() {
        this.timer = new egret.Timer(2100, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.popupFruit, this);
        this.timer.start()
        egret.setTimeout(function () {
            this.parent.touchEnabled = true;
            this.parent.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.collideDetection, this);
            this.parent.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.moveEnd, this)
        }, this, 2800);
    }

    // 抛水果
    private popupFruit() {
        this.fruitNum = Math.ceil(Math.random() * 2);
        this.fruitArray = [];

        const fruitClassNames = [
            ClassName.APPLETWO,
            ClassName.APPLEFOUR, 
            ClassName.APPLEREST, 
            ClassName.APPLEEIGHT, 
            ClassName.APPLETWOEIGHT,
            ClassName.APPLEEIGHT, 
            ClassName.APPLETWOEIGHT,
            ClassName.APPLETWOEIGHT,
            ClassName.APPLEEIGHT, 
            // ClassName.BOOM,
            ClassName.HAMIMELONTWO,
            ClassName.HAMIMELONFOUR,
            ClassName.HAMIMELONREST,
            ClassName.HAMIMELONEIGHT,
            ClassName.HAMIMELONTWOEIGHT,
            ClassName.HAMIMELONEIGHT,
            ClassName.HAMIMELONTWOEIGHT,
            ClassName.HAMIMELONTWOEIGHT,
            ClassName.HAMIMELONEIGHT,
            // ClassName.BOOM,
            ClassName.LEMONTWO, 
            ClassName.LEMONFOUR, 
            ClassName.LEMONREST, 
            ClassName.LEMONEIGHT, 
            ClassName.LEMONTWOEIGHT,
            ClassName.LEMONEIGHT, 
            ClassName.LEMONTWOEIGHT,
            ClassName.LEMONEIGHT, 
            ClassName.LEMONTWOEIGHT,
            ClassName.LEMONEIGHT, 
            // ClassName.BOOM,
            ClassName.ORANGETWO, 
            ClassName.ORANGEFOUR, 
            ClassName.ORANGEREST, 
            ClassName.ORANGEEIGHT, 
            ClassName.ORANGETWOEIGHT,
            ClassName.ORANGEEIGHT, 
            ClassName.ORANGETWOEIGHT,
            ClassName.ORANGEEIGHT, 
            ClassName.ORANGETWOEIGHT,
            ClassName.APPLEEIGHT, 
            ClassName.APPLETWOEIGHT,
            ClassName.HAMIMELONEIGHT,
            ClassName.HAMIMELONTWOEIGHT,
            ClassName.LEMONEIGHT, 
            ClassName.LEMONTWOEIGHT,
            ClassName.PEAREIGHT, 
            ClassName.PEARTWOEIGHT,
            ClassName.WATERMELONEIGHT, 
            ClassName.WATERMELONTWOEIGHT,
            // ClassName.BOOM,
            ClassName.PEARTWO, 
            ClassName.PEARFOUR, 
            ClassName.PEARREST, 
            ClassName.PEAREIGHT, 
            ClassName.PEARTWOEIGHT,
            ClassName.PEAREIGHT, 
            ClassName.PEARTWOEIGHT,
            ClassName.PEAREIGHT, 
            ClassName.PEARTWOEIGHT,
            ClassName.WATERMELONTWO, 
            ClassName.WATERMELONFOUR, 
            ClassName.WATERMELONEIGHT, 
            ClassName.WATERMELONREST, 
            ClassName.WATERMELONEIGHT, 
            ClassName.WATERMELONTWOEIGHT,
            ClassName.WATERMELONTWOEIGHT,
            ClassName.WATERMELONEIGHT, 
            ClassName.WATERMELONEIGHT,
            // ClassName.BOOM,
            ClassName.APPLEEIGHT, 
            ClassName.APPLETWOEIGHT,
            ClassName.HAMIMELONEIGHT,
            ClassName.HAMIMELONTWOEIGHT,
            ClassName.LEMONEIGHT, 
            ClassName.LEMONTWOEIGHT,
            ClassName.PEAREIGHT, 
            ClassName.PEARTWOEIGHT,
            ClassName.WATERMELONEIGHT, 
            ClassName.WATERMELONTWOEIGHT
            ];

        for (let i = 0; i < this.fruitNum; i++) {
            let fruitIns = fruitClassNames[Math.floor(Math.random() * fruitClassNames.length)]();
            this.fruitArray.push(fruitIns);
            this.addChild(fruitIns);
        }
    }

    private prePointX: number = -1;
    private prePointY: number = -1;

    private moveEnd () {
        this.prePointX = -1;
        this.prePointY = -1;
    }

    /**
     * 碰撞检测
     */
    public collideDetection(evt: egret.TouchEvent) {
        for (let i = 0; i < this.fruitNum; i++) {
            if (!this.fruitArray[i].cutIndex) {
                let isCollid = this.fruitArray[i].hitTestPoint(evt.stageX, evt.stageY);
                if (isCollid) {
                    this.fruitArray[i].cutFruit();
                    this.setSplitRotation(evt.stageX, evt.stageY, this.fruitArray[i]);
                }
            }
        }
        this.prePointX = evt.stageX;
        this.prePointY = evt.stageY;
    }

    /**
     * 设置水果切开时闪光的方向
     */
    private setSplitRotation(curX, curY, fruit) {
        if (!fruit.splitBitmap) {
            return;
        }
        if (this.prePointX == -1) {
            fruit.splitBitmap.rotation = 0;
        } else if (this.prePointX == curX) {
            fruit.splitBitmap.rotation = 90;
        } else {
            fruit.splitBitmap.rotation = Math.atan((curY - this.prePointY) / (curX - this.prePointX)) * 57.3;
        }
        fruit.img_part1.rotation = fruit.img_part2.rotation = fruit.initRotation + fruit.splitBitmap.rotation;
        if (fruit.splitBitmap.rotation < 0) {
            fruit.img_part1.rotation = fruit.img_part2.rotation += 180;
        }
        fruit.img_part1.rotation = fruit.img_part2.rotation += 180 * fruit.rotationIndex;
    }

    public static getInstance(container?:any) {
        if (this._instance === undefined) {
            this._instance = new GameContainer()
        }
        if(container){
            container.addChild(this._instance)
        }
        return this._instance;
    }

    public static destroyInstance() {
        if(!this._instance) return
        if(this._instance.parent){
            this._instance.parent.removeChild(this._instance)
        }
        this._instance.timer.stop();
        this._instance.fruitArray.forEach(a=>{
            a.clear()
        })
        this._instance = undefined;
    }
}