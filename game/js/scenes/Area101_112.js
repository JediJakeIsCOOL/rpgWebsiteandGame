class Area101_112 extends BaseScene {
    constructor() {
        super(`Area101_112`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_101_112.png';
        super.preload(`area101_112`, area);
    }

    create() {
        var currArea = [101, 112];
        var sceneBorders = {x: [20, 410], y: [20, 430]}; // Scene dimensions
        var areaChanges = {
            northChange : [sceneBorders.x[0],
                sceneBorders.x[1], 
                sceneBorders.y[0] - 30,
                sceneBorders.y[0] + 30], 
            eastChange : "", 
            southChange : [170,
                370, 
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

        var Enemy1 = {class: Dragon, name: "dragon", walkAreaX: [50, 110], walkAreaY: [60, 110], x: 70, y: 80}
        var Enemy2 = {class: Dragon, name: "dragon", walkAreaX: [200, 280], walkAreaY: [210, 260], x: 220, y: 230}
        var Enemy3 = {class: Dragon, name: "dragon", walkAreaX: [100, 160], walkAreaY: [350, 400], x: 130, y: 370}
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}