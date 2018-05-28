class Area102_106 extends BaseScene {
    constructor() {
        super(`Area102_106`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_102_106.png';
        super.preload(`area102_106`, area);
    }

    create() {
        var currArea = [102, 106];
        var sceneBorders = {x: [190, 480], y: [20, 360]}; // Scene dimensions
        var areaChanges = {
            northChange : [
                sceneBorders.x[0],
                sceneBorders.x[1] - 30, 
                sceneBorders.y[0] - 30,
                sceneBorders.y[0] + 30], 
            eastChange : 
                [sceneBorders.x[1] - 30,
                sceneBorders.x[1] + 30, 
                sceneBorders.y[0],
                sceneBorders.y[1]], 
            southChange : [
                135,
                280, 
                sceneBorders.y[1] - 30,
                sceneBorders.y[1] + 30], 
            westChange : 
                ""
        }; // Defines part of scene where the user transitions to other scene
        var areaChangeTo = {
            northChange : `Area${currArea[0]}_${currArea[1] + 1}`, 
            eastChange : `Area${currArea[0] + 1}_${currArea[1]}`,
            southChange : `Area${currArea[0]}_${currArea[1] - 1}`, 
            westChange : `Area${currArea[0] - 1}_${currArea[1]}`
        }

        var Enemy1 = {class: Shadow, name: "shadow", walkAreaX: [200, 250], walkAreaY: [100, 300], x: 220, y: 150}
        var Enemy2 = {class: Shadow, name: "shadow", walkAreaX: [300, 400], walkAreaY: [50, 200], x: 350, y: 180}
        var Enemy3 = {class: Shadow, name: "shadow", walkAreaX: [270, 350], walkAreaY: [250, 350], x: 290, y: 320}
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}