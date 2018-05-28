class Area105_110 extends BaseScene {
    constructor() {
        super(`Area105_110`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_105_110.png';
        super.preload(`area105_110`, area);
    }

    create() {
        var currArea = [105, 110];
        var sceneBorders = {x: [20, 480], y: [90, 460]}; // Scene dimensions
        var areaChanges = {
            northChange : "", 
            eastChange : [sceneBorders.x[1] - 30,
                sceneBorders.x[1] + 30, 
                sceneBorders.y[0],
                sceneBorders.y[1]], 
            southChange : [
                200,
                270, 
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

        var Enemy1 = {class: Wizard, name: "wizard", walkAreaX: [50, 200], walkAreaY: [100, 300], x: 150, y: 150}
        var Enemy2 = {class: Wizard, name: "wizard", walkAreaX: [300, 400], walkAreaY: [200, 400], x: 350, y: 250}
        var Enemy3 = {class: Wizard, name: "wizard", walkAreaX: [100, 200], walkAreaY: [350, 450], x: 150, y: 380}
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}