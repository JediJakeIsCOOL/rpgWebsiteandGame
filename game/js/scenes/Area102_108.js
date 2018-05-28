class Area102_108 extends BaseScene {
    constructor() {
        super(`Area102_108`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_102_108.png';
        super.preload(`area102_108`, area);
    }

    create() {
        var currArea = [102, 108];
        var sceneBorders = {x: [168, 480], y: [180, 480]}; // Scene dimensions
        var areaChanges = {
            northChange : "", 
            eastChange : 
                [sceneBorders.x[1] - 30,
                sceneBorders.x[1] + 30, 
                sceneBorders.y[0],
                sceneBorders.y[1]], 
            southChange : [
                sceneBorders.x[0],
                sceneBorders.x[1], 
                sceneBorders.y[1] - 30,
                sceneBorders.y[1] + 30], 
            westChange : [
                sceneBorders.x[0] - 30,
                sceneBorders.x[0] + 30, 
                200,
                300]
        }; // Defines part of scene where the user transitions to other scene
        var areaChangeTo = {
            northChange : `Area${currArea[0]}_${currArea[1] + 1}`, 
            eastChange : `Area${currArea[0] + 1}_${currArea[1]}`,
            southChange : `Area${currArea[0]}_${currArea[1] - 1}`, 
            westChange : `Area${currArea[0] - 1}_${currArea[1]}`
        }

        var Enemy1 = {class: Shadow, name: "shadow", walkAreaX: [200, 290], walkAreaY: [190, 300], x: 250, y: 150}
        var Enemy2 = {class: Shadow, name: "shadow", walkAreaX: [300, 390], walkAreaY: [200, 400], x: 350, y: 250}
        var Enemy3 = {class: Shadow, name: "shadow", walkAreaX: [400, 470], walkAreaY: [50, 180], x: 450, y: 150}
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}