class Area100_105 extends BaseScene {
    constructor() {
        super(`Area100_105`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_100_105.png';
        super.preload(`area100_105`, area);
    }

    create() {
        var currArea = [100, 105];
        var sceneBorders = {x: [90, 385], y: [220, 480]}; // Scene dimensions
        var areaChanges = {
            northChange : "", 
            eastChange : [sceneBorders.x[1] - 30,
            sceneBorders.x[1] + 30, 
            185,
            255], 
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

        var Enemy1 = {class: Shadow, name: "shadow", walkAreaX: [130, 200], walkAreaY: [230, 320], x: 150, y: 250}
        var Enemy2 = {class: Shadow, name: "shadow", walkAreaX: [260, 380], walkAreaY: [340, 460], x: 350, y: 380}
        var Enemy3 = "None"
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}