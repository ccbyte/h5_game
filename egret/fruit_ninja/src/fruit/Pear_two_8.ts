class PearTwoEight extends BaseFruit {
    constructor() {
        super();
        this.img.texture = RES.getRes('pear-two-8_png');
        this.img_part1.texture = RES.getRes('pear-1_png');
        this.img_part1.x = this.img_part1.x + 100;
        this.img_part2.texture = RES.getRes('pear-2_png');
        this.splash_part1.texture = RES.getRes('pear-splash-1_png');
        this.splash_part2.texture = RES.getRes('pear-splash-2_png');
        this.splash_part2.x = this.splash_part2.x + 100;
        this.splash_part2.y = this.splash_part2.y + 28;
        this.splash_part2.rotation = -90;
        this.splashColor = 0xfff2ce;
        this.initRotation = -145;
        this.rotationIndex = 1;
        this.setSize();
    }

}
