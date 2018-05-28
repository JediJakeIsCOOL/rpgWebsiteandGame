class Area100_112 extends BaseScene {
    constructor() {
        super(`Area100_112`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_100_112.png';
        super.preload(`area100_112`, area);
    }

    create() {
        var currArea = [100, 112];
        var sceneBorders = {x: [20, 480], y: [105, 425]}; // Scene dimensions
        var areaChanges = {
            northChange : "", 
            eastChange : [sceneBorders.x[1] - 30,
            sceneBorders.x[1] + 30, 
            sceneBorders.y[0],
            sceneBorders.y[1]], 
            southChange : "", 
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

        var Enemy1 = {class: Dragon, name: "dragon", walkAreaX: [60, 110], walkAreaY: [150, 200], x: 80, y: 160}
        var Enemy2 = {class: Dragon, name: "dragon", walkAreaX: [300, 380], walkAreaY: [110, 170], x: 310, y: 160}
        var Enemy3 = {class: Dragon, name: "dragon", walkAreaX: [200, 280], walkAreaY: [310, 390], x: 220, y: 340}
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}