class Area99_113 extends BaseScene {
    constructor() {
        super(`Area99_113`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_99_113.png';
        super.preload(`area99_113`, area);
    }

    create() {
        var currArea = [99, 113];
        var sceneBorders = {x: [20, 480], y: [105, 365]}; // Scene dimensions
        var areaChanges = {
            northChange : [165,
                315, 
                sceneBorders.y[0] - 30,
                sceneBorders.y[0] + 30], 
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

        var Enemy1 = {class: Dragon, name: "dragon", walkAreaX: [50, 110], walkAreaY: [110, 150], x: 70, y: 80}
        var Enemy2 = {class: Dragon, name: "dragon", walkAreaX: [300, 380], walkAreaY: [330, 260], x: 220, y: 230}
        var Enemy3 = {class: Dragon, name: "dragon", walkAreaX: [100, 160], walkAreaY: [320, 360], x: 130, y: 350}
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}