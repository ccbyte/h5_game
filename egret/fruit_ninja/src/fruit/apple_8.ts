class AppleEight extends BaseFruit {
    constructor () {
        super();
        this.img.texture = RES.getRes('apple-8_png');
        this.img_part1.texture = RES.getRes('apple-1_png');
        this.img_part2.texture = RES.getRes('apple-2_png');
        this.splash_part1.texture = RES.getRes('apple-splash-1_png');
        this.splash_part1.x = this.splash_part1.x - 45;
        this.splash_part1.y = this.splash_part1.y - 45;
        this.splashColor = 0xffcf73;
        this.initRotation = -180;
        this.rotationIndex = 1;
        this.setSize();
    }

}
