class Main extends BaseScene {
    constructor() {
        super("Main");
    }

    preload() {
        var area = '/assets/sprites/background-images/main_menu.png';
        super.preload('Main', area);
    }

    create() {
        var sceneBorders = {x: [150, 150], y: [250, 250]}; // Scene dimensions
        var areaChanges = {
            northChange : "",
            eastChange : "", 
            southChange : "", 
            westChange : ""
        }; // Defines part of scene where the user transitions to other scene
        var areaChangeTo = {
            northChange : "", 
            eastChange : "",
            southChange : "", 
            westChange : ""
        };

        var Enemy1 = {class: Goblin, name: "goblin", walkAreaX: [-100, -100], walkAreaY: [-100, -100], x: -100, y: -100};
        var Enemy2 = "None";
        var Enemy3 = "None";
        var Enemy4 = "None";

        super.create('Main', sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

        this.input.on('pointerdown', function(event) {
            // added exit button to prevent clicking glitch when pressing a number to exit
            this.mouseClickX = event.x;
            this.mouseClickY = event.y;
            if (this.mouseClickX >= 179 && this.mouseClickY <= 320 && this.mouseClickY >= 232 && this.mouseClickY <= 271) {
                this.scene.start(this.hero.currentArea, {hero : this.hero, areaChangeType : "East"});
                }
            },this);
        
        

        this.input.keyboard.on('keyup', function(e) {
            if (e.key == "1" && this.hero.coins > 15) {
                this.hero.items.healingPotion += 1;
                this.hero.coins -= 15;
            }
            else if (e.key == "2" && this.hero.coins > 800 && this.hero.items.helmet == 0) {
                this.hero.items.helmet = 1;
                this.hero.helmetSlot.push("helmet");
                this.hero.coins -= 800;
                this.hero.helmetSlotIndex = 1;
            }
            else if (e.key == "3" && this.hero.coins > 1100 && this.hero.items.sword == 0) {
                this.hero.items.sword = 1;
                this.hero.coins -= 1100;
                this.hero.weaponSlot.push("sword");
                this.hero.weaponSlotIndex = 1;
            }
            else if (e.key == "4" && this.hero.coins > 1200 && this.hero.items.shield == 0) {
                this.hero.items.shield = 1;
                this.hero.coins -= 1200;
                this.hero.shieldSlot.push("shield");
                this.hero.shieldSlotIndex = 1;
            }
            else if (e.key == "5" && this.hero.coins > 2500 && this.hero.items.chainmail == 0) {
                this.hero.items.chainmail = 1;
                this.hero.coins -= 2500;
                this.hero.bodySlot.push("chainmail");
                this.hero.bodySlotIndex = 1;
            }
            else if (e.key == "6" && this.hero.coins > 7500 && this.hero.items.zombieAxe == 0) {
                this.hero.items.zombieAxe = 1;
                this.hero.coins -= 7500;
                this.hero.weaponSlot.push("zombieAxe");
                this.hero.weaponSlotIndex = 2;
            }
            else if (e.key == "7" && this.hero.coins > 19500 && this.hero.items.dragonShield == 0) {
                this.hero.items.dragonShield = 1;
                this.hero.coins -= 19500;
                this.hero.shieldSlot.push("dragonShield");
                this.hero.shieldSlotIndex = 2;
            }

        },this);
        
    }   
    
}