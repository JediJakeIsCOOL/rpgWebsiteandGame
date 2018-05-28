var socket; // define a global variable called socket 
socket = io.connect(); // send a connection request to the server

var backgroundImage = ('/assets/sprites/background-images/dark_background.png');
var userInterface = ('/assets/sprites/background-images/user_interface.png');

 // Characters
var heroImage = ('/assets/sprites/characters/hero.png');
var goblin = ('/assets/sprites/characters/goblin.png');
var deathKnight = ('/assets/sprites/characters/deathKnight.png');
var shadow = ('/assets/sprites/characters/shadow.png');
var wizard = ('/assets/sprites/characters/wizard.png');
var ranger = ('/assets/sprites/characters/ranger.png');
var zombie = ('/assets/sprites/characters/zombie.png');
var dragon = ('/assets/sprites/characters/dragon.png');
var dragonKing = ('/assets/sprites/characters/dragonking.png');

var statusBar100 = ('/assets/sprites/Status_Bars/Status_Bar100.png');
var statusBar0 = ('/assets/sprites/Status_Bars/Status_Bar0.png');

var scrollUp = ('/assets/sprites/icons/scroll_up_button.gif');
var scrollDown = ('/assets/sprites/icons/scroll_down_button.gif');

var radioButton = ('/assets/sprites/icons/radiobutton_circle.png');

var healingPotionPic = ('/assets/sprites/icons/healing_potion.png');

var sword = ('/assets/sprites/inventory/sword.png');
var helmet = ('/assets/sprites/inventory/helmet.png');
var shield = ('/assets/sprites/inventory/shield.png');
var chainmail = ('/assets/sprites/inventory/chainmail.png');
var zombieAxe = ('/assets/sprites/inventory/zombieAxe.png');
var dragonShield = ('/assets/sprites/inventory/dragonShield.png');

class BaseScene extends Phaser.Scene {
    constructor(key) {
        super({ key });
        this.key = key;
    }

    init(data) {
        this.data = data;
        console.log('init', this.data);
        this.heroStats = this.data.hero;
        this.areaChangeType = this.data.areaChangeType;
        this.historyLog = this.data.historyLogData;
        this.historyLogColor = this.data.historyLogColor;
        console.log("History Log : ", this.historyLog)
    }

    // characterLocation(charLocation) {
    //     this.heroLocation = charLocation
    // }

    preload(areaString, area) {
        // Loads background images
        this.load.image('dark-background', backgroundImage);
        // ################################ Changes for each scene
        this.load.image(areaString, area);
        // ################################
        this.load.image('user-interface', userInterface)

        // Characters
        this.load.image('hero', heroImage, 41, 55);
        this.load.image('goblin', goblin, 32, 32);
        this.load.image('deathKnight', deathKnight);
        this.load.image('shadow', shadow);
        this.load.image('wizard', wizard);
        this.load.image('ranger', ranger);
        this.load.image('zombie', zombie);
        this.load.image('dragon', dragon);
        this.load.image('dragonKing', dragonKing);

        // Status Bars
        this.load.image('statusBar100', statusBar100);
        this.load.image('statusBar0', statusBar0)

        this.load.image('scrollUp', scrollUp);
        this.load.image('scrollDown', scrollDown);

        this.load.image('radioButton', radioButton);

        this.load.image('healingPotionPic', healingPotionPic);
        this.load.image('sword', sword);
        this.load.image('helmet', helmet);
        this.load.image('shield', shield);
        this.load.image('chainmail', chainmail);
        this.load.image('zombieAxe', zombieAxe);
        this.load.image('dragonShield', dragonShield);

        // Colors 
        this.neon = "#39FF14"

    }

