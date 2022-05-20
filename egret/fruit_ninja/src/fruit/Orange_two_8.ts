class OrangeTwoEight extends BaseFruit {
    constructor() {
        super();
        this.img.texture = RES.getRes('orange-two-8_png');
        this.img_part1.texture = RES.getRes('orange-1_png');
        this.img_part1.x = this.img_part1.x + 90;
        this.img_part2.texture = RES.getRes('orange-2_png');
        this.splash_part1.texture = RES.getRes('orange-splash-1_png');
        this.splash_part1.x = this.splash_part1.x + 25;
        this.splash_part2.texture = RES.getRes('orange-splash-2_png');
        this.splash_part2.x = this.splash_part2.x + 45;
        this.splash_part2.y = this.splash_part2.y + 45;
        this.splash_part2.rotation = -90;
        this.splashColor = 0xff8d02;
        this.initRotation = -125;
        this.rotationIndex = -1;
        this.setSize();
    }

}
