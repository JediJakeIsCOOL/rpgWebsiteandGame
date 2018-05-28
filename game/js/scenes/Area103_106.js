class Area103_106 extends BaseScene {
    constructor() {
        super(`Area103_106`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_103_106.png';
        super.preload(`area103_106`, area);
    }

    create() {
        var currArea = [103, 106];
        var sceneBorders = {x: [20, 199], y: [20, 365]}; // Scene dimensions
        var areaChanges = {
            northChange : [
                sceneBorders.x[0],
                sceneBorders.x[1], 
                sceneBorders.y[0] - 30,
                sceneBorders.y[0] + 30], 
            eastChange : "", 
            southChange : "", 
            westChange : 
                [sceneBorders.x[0] - 30,
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

        var Enemy1 = {class: Ranger, name: "ranger", walkAreaX: [150, 200], walkAreaY: [50, 150], x: 170, y: 100}
        var Enemy2 = {class: Shadow, name: "shadow", walkAreaX: [50, 200], walkAreaY: [200, 350], x: 100, y: 250}
        var Enemy3 = "None"
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}