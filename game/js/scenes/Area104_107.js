class Area104_107 extends BaseScene {
    constructor() {
        super(`Area104_107`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_104_107.png';
        super.preload(`area104_107`, area);
    }

    create() {
        var currArea = [104, 107];
        var sceneBorders = {x: [20, 470], y: [20, 480]}; // Scene dimensions
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
                230,
                290]
        }; // Defines part of scene where the user transitions to other scene
        var areaChangeTo = {
            northChange : `Area${currArea[0]}_${currArea[1] + 1}`, 
            eastChange : `Area${currArea[0] + 1}_${currArea[1]}`,
            southChange : `Area${currArea[0]}_${currArea[1] - 1}`, 
            westChange : `Area${currArea[0] - 1}_${currArea[1]}`
        }

        var Enemy1 = {class: Ranger, name: "ranger", walkAreaX: [100, 200], walkAreaY: [100, 300], x: 150, y: 150}
        var Enemy2 = "None"
        var Enemy3 = "None"
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}