class Area98_113 extends BaseScene {
    constructor() {
        super(`Area98_113`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_98_113.png';
        super.preload(`area98_113`, area);
    }

    create() {
        var currArea = [98, 113];
        var sceneBorders = {x: [60, 480], y: [20, 370]}; // Scene dimensions
        var areaChanges = {
            northChange : [sceneBorders.x[0],
            sceneBorders.x[1], 
            sceneBorders.y[0] - 30,
            sceneBorders.y[0] + 30], 
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

        var Enemy1 = {class: Dragon, name: "dragon", walkAreaX: [70, 110], walkAreaY: [60, 110], x: 100, y: 100}
        var Enemy2 = {class: Dragon, name: "dragon", walkAreaX: [200, 280], walkAreaY: [210, 260], x: 250, y: 245}
        var Enemy3 = {class: Dragon, name: "dragon", walkAreaX: [100, 160], walkAreaY: [330, 365], x: 150, y: 390}
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}