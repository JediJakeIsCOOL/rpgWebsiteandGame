class Area100_108 extends BaseScene {
    constructor() {
        super(`Area100_108`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_100_108.png';
        super.preload(`area100_108`, area);
    }

    create() {
        var currArea = [100, 108];
        var sceneBorders = {x: [20, 480], y: [200, 295]}; // Scene dimensions
        var areaChanges = {
            northChange : "", 
            eastChange : 
                [sceneBorders.x[1] - 30,
                sceneBorders.x[1] + 30, 
                200,
                320], 
            southChange : "", 
            westChange : ""
        }; // Defines part of scene where the user transitions to other scene
        var areaChangeTo = {
            northChange : `Area${currArea[0]}_${currArea[1] + 1}`, 
            eastChange : `Area${currArea[0] + 1}_${currArea[1]}`,
            southChange : `Area${currArea[0]}_${currArea[1] - 1}`, 
            westChange : `Area${currArea[0] - 1}_${currArea[1]}`
        }

        var Enemy1 = {class: Zombie, name: "zombie", walkAreaX: [100, 400], walkAreaY: [200, 280], x: 250, y: 250}
        var Enemy2 = "None"
        var Enemy3 = "None"
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}