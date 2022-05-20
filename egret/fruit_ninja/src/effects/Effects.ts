/**
 * 动画特效
 */
module Effects {
    /**
     * 上下浮动
     * @obj显示对象
     * @dur一次动画时间
     * @loop是否循环
     */
    export function floatUpdown(obj: egret.DisplayObject, dur, loop) {
        var onComplete_floatUpdown: Function = function () {
            var objY = obj.y;
            egret.Tween.get(obj).to({ y: objY + 10 }, dur / 2, egret.Ease.circIn).to({ y: objY }, dur / 2, egret.Ease.circOut).call(onComplete_floatUpdown, this);
        }
        var objY = obj.y;
        if (loop) {
            egret.Tween.get(obj).to({ y: objY + 10 }, dur / 2, egret.Ease.circIn).to({ y: objY }, dur / 2, egret.Ease.circOut).call(onComplete_floatUpdown, this);
        } else {
            egret.Tween.get(obj).to({ y: objY + 10 }, dur / 2, egret.Ease.circIn).to({ y: objY }, dur / 2, egret.Ease.circOut);
        }
    }

    /**
     * 旋转
     * @obj显示对象
     * @dur一次动画时间
     * @deg旋转角度
     * @loop是否循环
     * @direction方向true顺flase逆
     */
    export function rotate(obj: egret.DisplayObject, dur, deg, loop, direction) {
        var dir = direction ? 1 : -1;
        var onComplete_rotate: Function = function () {
            obj.rotation = 0;
            egret.Tween.get(obj).to({ rotation: deg * dir }, dur).call(onComplete_rotate, this);
        }
        if (loop) {
            obj.rotation = 0;
            egret.Tween.get(obj).to({ rotation: deg * dir }, dur).call(onComplete_rotate, this);
        } else {
            obj.rotation = 0;
            egret.Tween.get(obj).to({ rotation: deg * dir }, dur);
        }
    }

    /**
     * 左右晃
     * @obj显示对象
     * @dur一次动画时间
     * @deg旋转角度
     * @loop是否循环
     * @direction方向true顺flase逆
     */
    export function leftRightRotate(obj: egret.DisplayObject, dur, deg, loop, direction) {
        var dir = direction ? 1 : -1;
        var onComplete_rotate: Function = function () {
            obj.rotation = 0;
            egret.Tween.get(obj).to({ rotation: deg * dir }, dur).to({ rotation: -deg * dir / 2 }, dur).to({ rotation: 0 }, dur).call(onComplete_rotate, this);
        }
        if (loop) {
            obj.rotation = 0;
            egret.Tween.get(obj).to({ rotation: deg * dir }, dur).to({ rotation: -deg * dir / 2 }, dur).to({ rotation: 0 }, dur).call(onComplete_rotate, this);
        } else {
            obj.rotation = 0;
            egret.Tween.get(obj).to({ rotation: deg * dir }, dur);
        }
    }

    /**
     * TODO: 3D效果插件
     * 上下翻滚
     * @obj显示对象
     * @dur一次动画时间
     * @deg旋转角度
     * @loop是否循环
     * @direction方向true顺flase逆
     */
    export function UpDownrotate(obj: egret.DisplayObject, dur, deg, loop, direction) {
        var dir = direction ? 1 : -1;
        var onComplete_rotate: Function = function () {
            obj.rotation = 0;
            egret.Tween.get(obj).to({ rotationY: deg * dir }, dur).call(onComplete_rotate, this);
        }
        if (loop) {
            obj.rotation = 0;
            egret.Tween.get(obj).to({ rotationY: deg }, dur).call(onComplete_rotate, this);
        } else {
            obj.rotation = 0;
            egret.Tween.get(obj).to({ rotationY: deg * dir }, dur);
        }
    }
}