class Area106_111 extends BaseScene {
    constructor() {
        super(`Area106_111`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_106_111.png';
        super.preload(`area106_111`, area);
    }

    create() {
        var currArea = [106, 111];
        var sceneBorders = {x: [20, 320], y: [280, 470]}; // Scene dimensions
        var areaChanges = {
            northChange : "", 
            eastChange : "", 
            southChange : [
                180,
                335, 
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

        var Enemy1 = {class: Wizard, name: "wizard", walkAreaX: [80, 140], walkAreaY: [280, 330], x: 100, y: 300}
        var Enemy2 = {class: Wizard, name: "wizard", walkAreaX: [300, 400], walkAreaY: [280, 400], x: 350, y: 300}
        var Enemy3 = {class: Wizard, name: "wizard", walkAreaX: [50, 200], walkAreaY: [350, 450], x: 150, y: 370}
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}