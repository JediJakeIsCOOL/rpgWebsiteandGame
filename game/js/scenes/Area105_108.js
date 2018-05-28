class Area105_108 extends BaseScene {
    constructor() {
        super(`Area105_108`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_105_108.png';
        super.preload(`area105_108`, area);
    }

    create() {
        var currArea = [105, 108];
        var sceneBorders = {x: [20, 470], y: [180, 480]}; // Scene dimensions
        var areaChanges = {
            northChange : [
                200,
                270, 
                sceneBorders.y[0] - 30,
                sceneBorders.y[0] + 30], 
            eastChange : "", 
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

        var Enemy1 = {class: Ranger, name: "ranger", walkAreaX: [100, 200], walkAreaY: [190, 300], x: 150, y: 250}
        var Enemy2 = {class: Ranger, name: "ranger", walkAreaX: [300, 400], walkAreaY: [250, 400], x: 350, y: 290}
        var Enemy3 = "None"
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}