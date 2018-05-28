class Area98_112 extends BaseScene {
    constructor() {
        super(`Area98_112`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_98_112.png';
        super.preload(`area98_112`, area);
    }

    create() {
        var currArea = [98, 112];
        var sceneBorders = {x: [60, 480], y: [105, 400]}; // Scene dimensions
        var areaChanges = {
            northChange : "", 
            eastChange : [sceneBorders.x[1] - 30,
            sceneBorders.x[1] + 30, 
            sceneBorders.y[0],
            sceneBorders.y[1]], 
            southChange : "", 
            westChange : ""
        }; // Defines part of scene where the user transitions to other scene
        var areaChangeTo = {
            northChange : `Area${currArea[0]}_${currArea[1] + 1}`, 
            eastChange : `Area${currArea[0] + 1}_${currArea[1]}`,
            southChange : `Area${currArea[0]}_${currArea[1] - 1}`, 
            westChange : `Area${currArea[0] - 1}_${currArea[1]}`
        }

        var Enemy1 = {class: Dragon, name: "dragon", walkAreaX: [70, 110], walkAreaY: [150, 200], x: 180, y: 160}
        var Enemy2 = {class: Dragon, name: "dragon", walkAreaX: [120, 160], walkAreaY: [310, 380], x: 180, y: 360}
        var Enemy3 = "None"
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}