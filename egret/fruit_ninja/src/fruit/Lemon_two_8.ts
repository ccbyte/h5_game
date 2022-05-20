class LemonTwoEight extends BaseFruit {
    constructor() {
        super();
        this.img.texture = RES.getRes('lemon-two-8_png');
        this.img_part1.texture = RES.getRes('lemon-1_png');
        this.img_part1.x = this.img_part1.x + 90;
        this.img_part2.texture = RES.getRes('lemon-2_png');
        this.splash_part1.texture = RES.getRes('lemon-splash-1_png');
        this.splash_part1.x = this.splash_part1.x + 25;
        this.splash_part2.texture = RES.getRes('lemon-splash-2_png');
        this.splash_part2.x = this.splash_part2.x + 45;
        this.splash_part2.y = this.splash_part2.y + 45;
        this.splashColor = 0xf9fa62;
        this.initRotation = -155;
        this.rotationIndex = 1;
        this.setSize();
    }

}
