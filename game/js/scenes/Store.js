class Store extends BaseScene {
    constructor() {
        super("Store");
    }

    preload() {
        var area = '/assets/sprites/background-images/Store.png';
        super.preload('Store', area);
    }

    create() {
        var sceneBorders = {x: [430, 430], y: [250, 250]}; // Scene dimensions
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

        super.create('Store', sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

        this.storeIntroText = this.add.text(50, 50, "Welcome to the Store", {font:"30px Ariel", color:"grey"});
        this.storeIntroText2 = this.add.text(50, 80, "Select number to buy item", {font:"25px Ariel", color:"grey"});
        this.storeIntroHeadingText = this.add.text(20, 120, "#", {font:"20px Ariel", color:"white"});
        this.storeIntroHeadingText = this.add.text(40, 120, "Item", {font:"20px Ariel", color:"white"});
        this.storeIntroHeadingText = this.add.text(160, 120, "Price", {font:"20px Ariel", color:"white"});
        this.storeIntroHeadingText = this.add.text(240, 120, "Description", {font:"20px Ariel", color:"white"});

        this.storeLine1Text = this.add.text(20, 145, "1. Healing Potion", {font:"18px Ariel", color:this.neon});
        this.storeLine1Price = this.add.text(170, 145, "15", {font:"18px Ariel", color:"Yellow"});
        this.storeLine1Desc = this.add.text(240, 145, "+ 10 hp", {font:"18px Ariel", color:this.neon});

        this.storeLine2Text = this.add.text(20, 170, "2. Helmet", {font:"18px Ariel", color:this.neon});
        this.storeLine2Price = this.add.text(170, 170, "800", {font:"18px Ariel", color:"Yellow"});
        this.storeLine2Desc = this.add.text(240, 170, "+ 3 Defense", {font:"18px Ariel", color:this.neon});

        this.storeLine3Text = this.add.text(20, 195, "3. Sword", {font:"18px Ariel", color:this.neon});
        this.storeLine3Price = this.add.text(170, 195, "1,100", {font:"18px Ariel", color:"Yellow"});
        this.storeLine3Desc = this.add.text(240, 195, "+ 5 Power", {font:"18px Ariel", color:this.neon});

        this.storeLine4Text = this.add.text(20, 220, "4. Shield", {font:"18px Ariel", color:this.neon});
        this.storeLine4Price = this.add.text(170, 220, "1,200", {font:"18px Ariel", color:"Yellow"});
        this.storeLine4Desc = this.add.text(240, 220, "+ 5 Defense", {font:"18px Ariel", color:this.neon});

        this.storeLine5Text = this.add.text(20, 245, "5. Chainmail", {font:"18px Ariel", color:this.neon});
        this.storeLine5Price = this.add.text(170, 245, "2,500", {font:"18px Ariel", color:"Yellow"});
        this.storeLine5Desc = this.add.text(240, 245, "+ 7 Defense", {font:"18px Ariel", color:this.neon});

        this.storeLine6Text = this.add.text(20, 270, "6. Zombie Axe", {font:"18px Ariel", color:this.neon});
        this.storeLine6Price = this.add.text(170, 270, "7,500", {font:"18px Ariel", color:"Yellow"});
        this.storeLine6Desc = this.add.text(240, 270, "+ 1 Power", {font:"18px Ariel", color:this.neon});

        this.storeLine7Text = this.add.text(20, 295, "7. Dragon Shield", {font:"18px Ariel", color:this.neon});
        this.storeLine5Price = this.add.text(170, 295, "19,500", {font:"18px Ariel", color:"Yellow"});
        this.storeLine5Desc = this.add.text(240, 295, "+ 2 Defense", {font:"18px Ariel", color:this.neon});

        this.storeExitText = this.add.text(380, 400, "Exit", {font:"28px Ariel", color:"red"});

        this.input.on('pointerdown', function(event) {
            // added exit button to prevent clicking glitch when pressing a number to exit
            this.mouseClickX = event.x;
            this.mouseClickY = event.y;
            if (this.mouseClickX >= 380 && this.mouseClickY <= 430 && this.mouseClickY >= 405 && this.mouseClickY <= 430) {
                this.scene.start("Area98_100", {hero : this.hero, areaChangeType : "East"});
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