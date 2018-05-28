class Area99_114 extends BaseScene {
    constructor() {
        super(`Area99_114`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_99_114.png';
        super.preload(`area99_114`, area);
    }

    create() {
        var currArea = [99, 114];
        var sceneBorders = {x: [155, 367], y: [95, 430]}; // Scene dimensions
        var areaChanges = {
            northChange : "", 
            eastChange : "", 
            southChange : [165,
                315, 
                sceneBorders.y[1] - 30,
                sceneBorders.y[1] + 30], 
            westChange : ""
        }; // Defines part of scene where the user transitions to other scene
        var areaChangeTo = {
            northChange : `Area${currArea[0]}_${currArea[1] + 1}`, 
            eastChange : `Area${currArea[0] + 1}_${currArea[1]}`,
            southChange : `Area${currArea[0]}_${currArea[1] - 1}`, 
            westChange : `Area${currArea[0] - 1}_${currArea[1]}`
        }

        var Enemy1 = {class: DragonKing, name: "dragonKing", walkAreaX: [220, 250], walkAreaY: [220, 250], x: 230, y: 230}
        var Enemy2 = "None"
        var Enemy3 = "None"
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}