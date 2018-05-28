class Area101_108 extends BaseScene {
    constructor() {
        super(`Area101_108`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_101_108.png';
        super.preload(`area101_108`, area);
    }

    create() {
        var currArea = [101, 108];
        var sceneBorders = {x: [20, 480], y: [200,295]}; // Scene dimensions
        var areaChanges = {
            northChange : "", 
            eastChange : 
                [sceneBorders.x[1] - 30,
                sceneBorders.x[1] + 30, 
                200,
                295], 
            southChange : "", 
            westChange : [
                sceneBorders.x[0] - 30,
                sceneBorders.x[0] + 30, 
                200,
                295]
        }; // Defines part of scene where the user transitions to other scene
        var areaChangeTo = {
            northChange : `Area${currArea[0]}_${currArea[1] + 1}`, 
            eastChange : `Area${currArea[0] + 1}_${currArea[1]}`,
            southChange : `Area${currArea[0]}_${currArea[1] - 1}`, 
            westChange : `Area${currArea[0] - 1}_${currArea[1]}`
        }

        var Enemy1 = {class: Zombie, name: "zombie", walkAreaX: [100, 400], walkAreaY: [200, 280], x: 250, y: 250}
        var Enemy2 = "None"
        var Enemy3 = "None"
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}