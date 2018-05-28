class Area104_110 extends BaseScene {
    constructor() {
        super(`Area104_110`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_104_110.png';
        super.preload(`area104_110`, area);
    }

    create() {
        var currArea = [104, 110];
        var sceneBorders = {x: [170, 480], y: [90, 460]}; // Scene dimensions
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

        var Enemy1 = {class: Wizard, name: "wizard", walkAreaX: [180, 270], walkAreaY: [100, 300], x: 200, y: 150}
        var Enemy2 = {class: Wizard, name: "wizard", walkAreaX: [300, 400], walkAreaY: [200, 400], x: 350, y: 250}
        var Enemy3 = {class: Wizard, name: "wizard", walkAreaX: [220, 290], walkAreaY: [350, 450], x: 250, y: 380}
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}