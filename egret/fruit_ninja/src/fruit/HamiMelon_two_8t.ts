class HamiMelonTwoEight extends BaseFruit {
    constructor() {
        super();
        this.img.texture = RES.getRes('hami-melon-two-8_png');
        this.img_part1.texture = RES.getRes('hami-melon-1_png');
        this.img_part1.y = this.img_part1.y - 70;
        this.img_part2.texture = RES.getRes('hami-melon-2_png');
        this.img_part2.y =  this.img_part2.y + 70;
        this.splash_part1.texture = RES.getRes('hami-melon-splash-1_png');
        this.splash_part1.x = this.splash_part1.x - 45;
        this.splash_part1.y = this.splash_part1.y - 45;
        this.splash_part2.texture = RES.getRes('hami-melon-splash-2_png');
        this.splash_part2.x = this.splash_part2.x - 45;
        this.splash_part2.y = this.splash_part2.y + 45;
        this.splash_part2.rotation = 30;
        this.splashColor = 0xff8637;
        this.initRotation = 80;
        this.rotationIndex = Math.ceil(Math.random() - 0.45);
        this.setSize();
    }

}
