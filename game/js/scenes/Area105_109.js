class Area105_109 extends BaseScene {
    constructor() {
        super(`Area105_109`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_105_109.png';
        super.preload(`area105_109`, area);
    }

    create() {
        var currArea = [105, 109];
        var sceneBorders = {x: [20, 470], y: [205, 480]}; // Scene dimensions
        var areaChanges = {
            northChange : [
                200,
                270, 
                sceneBorders.y[0] - 30,
                sceneBorders.y[0] + 30], 
            eastChange : "", 
            southChange : [
                200,
                270, 
                sceneBorders.y[1] - 30,
                sceneBorders.y[1] + 30], 
            westChange : ""
        }; // Defines part of scene where the user transitions to other scene
        var areaChangeTo = {
            northChange : `Area${currArea[0]}_${currArea[1] + 1}`, 
            eastChange : `Area${currArea[0] + 1}_${currArea[1]}`,
            southChange : `Area${currArea[0]}_${currArea[1] - 1}`, 
            westChange : `Area${currArea[0] - 1}_${currArea[1]}`
        }

        var Enemy1 = {class: Wizard, name: "wizard", walkAreaX: [50, 250], walkAreaY: [210, 310], x: 150, y: 250}
        var Enemy2 = {class: Wizard, name: "wizard", walkAreaX: [300, 400], walkAreaY: [250, 400], x: 350, y: 290}
        var Enemy3 = {class: Wizard, name: "wizard", walkAreaX: [100, 200], walkAreaY: [350, 450], x: 150, y: 350}
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}