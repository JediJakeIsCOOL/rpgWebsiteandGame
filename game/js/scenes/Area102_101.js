class Area102_101 extends BaseScene {
    constructor() {
        super(`Area102_101`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_102_101.png';
        super.preload(`area102_101`, area);
    }

    create() {
        var currArea = [102, 101];
        var sceneBorders = {x: [70, 425], y: [120, 440]}; // Scene dimensions
        var areaChanges = {
            northChange : "", 
            eastChange : "", 
            southChange : "", 
            westChange : [
                sceneBorders.x[0] - 30,
                sceneBorders.x[0] + 30, 
                220, 
                275]
        }; // Defines part of scene where the user transitions to other scene
        var areaChangeTo = {
            northChange : `Area${currArea[0]}_${currArea[1] + 1}`, 
            eastChange : `Area${currArea[0] + 1}_${currArea[1]}`,
            southChange : `Area${currArea[0]}_${currArea[1] - 1}`, 
            westChange : `Area${currArea[0] - 1}_${currArea[1]}`
        }

        var Enemy1 = {class: Shadow, name: "shadow", walkAreaX: [100, 200], walkAreaY: [130, 300], x: 150, y: 150}
        var Enemy2 = {class: Shadow, name: "shadow", walkAreaX: [300, 400], walkAreaY: [200, 400], x: 350, y: 250}
        var Enemy3 = {class: Shadow, name: "shadow", walkAreaX: [100, 200], walkAreaY: [350, 430], x: 150, y: 370}
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}