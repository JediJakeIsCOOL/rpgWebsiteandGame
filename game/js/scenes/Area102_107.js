class Area102_107 extends BaseScene {
    constructor() {
        super(`Area102_107`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_102_107.png';
        super.preload(`area102_107`, area);
    }

    create() {
        var currArea = [102, 107];
        var sceneBorders = {x: [190, 480], y: [20, 480]}; // Scene dimensions
        var areaChanges = {
            northChange : [
                sceneBorders.x[0],
                sceneBorders.x[1], 
                sceneBorders.y[0] - 30,
                sceneBorders.y[0] + 30], 
            eastChange : 
                [sceneBorders.x[1] - 30,
                sceneBorders.x[1] + 30, 
                sceneBorders.y[0],
                sceneBorders.y[1]], 
            southChange : [
                sceneBorders.x[0],
                sceneBorders.x[1] - 30, 
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

        var Enemy1 = {class: Shadow, name: "shadow", walkAreaX: [200, 280], walkAreaY: [100, 300], x: 220, y: 150}
        var Enemy2 = {class: Shadow, name: "shadow", walkAreaX: [300, 400], walkAreaY: [200, 400], x: 350, y: 250}
        var Enemy3 = {class: Shadow, name: "shadow", walkAreaX: [350, 450], walkAreaY: [50, 170], x: 380, y: 100}
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}