    create(areaString, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4) {
        socket.on("connect", onsocketConnected); 
        // Creates x and y locations for the hero on scene change
        if (this.areaChangeType == "North") {
            this.heroXPos = this.heroStats.x;
            this.heroYPos = sceneBorders.y[1] - 35;
        }
        else if (this.areaChangeType == "East") {
            this.heroXPos = sceneBorders.x[0] + 35;
            this.heroYPos = this.heroStats.y;
        }
        else if (this.areaChangeType == "South") {
            this.heroXPos = this.heroStats.x;
            this.heroYPos = sceneBorders.y[0] + 35;
        }
        else if (this.areaChangeType == "West") {
            this.heroXPos = sceneBorders.x[1] - 35;
            this.heroYPos = this.heroStats.y;
        }
        else if (this.areaChangeType == "Death") {
            this.heroXPos = 150;
            this.heroYPos = 150;
        }
        

        this.areaChanges = areaChanges;
        this.areaChangeTo = areaChangeTo;

        this.sceneX = sceneBorders.x;
        this.sceneY = sceneBorders.y;
        this.gameScreen = 515   // Width and height of game screen

        this.mouseClicked = false;
        // this.battleMode = false;
        this.attackTimer = 200;
        this.enemyFighting = "";
        this.deadEnemyList = [];
        this.doubleDamageText = false;

        // To prevent double clicking
        this.now = Date.now();
        this.lastClick = this.now;
        this.delay = 300;

        // Timer for healing health every minute
        this.minuteTimer = Date.now();
        this.minuteTimer4 = Date.now();

        // Renders images and sprites to screen
        this.background1 = this.add.image(850 / 2, 700 / 2, 'dark-background');
	    this.areaBackground = this.add.image(512 / 2, (480 / 2) + 30, areaString);
        this.ui = this.add.image(325 / 2 + 520, 619 / 2, 'user-interface');
        this.scrollUp = this.add.image(465, 570, 'scrollUp');
        this.scrollDown = this.add.image(465, 610, 'scrollDown');
        this.radioButton = this.add.image(552, 530, 'radioButton');
        this.healingPotionPic = this.add.image(547, 325, 'healingPotionPic').setInteractive();
        // Adds images off screen to be able to user hover over text later
        this.sword = this.add.image(-50, -50, 'sword').setInteractive();
        this.zombieAxe = this.add.image(-50, -50, 'zombieAxe').setInteractive();
        this.helmet = this.add.image(743, -50, 'helmet').setInteractive();
        this.shield = this.add.image(795, -50, 'shield').setInteractive();
        this.chainmail = this.add.image(743, -50, 'chainmail').setInteractive();
        this.dragonShield = this.add.image(743, -50, 'dragonShield').setInteractive();

        // if (this.key != "Store") {
        // Creates characters
        this.enemies = [];
        if(Enemy1 != "None") {
            this.enemy1 = new Enemy1.class({
                key: Enemy1.name,
                scene: this,
                walkAreaX : Enemy1.walkAreaX,
                walkAreaY : Enemy1.walkAreaY,
                x: Enemy1.x,
                y: Enemy1.y,
            }).setInteractive(); // set interactive allows pointerover event
        }
        this.enemies = [this.enemy1];
        if (Enemy2 != "None") {
            this.enemy2 = new Enemy2.class({
                key: Enemy2.name,
                scene: this,
                walkAreaX : Enemy2.walkAreaX,
                walkAreaY : Enemy2.walkAreaY,
                x: Enemy2.x,
                y: Enemy2.y,
            }).setInteractive();  // set interactive allows pointerover event
            this.enemies = [this.enemy1, this.enemy2];
        }
        if (Enemy3 != "None") {
            this.enemy3 = new Enemy3.class({
                key: Enemy3.name,
                scene: this,
                walkAreaX : Enemy3.walkAreaX,
                walkAreaY : Enemy3.walkAreaY,
                x: Enemy3.x,
                y: Enemy3.y,
            }).setInteractive();  // set interactive allows pointerover event
            this.enemies = [this.enemy1, this.enemy2, this.enemy3];
        }
        
        if (Enemy4 != "None") {
            this.enemy4 = new Enemy4.class({
                key: Enemy4.name,
                scene: this,
                walkAreaX : Enemy4.walkAreaX,
                walkAreaY : Enemy4.walkAreaY,
                x: Enemy4.x,
                y: Enemy4.y,
            }).setInteractive(); 
            this.enemies = [this.enemy1, this.enemy2, this.enemy3, this.enemy4];
        }

        console.log("Hero Status", this.heroStats === undefined)
        

        // else {
        //     console.log("Store");
        //     this.heroXPos = 450;
        //     this.heroYPos = 200;
        //     // Creating enemy off screen to prevent errors
        //     this.enemy1 = new Goblin({
        //         key: 'goblin',
        //         scene: this,
        //         walkAreaX : [-80, -100],
        //         walkAreaY : [-80, -100],
        //         x: -90,
        //         y: -90,
        //     }).setInteractive();
        //     this.enemies = [this.enemy1];
        // }
        if (this.key == "Store") {
            this.heroXPos = 430;
            this.heroYPos = 250;
        }

        if (this.key == "Main") {
            this.heroYPos = -50;
        }

        if (this.heroStats === undefined) {
            this.hero = new Hero({
                key: 'hero',
                scene: this,
                x: 150,
                y: 250,
            });
        }
        else {
            this.hero = new Hero({
                key: 'hero',
                scene: this,
                x: this.heroXPos,
                y: this.heroYPos,
            });
            // Transferring over stats from prior scene
            this.hero.power = this.heroStats.power;
            this.hero.defense = this.heroStats.defense;
            this.hero.health = this.heroStats.health;
            this.hero.maxhealth = this.heroStats.maxhealth;
            this.hero.powerExp = this.heroStats.powerExp;
            this.hero.defenseExp = this.heroStats.defenseExp;
            this.hero.healthExp = this.heroStats.healthExp;
            this.hero.nextHealthLevelExp = this.heroStats.nextHealthLevelExp;
            this.hero.nextPowerLevelExp = this.heroStats.nextPowerLevelExp;
            this.hero.nextDefenseLevelExp = this.heroStats.nextDefenseLevelExp;
            this.hero.coins = this.heroStats.coins;
            this.hero.attackStance = this.heroStats.attackStance;
            this.hero.powerLvAdj = this.heroStats.powerLvAdj;
            this.hero.defenseLvAdj = this.heroStats.defenseLvAdj;
            this.hero.defenseBenefit = this.heroStats.defenseBenefit;
            this.hero.defenseTimes = this.heroStats.defenseTimes;
            this.hero.items = this.heroStats.items;
            this.hero.helmetSlot = this.heroStats.helmetSlot;
            this.hero.helmetSlotIndex = this.heroStats.helmetSlotIndex
            this.hero.bodySlot = this.heroStats.bodySlot;
            this.hero.bodySlotIndex = this.heroStats.bodySlotIndex
            this.hero.weaponSlot = this.heroStats.weaponSlot;
            this.hero.weaponSlotIndex = this.heroStats.weaponSlotIndex
            this.hero.shieldSlot = this.heroStats.shieldSlot;
            this.hero.shieldSlotIndex = this.heroStats.shieldSlotIndex;
            this.hero.helmetBonus = this.heroStats.helmetBonus;
            this.hero.bodyBonus = this.heroStats.bodyBonus;
            this.hero.weaponBonus = this.heroStats.weaponBonus;
            this.hero.shieldBonus = this.heroStats.shieldBonus;

        }

        // Loads equipment from database
        if (this.hero.items.sword == 1) {
            this.hero.weaponSlot.push("sword");
        }
        if (this.hero.items.zombieAxe == 1) {
            this.hero.weaponSlot.push("zombieAxe");
        }

        if (this.hero.items.shield == 1) {
            this.hero.shieldSlot.push("shield");
        }
        if (this.hero.items.dragonShield == 1) {
            this.hero.shieldSlot.push("dragonShield");
        }

        if (this.hero.items.helmet == 1) {
            this.hero.helmetSlot.push("helmet");
        }

        if (this.hero.items.chainmail == 1) {
            this.hero.bodySlot.push("chainmail");
        }

        //create hero and enemy health bar off screen
        this.statusBarHero0 = this.add.image(-30, - 40, 'statusBar0');
        this.statusBarEnemy0 = this.add.image(-30, - 80, 'statusBar0');

        this.statusBarHero100 = this.add.image(-30, - 40, 'statusBar100');
        this.statusBarEnemy100 = this.add.image(-30, - 80, 'statusBar100');

        // this.healthbar.cropEnabled = true;

        // shows hero levels on screen
        this.heroPowerLvText = this.add.text(650, 112, this.hero.power, {font:"20px Ariel", color:this.neon});

        this.heroDefenseLvText = this.add.text(650, 162, this.hero.defense, {font:"20px Ariel", color:"Blue"});

        this.heroHealthLvText = this.add.text(650, 222, this.hero.health, {font:"20px Ariel", color:"Red"});

        // Shows current and next lv hero Exp on screen
        this.heroPowerExpText = this.add.text(545, 135, `Current Exp: ${this.hero.powerExp}        Next Level: ${this.hero.nextPowerLevelExp}`, {font:"14px Ariel", color:this.neon});
        
        this.heroDefenseExpText = this.add.text(545, 190, `Current Exp: ${this.hero.defenseExp}        Next Level: ${this.hero.nextDefenseLevelExp}`, {font:"14px Ariel", color:"Blue"});

        this.heroHealthExpText = this.add.text(545, 245, `Current Exp: ${this.hero.healthExp}        Next Level: ${this.hero.nextHealthLevelExp}`, {font:"14px Ariel", color:"Red"});

        // Inventory
        this.healingPotionText = this.add.text(705, 317, `${this.hero.items.healingPotion}`, {font:"20px Ariel", color:"Red"})

        this.equipmentPowerBonus = this.add.text(560, 380, "Power: + 0", {font:"20px Ariel", color:this.neon});
        this.equipmentDefenseBonus = this.add.text(548, 405, "Defense: + 0", {font:"20px Ariel", color:"blue"});

        // Damage text
        this.heroDamageText = this.add.text(-20, 20, "", {font:"18px 'Ariel Bold'", color:"Red"});
        this.heroDamageText2 = this.add.text(-20, 20, "", {font:"18px 'Ariel Bold'", color:"Red"}); // For ranger special attack
        this.enemyDamageText = this.add.text(-20, 20, "", {font:"18px 'Ariel Bold'", color:"Red"});

        // History Log
        this.historyTextHeading = this.add.text(20, 513, "History:", {font:"20px Ariel"});
        this.historyTextLine = this.add.text(10, 528, "-----------------------------------------------")
        this.historyTextLine1 = this.add.text(20, 545, "", {font:"14px 'Ariel Bold'"});
        this.historyTextLine2 = this.add.text(20, 570, "", {font:"14px Ariel"});
        this.historyTextLine3 = this.add.text(20, 595, "", {font:"14px Ariel"});
        this.historyTextLine4 = this.add.text(20, 620, "", {font:"14px Ariel"});
        this.historyTextLine5 = this.add.text(20, 645, "", {font:"14px Ariel"});
        this.historyTextLine6 = this.add.text(20, 670, "", {font:"14px Ariel"});

        this.historyLogCount = this.add.text(440, 635, "0 / 0", {font:"12px Ariel"});

        this.coinText = this.add.text(705, 578, `${this.hero.coins}`, {color:"Yellow"})

        
        this.historyLineTextList = [];
        this.historyLineTextColor = [];
        
        // else {
        //     this.historyLineTextList = this.historyLog;
        //     this.historyLineTextColor = this.historyLogColor;
        // }
        this.historyTextScroll = 0;
        

        for (var i = 0; i < this.enemies.length; i ++) {
            this.enemies[i].text = this.add.text(20, 0, "", {font:"24px Ariel", color:"Red"}); // Hover text
        }
        this.healingPotionPic.text = this.add.text(20, 0, "", {font:"24px Ariel", color:"Red"});
        this.sword.text = this.add.text(20, 0, "", {font:"24px Ariel", color:"Red"});
        this.zombieAxe.text = this.add.text(20, 0, "", {font:"24px Ariel", color:"Red"});

        // // Sets scene border so player does not move off screen (Need to find a way that this works in Phaser3)
        // this.hero.setBounds(0, 0, 800, 600);
        
        // Handles click events
        
        this.input.on('pointerdown', function(event) {
            if (this.hero.frozen == false) {
                for (var i = 0; i < this.enemies.length; i ++) {
                    this.enemies[i].clickPosition = [this.enemies[i].x, this.enemies[i].y];
                }
    
                // Moves player to click location
                this.mouseClickX = event.x;
                this.mouseClickY = event.y;
                this.mouseClicked = true;
                // stores enemy position on click
                // this.goblin.clickPosition = [this.goblin.x, this.goblin.y];
    
                // checks if enemy was clicked on
                for (var i = 0; i < this.enemies.length; i ++) {
                    if (enemyClicked(this.mouseClickX, this.mouseClickY, this.enemies[i], this.gameScreen) == true) {
                        this.attackEnemy = true;
                        if (this.enemyFighting == "") {
                            // prevents hero from starting a fight with another enemy while already attacking an enemy
                            this.enemyFighting = this.enemies[i];
                        }
                        console.log(this.enemyFighting);
                        break; // breaks out of loop so that else if does not run and prevent attacking the enemy that was clicked on
                    }
                    else if (enemyClicked(this.mouseClickX, this.mouseClickY, this.enemies[i], this.gameScreen) == false){
                        this.attackEnemy = false;
                        this.hero.battleMode = false;
                    }
                }
    
                console.log("x: ", event.x, " y: ", event.y);
    
                // Controls history text buttons
                if (this.mouseClickX >= 446 && this.mouseClickX <=485 && this.mouseClickY >= 558 && this.mouseClickY <= 590) {
                    if (this.historyLineTextList.length > 6 && this.historyTextScroll < this.historyLineTextList.length - 5) {
                        this.historyTextScroll += 1
                    }
                }
    
                if (this.mouseClickX >= 446 && this.mouseClickX <=485 && this.mouseClickY >= 598 && this.mouseClickY <= 630) {
                    if (this.historyLineTextList.length > 6 && this.historyTextScroll > 0) {
                        this.historyTextScroll -= 1
                    }
                }
                this.totalDefenseBonus = this.hero.helmetBonus + this.hero.shieldBonus + this.hero.bodyBonus; 
    
                // Attack stance button
                if (attackStance(this.mouseClickX, this.mouseClickY) == "Aggressive") {
                    this.hero.attackStance = "Aggressive";
                    this.hero.powerLvAdj = this.hero.power + 3 + this.hero.weaponBonus;
                    this.hero.defenseLvAdj = Math.max(this.hero.defense - 3, 1) + this.totalDefenseBonus;
                }
                else if (attackStance(this.mouseClickX, this.mouseClickY) == "Defensive") {
                    this.hero.attackStance = "Defensive";
                    this.hero.powerLvAdj = Math.max(this.hero.power - 3, 1) + this.hero.weaponBonus;
                    this.hero.defenseLvAdj = this.hero.defense + 3 + this.totalDefenseBonus;
                }
                else if (attackStance(this.mouseClickX, this.mouseClickY) == "Normal") {
                    this.hero.attackStance = "Normal";
                    this.hero.powerLvAdj = this.hero.power + this.hero.weaponBonus;
                    this.hero.defenseLvAdj = this.hero.defense + this.totalDefenseBonus;
                }
                
                console.log(this.hero.powerLvAdj)
                console.log(this.hero.weaoponBonus)
                // healing potion
                if (this.mouseClickX >= 538 && this.mouseClickX <= 558 && this.mouseClickY >= 315 && this.mouseClickY <= 342) {
                    if (this.hero.items.healingPotion > 0) {
                        this.hero.health = Math.min(this.hero.maxhealth, (this.hero.health + 10));
                        this.hero.items.healingPotion -= 1;
                        this.historyLineTextList.unshift(`Hero drinks a healing potion`);
                        this.historyLineTextColor.unshift("White");
                        if (this.hero.battleMode == true) {
                            this.hero.healing = true;
                        }
                        
                    }
                }
                
            }
            

        },this);

        this.input.on('pointerup', function(event) {
            this.now = Date.now();
            console.log(this.now - this.lastClick)
            if ((this.now - this.lastClick) >= this.delay) {
                if (this.mouseClickX >= 672 && this.mouseClickX <=708 && this.mouseClickY >= 390 && this.mouseClickY <= 426 ) {
                    this.hero.weaponSlotIndex += 1
                    if (this.hero.weaponSlotIndex >= this.hero.weaponSlot.length) {
                        this.hero.weaponSlotIndex = 0;
                    }
                }
                if (this.mouseClickX >= 725 && this.mouseClickX <=763 && this.mouseClickY >= 348 && this.mouseClickY <= 381) {
                    this.hero.helmetSlotIndex += 1
                    if (this.hero.helmetSlotIndex >= this.hero.helmetSlot.length) {
                        this.hero.helmetSlotIndex = 0;
                    }
                }
                if (this.mouseClickX >= 778 && this.mouseClickX <= 815 && this.mouseClickY >= 390 && this.mouseClickY <= 426) {
                    this.hero.shieldSlotIndex += 1
                    if (this.hero.shieldSlotIndex >= this.hero.shieldSlot.length) {
                        this.hero.shieldSlotIndex = 0;
                    }
                }

                if (this.mouseClickX >= 725 && this.mouseClickX <= 763 && this.mouseClickY >= 390 && this.mouseClickY <= 426) {
                    this.hero.bodySlotIndex += 1
                    if (this.hero.bodySlotIndex >= this.hero.bodySlot.length) {
                        this.hero.bodySlotIndex = 0;
                    }
                }
                this.lastClick = this.now;
            }
            
        },this);

        this.timer = 0;
        this.changeDirTimer = 120;
        this.randNumb = [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4), Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
    }

