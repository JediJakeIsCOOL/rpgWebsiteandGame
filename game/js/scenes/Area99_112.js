class Area99_112 extends BaseScene {
    constructor() {
        super(`Area99_112`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_99_112.png';
        super.preload(`area99_112`, area);
    }

    create() {
        var currArea = [99, 112];
        var sceneBorders = {x: [20, 480], y: [105, 400]}; // Scene dimensions
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

        var Enemy1 = {class: Dragon, name: "dragon", walkAreaX: [80, 140], walkAreaY: [200, 300], x: 90, y: 250}
        var Enemy2 = {class: Dragon, name: "dragon", walkAreaX: [300, 350], walkAreaY: [330, 380], x: 320, y: 350}
        var Enemy3 = "None"
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}