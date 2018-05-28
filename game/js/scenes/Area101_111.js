class Area101_111 extends BaseScene {
    constructor() {
        super(`Area101_111`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_101_111.png';
        super.preload(`area101_111`, area);
    }

    create() {
        var currArea = [101, 111];
        var sceneBorders = {x: [50, 480], y: [125, 440]}; // Scene dimensions
        var areaChanges = {
            northChange : [190,
                310, 
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

        var Enemy1 = {class: Dragon, name: "dragon", walkAreaX: [70, 180], walkAreaY: [150, 300], x: 180, y: 150}
        var Enemy2 = "None"
        var Enemy3 = "None"
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}