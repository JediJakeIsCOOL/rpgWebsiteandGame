class Area98_114 extends BaseScene {
    constructor() {
        super(`Area98_114`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_98_114.png';
        super.preload(`area98_114`, area);
    }

    create() {
        var currArea = [98, 114];
        var sceneBorders = {x: [60, 470], y: [95, 480]}; // Scene dimensions
        var areaChanges = {
            northChange : "", 
            eastChange : "", 
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

        var Enemy1 = {class: Dragon, name: "dragon", walkAreaX: [70, 180], walkAreaY: [150, 300], x: 180, y: 150}
        var Enemy2 = "None"
        var Enemy3 = "None"
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}