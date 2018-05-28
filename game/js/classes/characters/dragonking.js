class DragonKing extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key, config.walkAreaX, config.walkAreaY);
        this.scene = config.scene;
        this.scene.add.existing(this);

        this.name = "Dragon King";
        this.power = 70;
        this.defense = 70;
        this.health = 70;
        this.maxhealth = 70;
        this.status = "Alive";
        this.width = 140;
        this.height = 103;
        this.respawnTime = 3000;
        this.respawnTimer = 3000;
        this.bounty = [2000, 4000, 6000, 8000];
        this.attackRange = 260;
        this.battleMode = false;
        this.speed = .3;
        this.x_y_whenClicked = ["", ""];
        this.damage = "";
        this.walkAreaX = config.walkAreaX;
        this.walkAreaY = config.walkAreaY;
        this.attackTime = 90;
        this.defenseBenefit = Math.round(this.defense * .2);
        this.defenseTimes = Math.round(this.defense / 4);
        this.specialAttackPerc = .33;
    }    
}