    update(delta) {
        // Information to send to database
        
        this.playerStats = {
            username: this.hero.username,
            x: this.hero.x,
            y: this.hero.y,
            power: this.hero.power,
            defense: this.hero.defense,
            health: this.hero.health,
            maxhealth: this.hero.maxhealth,
            powerExp: this.hero.powerExp,
            defenseExp: this.hero.defenseExp,
            healthExp: this.hero.healthExp,
            coins: this.hero.coins,
            healingPotion: this.hero.items.healingPotion,
            helmet: this.hero.items.helmet,
            sword: this.hero.items.sword,
            shield: this.hero.items.shield,
            chainmail: this.hero.items.chainmail,
            zombieAxe: this.hero.items.zombieAxe,
            dragonShield: this.hero.items.dragonShield,
            helmetSlot: this.hero.helmetSlot,
            helmetSlotIndex: this.hero.helmetSlotIndex,
            helmetBonus: this.hero.helmetBonus,
            bodySlot: this.hero.bodySlot,
            bodySlotIndex: this.hero.bodySlotIndex,
            bodyBonus: this.hero.bodyBonus,
            weaponSlot: this.hero.weaponSlot,
            weaponSlotIndex: this.hero.weaponSlotIndex,
            weaponBonus: this.hero.weaponBonus,
            shieldSlot: this.hero.shieldSlot,
            shieldSlotIndex: this.hero.shieldSlotIndex,
            shieldBonus: this.hero.shieldBonus,

        }
        // To prevent main menu from being passed to database
        if (this.key !=  "Main") {
            this.playerStats.currentArea = this.key;
        }
        else {
            this.playerStats.currentArea = this.hero.currentArea
        }

        //Checks if enemy is within range of attacking
        if (this.attackEnemy == true || (this.enemyFighting.battleMode == true && this.attackEnemy == true)) {
            // Has hero chasing enemy 
            this.mouseClickX = this.enemyFighting.x;
            this.mouseClickY = this.enemyFighting.y;
            // console.log("herox: ", this.hero.x) 
            // console.log(this.goblin.x - this.hero.attackRange);
            if (this.hero.x >= this.enemyFighting.x - (this.hero.attackRange + (this.enemyFighting.width / 2)) && this.hero.x <= this.enemyFighting.x + (this.hero.attackRange + (this.enemyFighting.width / 2)) && this.hero.y >= this.enemyFighting.y - (this.hero.attackRange + (this.enemyFighting.height / 2)) && this.hero.y <= this.enemyFighting.y + (this.hero.attackRange + (this.enemyFighting.height / 2))) { // Sets attack range to include enemies width and height
                this.hero.battleMode = true;
                this.hero.attackTime = 190;
                this.enemyFighting.attackTime = 90;
            }
            // checks if hero is within enemies range
            if (this.enemyFighting.x >= this.hero.x - this.enemyFighting.attackRange && this.enemyFighting.x <= this.hero.x + this.enemyFighting.attackRange && this.enemyFighting.y >= this.hero.y - this.enemyFighting.attackRange && this.enemyFighting.y <= this.hero.y + this.enemyFighting.attackRange) {
                this.enemyFighting.battleMode = true;
            }
        }


        // Moves player to mouse click
        if (this.mouseClicked == true && this.mouseClickX <= 515 && this.mouseClickX >= 0 && this.mouseClickY <= 515 && this.mouseClickY >= 30) {
            // Prevents hero from standing on enemy during battle
            if (this.mouseClickX <= this.sceneX[0]) {
                this.mouseClickX = this.sceneX[0]
            }
            else if (this.mouseClickX >= this.sceneX[1]) {
                this.mouseClickX = this.sceneX[1]
            }
            if (this.mouseClickY <= this.sceneY[0]) {
                this.mouseClickY = this.sceneY[0]
            }
            else if (this.mouseClickY >= this.sceneY[1]) {
                this.mouseClickY = this.sceneY[1]
            }

            if (this.attackEnemy == false) {
                var adjX = 0;
                var adjY = 0;
            }
            else {
                var adjX = this.enemyFighting.width;
                var adjY = this.enemyFighting.height;
            }
            if (this.hero.x < this.mouseClickX - adjX) {
                this.hero.x += this.hero.speed;
            }
            if (this.hero.x > this.mouseClickX + adjX) {
                this.hero.x -= this.hero.speed;
            }
            if (this.hero.y < this.mouseClickY - adjY) {
                this.hero.y += this.hero.speed;
            }
            if (this.hero.y > this.mouseClickY + adjY) {
                this.hero.y -= this.hero.speed;
            }
            if (this.hero.x == this.mouseClickX && this.hero.y == this.mouseClickY) {
                this.mouseClicked = false;
            }   
        }
        
        // Enemy movement
        if (this.changeDirTimer <= 0) {
            this.randNumb = [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4), Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
            this.changeDirTimer = 240;
        }

        this.changeDirTimer -= 1;
        // console.log(this.battleMode);

        for (var i = 0; i < this.enemies.length; i ++) {
            if (this.enemies[i].battleMode == false && this.enemies[i].status == "Alive") {
                if (this.randNumb[i] == 0 && this.enemies[i].x < this.enemies[i].walkAreaX[1]) {
                    this.enemies[i].x += this.enemies[i].speed;
                }
                else if (this.randNumb[i] == 1 && this.enemies[i].x > this.enemies[i].walkAreaX[0]) {
                    this.enemies[i].x -= this.enemies[i].speed;
                }
                else if (this.randNumb[i] == 2 && this.enemies[i].y < this.enemies[i].walkAreaY[1]) {
                    this.enemies[i].y += this.enemies[i].speed;
                }
                else if (this.randNumb[i] == 3 && this.enemies[i].y > this.enemies[i].walkAreaY[0]) {
                    this.enemies[i].y -= this.enemies[i].speed;
                }
            }
        }

        // Enemy follows hero when hero runs away
        if (this.enemyFighting.battleMode == true && this.enemyFighting.status == "Alive") {
            if (this.enemyFighting.x + (this.enemyFighting.attackRange) < this.hero.x) {
                this.enemyFighting.x += this.enemyFighting.speed;
            }
            else if (this.enemyFighting.x - (this.enemyFighting.attackRange) > this.hero.x) {
                this.enemyFighting.x -= this.enemyFighting.speed;
            }
            if (this.enemyFighting.y + (this.enemyFighting.attackRange) < this.hero.y) {
                this.enemyFighting.y += this.enemyFighting.speed;
            }
            else if (this.enemyFighting.y - (this.enemyFighting.attackRange) > this.hero.y) {
                this.enemyFighting.y -= this.enemyFighting.speed;
            }
            // disables enemy battle mode once hero runs away too far
            if (this.hero.battleMode == false) {
                if (Math.abs(this.enemyFighting.x - this.hero.x) > this.enemyFighting.attackRange + 20) {
                    this.enemyFighting.battleMode = false;
                    this.enemyFighting = "";
                }
                else if (Math.abs(this.enemyFighting.y - this.hero.y) > this.enemyFighting.attackRange + 20) {
                    this.enemyFighting.battleMode = false;
                    this.enemyFighting = "";
                }
                else if (this.enemyFighting.x < this.enemyFighting.walkAreaX[0] || this. enemyFighting.x > this.enemyFighting.walkAreaX[1]) {
                    this.enemyFighting.battleMode = false;
                    this.enemyFighting = "";
                }
                else if (this.enemyFighting.y < this.enemyFighting.walkAreaY[0] || this.enemyFighting.y > this.enemyFighting.walkAreaY[1]) {
                    this.enemyFighting.battleMode = false;
                    this.enemyFighting = "";
                }
            }
            
        }

        // Updates when hero and enemy leave battle mode
        for (var i = 0; i < this.enemies.length; i ++) { 
            if (this.hero.battleMode == false && this.enemyFighting == "") {
                // hides status bars
                this.statusBarHero100.y = -40;
                this.statusBarEnemy100.y= -40;
                this.statusBarHero0.y = -40;
                this.statusBarEnemy0.y = -40;
                // Clears damage text
                this.heroDamageText.y = -50;
                this.heroDamageText2.y = -50;
                this.enemyDamageText.y = -50;
                this.enemyAttackPower = "";
                this.enemyAttackPower2 = "";
                this.attackPower = "";
    
                this.attackTimer = 200;
            }
        }
        
            if (this.hero.battleMode == true || this.enemyFighting.battleMode == true) {
                this.attackTimer -= 1;

                // Changes status bar when taking damage
                this.statusBarHero0.x = this.hero.x;
                this.statusBarHero0.y = this.hero.y - 30;
                this.statusBarHero100.x = this.hero.x - (((this.hero.maxhealth - this.hero.health ) * (23 / this.hero.maxhealth))/2); // Formula prevents the green bar from centering as it shrinks
                this.statusBarHero100.y = this.hero.y - 30;
                this.statusBarHero100.displayWidth =  (this.hero.health / this.hero.maxhealth) * 23;

                this.statusBarEnemy0.x = this.enemyFighting.x;
                this.statusBarEnemy0.y = this.enemyFighting.y - 30;
                this.statusBarEnemy100.x = this.enemyFighting.x - (((this.enemyFighting.maxhealth - this.enemyFighting.health ) * (23 / this.enemyFighting.maxhealth))/2);
                this.statusBarEnemy100.y = this.enemyFighting.y - 30;
                this.statusBarEnemy100.displayWidth =  (this.enemyFighting.health / this.enemyFighting.maxhealth) * 23;
                // Hero attacks enemy
                if (this.attackTimer == this.hero.attackTime && this.hero.battleMode == true) {

                    console.log(this.playerStats);
                
                    if (this.hero.frozen == false && this.hero.healing == false) {
                        var count = 0;
                        // Hero special attack
                        var specialAttackNumb = Math.floor(Math.random() * (1/this.hero.specialAttackPerc));
                        // console.log(specialAttackNumb);
                        this.attackPower = Math.floor(Math.random() * Math.max((this.hero.powerLvAdj + 4),2));
                        console.log(`${count}: Power ${this.attackPower} - Defense Benefit ${Math.max(this.hero.powerLvAdj - this.enemyFighting.defenseBenefit, 1)} -  Defense Times ${this.enemyFighting.defenseTimes}`)
                        while (this.attackPower > Math.max(this.hero.powerLvAdj - this.enemyFighting.defenseBenefit, 1) && count < this.enemyFighting.defenseTimes){
                            this.attackPower = Math.floor(Math.random() * (this.hero.powerLvAdj + 1));
                            this.attackPower = Math.min(this.attackPower, this.enemyFighting.health);
                            console.log(this.enemyFighting.health)
                            console.log(`${count}: Power ${this.attackPower} - Defense Benefit ${Math.max(this.hero.powerLvAdj - this.enemyFighting.defenseBenefit, 1)} -  Defense Times ${this.enemyFighting.defenseTimes}`)
                            count += 1;
                            
                        }
                        this.attackPower = Math.min(Math.round(this.attackPower / 3.1), this.enemyFighting.health);
                        // Shadow special ability
                        if (this.enemyFighting.name == "Shadow") {
                            var enemyRandNumb = Math.floor(Math.random() * (1/this.enemyFighting.specialAttackPerc))
                            console.log("Shadow special :", enemyRandNumb);
                            if (enemyRandNumb != 1) {
                                this.attackPower = 0;
                            }
                        }
                        if (this.enemyFighting.name == "Zombie" && this.hero.weaponSlot[this.hero.weaponSlotIndex] != "zombieAxe") {
                            if (this.enemyFighting.health == 1) {
                                this.attackPower = 0;
                            }
                            else if (this.attackPower >= this.enemyFighting.health) {
                                this.attackPower = this.enemyFighting.health - 1;
                            }
                        }
                            
                        if (specialAttackNumb == 0) {
                            this.attackPower = this.attackPower = Math.min(this.attackPower * 2, this.enemyFighting.health);
                            this.historyLineTextList.unshift(`SPECIAL ATTACK: Hero does ${this.attackPower} damage to ${this.enemyFighting.name}`);
                        }
                        else {
                            this.historyLineTextList.unshift(`Hero does ${this.attackPower} damage to ${this.enemyFighting.name}`);
                        }

                        // console.log("Hero attacks goblin :", this.attackPower);
                        this.enemyFighting.health -= this.attackPower;
                        // Sets attack number color
                        if (this.attackPower == 0) {
                            this.damageColor = "blue"
                        }
                        else {
                            this.damageColor = "red"
                        }
                        this.historyLineTextColor.unshift(this.neon);

                        // Experience points
                        if (this.hero.attackStance == "Aggressive") {
                            this.hero.powerExp += Math.round(this.attackPower * 3.7);
                            this.hero.healthExp += Math.round(this.attackPower * 1.5);
                            this.hero.powerStanceBonus = 3;
                        }
                        else if (this.hero.attackStance == "Defensive") {
                            this.hero.defenseExp += Math.round(this.attackPower * 3.7);
                            this.hero.healthExp += Math.round(this.attackPower * 1.5);
                        }
                        else if (this.hero.attackStance == "Normal") {
                            this.hero.powerExp += Math.round(this.attackPower * 1.5);
                            this.hero.defenseExp += Math.round(this.attackPower * 1.5);
                            this.hero.healthExp += Math.round(this.attackPower * 2.0);
                        }
                    }
                    if (this.hero.healing == true) {
                        this.hero.healing = false;
                    }
                    socket.emit('playerStats', this.playerStats); // sends to server
                }
                // Enemy attacks hero
                if (this.attackTimer == this.enemyFighting.attackTime && this.enemyFighting.battleMode == true) {
                    this.doubleDamageText = false;
                    this.damageTextLocationX = 5;
                    this.hero.frozen = false; // unfreezes hero if frozen
                    this.hero.speed = 2;
                    var count = 0;
                    var specialAttackNumb = Math.floor(Math.random() * (1/this.enemyFighting.specialAttackPerc));
                    this.enemyAttackPower = Math.floor(Math.random() * (this.enemyFighting.power + 4));
                    while (this.enemyAttackPower > Math.max(this.enemyFighting.power - this.hero.defenseBenefit, 1) && count < this.hero.defenseTimes){
                        this.enemyAttackPower = Math.floor(Math.random() * (this.enemyFighting.power + 1));
                        this.enemyAttackPower = Math.min(this.enemyAttackPower, this.hero.health);
                        // console.log(`${count}: Power ${this.enemyAttackPower} - Defense Benefit ${Math.max(this.goblin.power - this.hero.defenseBenefit, 1)} -  Defense Times ${this.hero.defenseTimes}`)
                        count += 1;
                    }
                    
                    this.enemyAttackPower = Math.min(Math.round(this.enemyAttackPower / 3.1), this.hero.health);
                    this.hero.health -= this.enemyAttackPower;
                    // Sets attack number color
                    if (this.enemyAttackPower == 0) {
                        this.enemyDamageColor = "blue"
                    }
                    else {
                        this.enemyDamageColor = "red"
                    }
                    console.log(specialAttackNumb);
                    // Handles enemy special attacks
                    if (specialAttackNumb == 0 && this.enemyFighting.name != "Shadow") {
                        if (this.enemyFighting.name == "Goblin" && this.hero.coins >= 2) {
                            this.hero.coins -= 2;
                            this.historyLineTextList.unshift(`COIN GRAB ${this.enemyFighting.name} steals 2 coins`);
                        }
                        else if (this.enemyFighting.name == "Death Knight") {
                            var healing = Math.min(this.enemyAttackPower, (this.enemyFighting.maxhealth - this.enemyFighting.health));
                            this.enemyFighting.health += healing;
                            this.historyLineTextList.unshift(`${this.enemyFighting.name} does ${this.enemyAttackPower} damage to Hero`);
                            this.historyLineTextList.unshift(`LIFESTEAL ${this.enemyFighting.name} heals ${healing}`);
                            this.historyLineTextColor.unshift("Red");
                        }
                        else if (this.enemyFighting.name == "Wizard") {
                            this.hero.frozen = true;
                            this.hero.speed = 0;
                            this.historyLineTextList.unshift(`Hero is frozen and can't move`);
                            this.historyLineTextColor.unshift("Blue");
                            this.historyLineTextList.unshift(`FREEZE RAY ${this.enemyFighting.name} does ${this.enemyAttackPower} damage to Hero`);
                        }
                        else if (this.enemyFighting.name == "Ranger") {
                            this.damageTextLocationX = 13
                            this.enemyAttackPower2 = Math.floor(Math.random() * (this.enemyFighting.power + 4));
                            this.enemyAttackPower2 = Math.min(Math.round(this.enemyAttackPower2 /3.1), this.hero.health);
                            this.hero.health -= this.enemyAttackPower2;
                            this.historyLineTextList.unshift(`DOUBLE SHOT ${this.enemyFighting.name} does ${this.enemyAttackPower} and ${this.enemyAttackPower2} damage to Hero`);
                            this.doubleDamageText = true;
                        }
                        else if (this.enemyFighting.name == "Dragon" || this.enemyFighting.name == "Dragon King" && this.hero.shieldSlot[this.hero.shieldSlotIndex] != "dragonShield") {
                            this.enemyAttackPower = this.hero.health;
                            this.hero.health -= this.enemyAttackPower;
                            this.historyLineTextList.unshift(`SPECIAL ATTACK ${this.enemyFighting.name} breathes fire and kills hero`);
                            console.log("Dragon special")
                            console.log(this.enemyAttackPower);
                        }
                    }
                    else {
                        this.historyLineTextList.unshift(`${this.enemyFighting.name} does ${this.enemyAttackPower} damage to Hero`);
                    }
                    
                    this.historyLineTextColor.unshift("Red");
                }

                // Shows damage above characters head
                this.heroDamageText.x = this.hero.x - this.damageTextLocationX;
                this.heroDamageText.y = this.hero.y - 55;
                this.heroDamageText.setText(this.enemyAttackPower).setStyle({font:"18px Ariel Bold", color: this.enemyDamageColor});

                if (this.doubleDamageText == true) {
                    this.heroDamageText2.x = this.hero.x + 13;
                    this.heroDamageText2.y = this.hero.y - 55;
                    
                    if (this.enemyAttackPower2 == 0) {
                        this.enemyDamageColor2 = "blue"
                    }
                    else {
                        this.enemyDamageColor2 = "red"
                    }
                    this.heroDamageText2.setText(this.enemyAttackPower2).setStyle({font:"18px Ariel Bold", color: this.enemyDamageColor2});
                }
                else {
                    this.heroDamageText2.y = - 55;
                }
                

                this.enemyDamageText.x = this.enemyFighting.x - 5;
                this.enemyDamageText.y = this.enemyFighting.y - 55;
                this.enemyDamageText.setText(this.attackPower).setStyle({font:"18px Ariel Bold", color: this.damageColor});;

                if (this.attackTimer <= 0) {
                    this.attackTimer =  200;
                }
            }

        // Character death
        if ((this.enemyFighting.health <= 0 || this.hero.health <= 0) && this.enemyFighting.battleMode == true) {
            socket.emit('playerStats', this.playerStats); // sends to server
            if (this.enemyFighting.health <= 0) {
                if (this.enemyFighting.status == "Alive") { // Prevents loop that would happen until enemy respawn
                    var enemyBounty = this.enemyFighting.bounty[Math.floor(Math.random() * this.enemyFighting.bounty.length)];
                    // Bounty drop
                    this.hero.coins += enemyBounty;
                    this.historyLineTextList.unshift(`${this.enemyFighting.name} dead. You received ${enemyBounty} coins`);
                    this.historyLineTextColor.unshift("Yellow");
                    this.mouseClicked = false;
                    this.deadEnemyList.push(this.enemyFighting);
                }
                this.enemyFighting.status = "Dead";
                this.enemyFighting.y = -50;
            }
            else if (this.hero.health <= 0) {
                this.hero.health = this.hero.maxhealth;

                if (this.key != "Area98_100") {
                    this.scene.start("Area98_100", 
                    {hero : this.hero, areaChangeType : "Death"});
                }
                else {
                    this.hero.x = 150;
                    this.hero.y = 150;
                    this.mouseClickX = 150;
                    this.mouseClickY = 150;
                    this.mouseClicked = false;
                }
                
            }
            this.hero.battleMode = false;
            this.enemyFighting.battleMode = false;
            this.attackEnemy = false;
            this.hero.frozen = false;
            this.hero.speed = 2;
            this.doubleDamageText = false;
            // hides status bars
            this.statusBarHero100.y = -40;
            this.statusBarEnemy100.y= -40;
            this.statusBarHero0.y = -40;
            this.statusBarEnemy0.y = -40;
            // Clears damage text
            this.heroDamageText.y = -50;
            this.heroDamageText2.y = -50;
            this.enemyDamageText.y = -50;
            this.enemyAttackPower = "";
            this.enemyAttackPower2 = "";
            this.attackPower = "";
            this.enemyFighting = "";
            
        }
        
        // Enemy respawn
        try {
            if (this.deadEnemyList.length > 0) {
                for (var i = 0; i < this.deadEnemyList.length; i++) {
                    this.deadEnemyList[i].respawnTimer -= 1;
                    if (this.deadEnemyList[i].respawnTimer <= 0) {
                        this.deadEnemyList[i].status = "Alive";
                        this.deadEnemyList[i].x = Math.floor(Math.random()*((this.deadEnemyList[i].walkAreaX[1] - 10)-(this.deadEnemyList[i].walkAreaX[0] + 10)+1)+(this.deadEnemyList[i].walkAreaX[0] + 10));
                        this.deadEnemyList[i].y = Math.floor(Math.random()*((this.deadEnemyList[i].walkAreaY[1] - 10)-(this.deadEnemyList[i].walkAreaY[0] + 10)+1)+(this.deadEnemyList[i].walkAreaY[0] + 10));;
                        this.deadEnemyList[i].respawnTimer = this.deadEnemyList[i].respawnTime;
                        this.deadEnemyList[i].health = this.deadEnemyList[i].maxhealth;
                        var index = this.deadEnemyList.indexOf(this.deadEnemyList[i]);
                        this.deadEnemyList.splice(index, 1);
                        
                    }
                }
            }
        }
        catch(err) {
            console.log(err);
        }

        // Enemy auto attack for higher level enemies
        for (var i = 0; i < this.enemies.length; i ++) { 
            if (this.enemyFighting == "" && this.hero.power + this.hero.defense + this.hero.maxhealth < this.enemies[i].power + this.enemies[i].defense + this.enemies[i].maxhealth ) {
                // Checks if hero is within enemies range
                if (this.enemies[i].x >= this.hero.x - this.enemies[i].attackRange && this.enemies[i].x <= this.hero.x + this.enemies[i].attackRange && this.enemies[i].y >= this.hero.y - this.enemies[i].attackRange && this.enemies[i].y <= this.hero.y + this.enemies[i].attackRange) {
                    this.enemyFighting = this.enemies[i];
                    this.enemyFighting.battleMode = true;
                    this.enemyFighting.attackTime = 190;
                    this.hero.attackTime = 90;
                }
            }
        }
        
        
        // Leveling up
        if (this.hero.powerExp >= this.hero.nextPowerLevelExp) {
            this.hero.power += 1;
            this.hero.nextPowerLevelExp = Math.round(((25 + (this.hero.power + 1)) * (this.hero.power + 1) / 1.13767) * this.hero.power);
            this.powerLvAdj += 1;
            this.historyLineTextList.unshift(`Hero's power is now level ${this.hero.power}`);
            this.historyLineTextColor.unshift("Gold");
        }
        if (this.hero.defenseExp >= this.hero.nextDefenseLevelExp) {
            this.hero.defense += 1;
            this.hero.nextDefenseLevelExp = Math.round(((25 + (this.hero.defense + 1)) * (this.hero.defense + 1) / 1.13767) * this.hero.defense);
            this.hero.defenseBenefit = Math.round(this.hero.defense * .2);
            this.hero.defenseTimes = Math.round(this.hero.defense / 4);
            this.defenseLvAdj += 1;
            this.historyLineTextList.unshift(`Hero's defense is now level ${this.hero.defense}`);
            this.historyLineTextColor.unshift("Gold");
        }
        if (this.hero.healthExp >= this.hero.nextHealthLevelExp) {
            this.hero.health += 1;
            this.hero.maxhealth += 1;
            this.hero.nextHealthLevelExp = Math.round(((25 + (this.hero.maxhealth + 1)) * (this.hero.maxhealth + 1) / 1.13767) * this.hero.maxhealth);
            this.historyLineTextList.unshift(`Hero's health is now level ${this.hero.maxhealth}`);
            this.historyLineTextColor.unshift("Gold");
        }


        // Mouse over enemy
        for (var i = 0; i < this.enemies.length; i ++) {
            this.enemies[i].on('pointerover', function(pointer) {
                // this.text.setText(this.attack);
                this.text.setText(`Attack ${this.name}. (Power: ${this.power} Defense: ${this.defense} Health: ${this.health})`);
            })
            this.enemies[i].on('pointerout', function(pointer) {
                this.text.setText('');
            })
        }
        // Hover over
        this.healingPotionPic.on('pointerover', function(pointer) {
            this.text.setText(`Click to drink healing potion`);
        })
        this.healingPotionPic.on('pointerout', function(pointer) {
            this.text.setText('')
        })

        // Updates hero levels on screen

        this.heroPowerLvText.setText(this.hero.power);
        this.heroDefenseLvText.setText(this.hero.defense);
        this.heroHealthLvText.setText(`${this.hero.health} / ${this.hero.maxhealth}`);

        this.heroPowerExpText.setText(`Current Exp: ${this.hero.powerExp}        Next Level: ${this.hero.nextPowerLevelExp}`);
        this.heroDefenseExpText.setText(`Current Exp: ${this.hero.defenseExp}        Next Level: ${this.hero.nextDefenseLevelExp}`);
        this.heroHealthExpText.setText(`Current Exp: ${this.hero.healthExp}        Next Level: ${this.hero.nextHealthLevelExp}`);

        // Updates history log

        this.historyTextLine1.setText(this.historyLineTextList[this.historyTextScroll + 5]).setStyle({font:"16px Ariel Bold", color: this.historyLineTextColor[this.historyTextScroll + 5]});
        this.historyTextLine2.setText(this.historyLineTextList[this.historyTextScroll + 4]).setStyle({font:"16px Ariel Bold", color: this.historyLineTextColor[this.historyTextScroll + 4]});
        this.historyTextLine3.setText(this.historyLineTextList[this.historyTextScroll + 3]).setStyle({font:"16px Ariel Bold", color: this.historyLineTextColor[this.historyTextScroll + 3]});
        this.historyTextLine4.setText(this.historyLineTextList[this.historyTextScroll + 2]).setStyle({font:"16px Ariel Bold", color: this.historyLineTextColor[this.historyTextScroll + 2]});
        this.historyTextLine5.setText(this.historyLineTextList[this.historyTextScroll + 1]).setStyle({font:"16px Ariel Bold", color: this.historyLineTextColor[this.historyTextScroll + 1]});
        this.historyTextLine6.setText(this.historyLineTextList[this.historyTextScroll]).setStyle({font:"16px Ariel Bold", color: this.historyLineTextColor[this.historyTextScroll]});

        this.historyLogCount.setText(`${this.historyLineTextList.length - this.historyTextScroll} / ${this.historyLineTextList.length}`);

        this.coinText.setText(`${this.hero.coins}`);

        this.healingPotionText.setText(`${this.hero.items.healingPotion}`);

        // Scene transitions
        if (this.areaChanges.northChange != "" && this.hero.x >= this.areaChanges.northChange[0] && this.hero.x <= this.areaChanges.northChange[1] & this.hero.y >= this.areaChanges.northChange[2] & this.hero.y <= this.areaChanges.northChange[3]) {
            this.scene.start(this.areaChangeTo.northChange, {hero : this.hero, areaChangeType : "North"});
        }
        else if (this.areaChanges.eastChange != "" && this.hero.x >= this.areaChanges.eastChange[0] && this.hero.x <= this.areaChanges.eastChange[1] & this.hero.y >= this.areaChanges.eastChange[2] & this.hero.y <= this.areaChanges.eastChange[3]) {
            this.scene.start(this.areaChangeTo.eastChange, {hero : this.hero, areaChangeType : "East"});
        }
        else if (this.areaChanges.southChange != "" && this.hero.x >= this.areaChanges.southChange[0] && this.hero.x <= this.areaChanges.southChange[1] & this.hero.y >= this.areaChanges.southChange[2] & this.hero.y <= this.areaChanges.southChange[3]) {
            this.scene.start(this.areaChangeTo.southChange, {hero : this.hero, areaChangeType : "South"});
        }
        else if (this.areaChanges.westChange != "" && this.hero.x >= this.areaChanges.westChange[0] && this.hero.x <= this.areaChanges.westChange[1] & this.hero.y >= this.areaChanges.westChange[2] & this.hero.y <= this.areaChanges.westChange[3]) {
            this.scene.start(this.areaChangeTo.westChange, 
            {hero : this.hero, areaChangeType : "West", historyLogData : this.historyLineTextList, historyLogColor : this.historyLineTextColor});
        }

        // Equipment

        if (this.hero.items.sword == 1 && this.hero.weaponSlot[this.hero.weaponSlotIndex] == "sword") {
            this.sword.x = 690;
            this.sword.y = 405;
            this.zombieAxe.y = -50;
            this.hero.weaponBonus = 5;
        }
        if (this.hero.items.zombieAxe == 1 && this.hero.weaponSlot[this.hero.weaponSlotIndex] == "zombieAxe") {
            this.zombieAxe.x = 690;
            this.zombieAxe.y = 405;
            this.sword.y = -50;
            this.hero.weaponBonus = 1;
        }
        if (this.hero.weaponSlot[this.hero.weaponSlotIndex] == "") {
            this.sword.y = -50;
            this.zombieAxe.y = -50;
            this.hero.weaponBonus = 0;
        }

        if (this.hero.items.helmet == 1 && this.hero.helmetSlot[this.hero.helmetSlotIndex] == "helmet") {
            this.helmet.x = 740;
            this.helmet.y = 362;
            this.hero.helmetBonus = 3;
        }
        else if (this.hero.helmetSlot[this.hero.helmetSlotIndex] == "") {
            this.helmet.y = -50;
            this.hero.helmetBonus = 0;
        }

        if (this.hero.items.shield == 1 && this.hero.shieldSlot[this.hero.shieldSlotIndex] == "shield") {
            this.shield.x = 793;
            this.shield.y = 405;
            this.dragonShield.y = -50;
            this.hero.shieldBonus = 5;
        }
        else if (this.hero.items.dragonShield == 1 && this.hero.shieldSlot[this.hero.shieldSlotIndex] == "dragonShield") {
            this.dragonShield.x = 793;
            this.dragonShield.y = 405;
            this.shield.y = -50;
            this.hero.shieldBonus = 2;
        }
        else if (this.hero.shieldSlot[this.hero.shieldSlotIndex] == "") {
            this.shield.y = -50;
            this.dragonShield.y = -50;
            this.hero.shieldBonus = 0;
        }

        if (this.hero.items.chainmail == 1 && this.hero.bodySlot[this.hero.bodySlotIndex] == "chainmail") {
            this.chainmail.x = 740;
            this.chainmail.y = 405;
            this.hero.bodyBonus = 7;
        }
        else if (this.hero.bodySlot[this.hero.bodySlotIndex] == "") {
            this.chainmail.y = -50;
            this.hero.bodyBonus = 0;
        }

        this.equipmentPowerBonus.setText(`Power: +${this.hero.weaponBonus}`);
        this.totalDefenseBonus = this.hero.helmetBonus + this.hero.shieldBonus + this.hero.bodyBonus; 
        this.equipmentDefenseBonus.setText(`Defense: +${this.totalDefenseBonus}`)

        // //Equipment
        // this.sword.on('pointerover', function(pointer) {
        //     this.text.setText(`Sword. Click to switch/ remove`);
        // })
        // this.sword.on('pointerout', function(pointer) {
        //     this.text.setText(``);
        // })

        // this.zombieAxe.on('pointerover', function(pointer) {
        //     this.text.setText(`Zombie Axe. Click to switch/ remove`);
        // })
        // this.zombieAxe.on('pointerout', function(pointer) {
        //     this.text.setText(``);
        // })

        // Changes radio button location in attack stance section and adjusts levels
        if (this.hero.attackStance == "Aggressive") {
            this.radioButton.x = 552;
            this.radioButton.y = 530;
            this.hero.powerLvAdj = this.hero.power + 3 + this.hero.weaponBonus;
            this.hero.defenseLvAdj = Math.max(this.hero.defense - 3, 1) + this.totalDefenseBonus;
        }
        else if (this.hero.attackStance == "Defensive") {
            this.radioButton.x = 692;
            this.radioButton.y = 530;
            this.hero.powerLvAdj = Math.max(this.hero.power - 3, 1) + this.hero.weaponBonus;
            this.hero.defenseLvAdj = this.hero.defense + 3 + this.totalDefenseBonus;
        }
        else if (this.hero.attackStance == "Normal") {
            this.radioButton.x = 552;
            this.radioButton.y = 572;
            this.hero.powerLvAdj = this.hero.power  + this.hero.weaponBonus;
            this.hero.defenseLvAdj = this.hero.defense + this.totalDefenseBonus;
        }
        // console.log("Adjusted Power Level", this.hero.powerLvAdj )
        // console.log("Adjusted Defense Level", this.hero.defenseLvAdj )

        // socket.emit('playerStats', this.hero);

        if (this.key != "Main") {
            this.minuteTimer2 = Date.now();
        // runs every minute
            if (this.minuteTimer2 - 60000 >= this.minuteTimer) {
                console.log("1 minute passed")
                this.minuteTimer = Date.now();
                if (this.hero.health < this.hero.maxhealth) {
                    this.hero.health += 1;
                }
                for (var i = 0; i < this.enemies.length; i ++) {
                    if (this.enemies[i].health < this.enemies[i].maxhealth) {
                        this.enemies[i].health += 1
                    }
                }
            }

            this.minuteTimer3 = Date.now();
            if (this.minuteTimer3 - 3000 >= this.minuteTimer) {
                socket.emit('playerStats', this.playerStats); // sends to server
                this.minuteTimer4 = Date.now();
                // console.log(this.playerStats);
            }
        }
        

    }
    

}

function enemyClicked(mouseClickX, mouseClickY, enemy, gameScreen) {
    if (mouseClickX >= enemy.x - (enemy.width / 2) && mouseClickX <= enemy.x + (enemy.width / 2) && mouseClickY >= enemy.y - (enemy.height / 2) && mouseClickY <= enemy.y + (enemy.height / 2) ) {
        return true;
    }
    else if (mouseClickX < gameScreen && mouseClickX > 0 && mouseClickY < gameScreen && mouseClickY > 0){ // Prevents battle mode being changed by clicks outside game screen
        // this.battleMode = false;
        return false;
    }
}

// Updates attack stance
function attackStance(mouseClickX, mouseClickY) {
    if (mouseClickX >= 540 && mouseClickX <=565 && mouseClickY >= 522 && mouseClickY <= 545) {
        return "Aggressive";
    }
    else if (mouseClickX >= 682 && mouseClickX <= 707 && mouseClickY >= 522 && mouseClickY <= 545) {
        return "Defensive";
    }
    else if (mouseClickX >= 540 && mouseClickX <=565 && mouseClickY >= 564 && mouseClickY <= 591) {
        return "Normal";
    }
}

function onsocketConnected () {
	console.log("connected to server"); 
}