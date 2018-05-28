class Area101_114 extends BaseScene {
    constructor() {
        super(`Area101_114`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_101_114.png';
        super.preload(`area101_114`, area);
    }

    create() {
        var currArea = [101, 114];
        var sceneBorders = {x: [20, 340], y: [100, 480]}; // Scene dimensions
        var areaChanges = {
            northChange : "", 
            eastChange : "", 
            southChange : [sceneBorders.x[0],
            sceneBorders.x[1], 
                sceneBorders.y[1] - 30,
                sceneBorders.y[1] + 30], 
            westChange : [sceneBorders.x[0] - 30,
            sceneBorders.x[0] + 30, 
            sceneBorders.y[0],
            sceneBorders.y[1]]
        }; // Defines part of scene where the user transitions to other scene
        var areaChangeTo = {
            northChange : `Area${currArea[0]}_${currArea[1] + 1}`, 
            eastChange : `Area${currArea[0] + 1}_${currArea[1]}`,
            southChange : `Area${currArea[0]}_${currArea[1] - 1}`, 
            westChange : `Area${currArea[0] - 1}_${currArea[1]}`
        }

        var Enemy1 = {class: Dragon, name: "dragon", walkAreaX: [70, 300], walkAreaY: [150, 350], x: 200, y: 270}
        var Enemy2 = "None"
        var Enemy3 = "None"
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}