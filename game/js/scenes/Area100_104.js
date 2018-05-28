class Area100_104 extends BaseScene {
    constructor() {
        super(`Area100_104`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_100_104.png';
        super.preload(`area100_104`, area);
    }

    create() {
        var currArea = [100, 104];
        var sceneBorders = {x: [90, 342], y: [20, 480]}; // Scene dimensions
        var areaChanges = {
            northChange : [
                sceneBorders.x[0],
                sceneBorders.x[1], 
                sceneBorders.y[0] - 30,
                sceneBorders.y[0] + 30], 
            eastChange : "", 
            southChange : [sceneBorders.x[0],
                sceneBorders.x[1], 
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

        var Enemy1 = {class: Shadow, name: "shadow", walkAreaX: [140, 270], walkAreaY: [100, 300], x: 150, y: 150}
        var Enemy2 = {class: Shadow, name: "shadow", walkAreaX: [240, 320], walkAreaY: [200, 400], x: 300, y: 250}
        var Enemy3 = {class: Shadow, name: "shadow", walkAreaX: [100, 200], walkAreaY: [350, 450], x: 150, y: 350}
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}