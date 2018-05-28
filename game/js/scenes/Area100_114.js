class Area100_114 extends BaseScene {
    constructor() {
        super(`Area100_114`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_100_114.png';
        super.preload(`area100_114`, area);
    }

    create() {
        var currArea = [100, 114];
        var sceneBorders = {x: [35, 480], y: [125, 480]}; // Scene dimensions
        var areaChanges = {
            northChange : "", 
            eastChange : [sceneBorders.x[1] - 30,
            sceneBorders.x[1] + 30, 
            sceneBorders.y[0],
            sceneBorders.y[1]], 
            southChange : [sceneBorders.x[0],
            sceneBorders.x[1], 
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

        var Enemy1 = {class: Dragon, name: "dragon", walkAreaX: [70, 300], walkAreaY: [150, 350], x: 280, y: 330}
        var Enemy2 = "None"
        var Enemy3 = "None"
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}