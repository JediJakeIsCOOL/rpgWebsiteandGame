var loadData;

$(document).ready(function(){
    var url = '/characterStats';

    console.log('Check');
    // Accesses our database
    var success = function(res){
        console.log("API Response ", res)
        loadData = res;
        console.log("Username", loadData['userData'][0]["username"])
        $("#username").html(loadData['userData'][0]["username"]);

    }
    $.ajax({
        type: 'POST',
        url: url,
        success: success,
        dataType: 'json'
    });
})


// var helmetSlot1 = [""];
// var bodySlot = [""];

// if (loadData['userData'][0]["helmet"] == 1) {
//     helmetSlot1.push("helmet");
// }

class Hero extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        this.scene = config.scene;
        this.scene.add.existing(this);

        this.name = "Hero";
        this.username = loadData['userData'][0]["username"];
        this.power = loadData['userData'][0]["power"];
        this.defense = loadData['userData'][0]["defense"];
        this.health = loadData['userData'][0]["health"];
        this.maxhealth = loadData['userData'][0]["maxhealth"];
        this.speed = 2;
        // this.powerExp = Math.round((25 + (this.power)) * (this.power) / 1.13767) * (this.power - 1);
        this.powerExp = loadData['userData'][0]["powerexp"];
        this.defenseExp =  loadData['userData'][0]["defenseexp"];
        this.healthExp = loadData['userData'][0]["healthexp"];
        this.nextHealthLevelExp = Math.round(((25 + (this.maxhealth + 1)) * (this.maxhealth + 1) / 1.13767) * this.maxhealth);
        this.nextPowerLevelExp = Math.round(((25 + (this.power + 1)) * (this.power + 1) / 1.13767) * this.power);
        this.nextDefenseLevelExp = Math.round(((25 + (this.defense + 1)) * (this.defense + 1) / 1.13767) * this.defense);
        this.coins = loadData['userData'][0]["coins"];
        this.attackRange = 50;
        this.battleMode = false;
        this.attackTime = 190;
        this.items = {
            "healingPotion" : loadData['userData'][0]["healingpotion"],
            "helmet" : loadData['userData'][0]["helmet"],
            "sword" : loadData['userData'][0]["sword"],
            "shield" : loadData['userData'][0]["shield"],
            "chainmail" : loadData['userData'][0]["chainmail"],
            "zombieAxe" : loadData['userData'][0]["zombieaxe"],
            "dragonShield" : loadData['userData'][0]["dragonshield"],
        }
        this.frozen = false;
        this.healing = false;
        this.specialAttackPerc = .2;
        this.attackStance = "Aggressive";
        this.powerLvAdj = this.power + 3; // With stance bonuses
        this.defenseLvAdj = this.defense - 3;
        this.defenseBenefit = Math.round(this.defenseLvAdj * .2);
        this.defenseTimes = Math.round(this.defenseLvAdj / 4);
        this.helmetSlot = [""];
        this.helmetSlotIndex = Number(loadData['userData'][0]["helmetslotindex"]);
        this.helmetBonus = 0;
        this.bodySlot = [""];
        this.bodySlotIndex = Number(loadData['userData'][0]["bodyslotindex"]);
        this.bodyBonus = 0;
        this.weaponSlot = [""];
        this.weaponSlotIndex = Number(loadData['userData'][0]["weaponslotindex"]);
        this.weaponBonus = 0;
        this.shieldSlot = [""];
        this.shieldSlotIndex = Number(loadData['userData'][0]["shieldslotindex"]);
        this.shieldBonus = 0;
        this.currentArea = loadData['userData'][0]["currentarea"]

        
    }    
}
