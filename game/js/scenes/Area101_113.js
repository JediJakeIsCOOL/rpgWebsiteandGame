class Area101_113 extends BaseScene {
    constructor() {
        super(`Area101_113`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_101_113.png';
        super.preload(`area101_113`, area);
    }

    create() {
        var currArea = [101, 113];
        var sceneBorders = {x: [20, 360], y: [20, 480]}; // Scene dimensions
        var areaChanges = {
            northChange : [sceneBorders.x[0],
                sceneBorders.x[1], 
                sceneBorders.y[0] - 30,
                sceneBorders.y[0] + 30], 
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

        var Enemy1 = {class: Dragon, name: "dragon", walkAreaX: [150, 210], walkAreaY: [60, 110], x: 170, y: 80}
        var Enemy2 = {class: Dragon, name: "dragon", walkAreaX: [200, 280], walkAreaY: [310, 360], x: 220, y: 330}
        var Enemy3 = "None"
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}