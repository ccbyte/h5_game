class WatermelonTwoEight extends BaseFruit {
    constructor() {
        super();
        this.img.texture = RES.getRes('watermelon-two-8_png');
        this.img_part1.texture = RES.getRes('watermelon-1_png');
        this.img_part1.x = this.img_part1.x + 100;
        this.img_part2.texture = RES.getRes('watermelon-2_png');
        this.splash_part1.texture = RES.getRes('watermelon-splash-1_png');
        this.splash_part1.x = this.splash_part1.x + 25;
        this.splash_part1.y = this.splash_part1.y - 60;
        this.splash_part2.texture = RES.getRes('watermelon-splash-2_png');
        this.splash_part2.x = this.splash_part2.x - 70;
        this.splash_part2.rotation = -180;
        this.splashColor = 0xbc1c1c;
        this.initRotation = -45;
        this.rotationIndex = 1;
        this.setSize();
    }

}
