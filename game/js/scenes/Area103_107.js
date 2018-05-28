class Area103_107 extends BaseScene {
    constructor() {
        super(`Area103_107`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_103_107.png';
        super.preload(`area103_107`, area);
    }

    create() {
        var currArea = [103, 107];
        var sceneBorders = {x: [20, 436], y: [20, 480]}; // Scene dimensions
        var areaChanges = {
            northChange : [
                sceneBorders.x[0],
                sceneBorders.x[1], 
                sceneBorders.y[0] - 30,
                sceneBorders.y[0] + 30], 
            eastChange : [sceneBorders.x[1] - 30,
                sceneBorders.x[1] + 30, 
                230,
                290], 
            southChange : [
                sceneBorders.x[0],
                sceneBorders.x[1], 
                sceneBorders.y[1] - 30,
                sceneBorders.y[1] + 30], 
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

        var Enemy1 = {class: Ranger, name: "ranger", walkAreaX: [100, 200], walkAreaY: [350, 450], x: 150, y: 380}
        var Enemy2 = {class: Ranger, name: "ranger", walkAreaX: [300, 400], walkAreaY: [200, 400], x: 350, y: 250}
        var Enemy3 = "None"
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}