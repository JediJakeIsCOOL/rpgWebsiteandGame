class Area108_110 extends BaseScene {
    constructor() {
        super(`Area108_110`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_108_110.png';
        super.preload(`area108_110`, area);
    }

    create() {
        var currArea = [108, 110];
        var sceneBorders = {x: [20, 325], y: [90, 430]}; // Scene dimensions
        var areaChanges = {
            northChange : "", 
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

        var Enemy1 = {class: Wizard, name: "wizard", walkAreaX: [40, 250], walkAreaY: [100, 300], x: 120, y: 150}
        var Enemy2 = {class: Wizard, name: "wizard", walkAreaX: [200, 300], walkAreaY: [200, 400], x: 250, y: 250}
        var Enemy3 = {class: Wizard, name: "wizard", walkAreaX: [80, 190], walkAreaY: [350, 450], x: 100, y: 380}
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}