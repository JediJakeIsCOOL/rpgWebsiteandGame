class Area101_106 extends BaseScene {
    constructor() {
        super(`Area101_106`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_101_106.png';
        super.preload(`area101_106`, area);
    }

    create() {
        var currArea = [101, 106];
        var sceneBorders = {x: [20, 325], y: [20, 290]}; // Scene dimensions
        var areaChanges = {
            northChange : [
                sceneBorders.x[0],
                sceneBorders.x[1], 
                sceneBorders.y[0] - 30,
                sceneBorders.y[0] + 30], 
            eastChange : "",
            southChange : "", 
            westChange : [
                sceneBorders.x[0] - 30,
                sceneBorders.x[0] + 30, 
                sceneBorders.y[0],
                sceneBorders.y[1]],
        }; // Defines part of scene where the user transitions to other scene
        var areaChangeTo = {
            northChange : `Area${currArea[0]}_${currArea[1] + 1}`, 
            eastChange : `Area${currArea[0] + 1}_${currArea[1]}`,
            southChange : `Area${currArea[0]}_${currArea[1] - 1}`, 
            westChange : `Area${currArea[0] - 1}_${currArea[1]}`
        }

        var Enemy1 = {class: Zombie, name: "zombie", walkAreaX: [100, 200], walkAreaY: [100, 280], x: 150, y: 150}
        var Enemy2 = {class: Zombie, name: "zombie", walkAreaX: [200, 300], walkAreaY: [150, 250], x: 260, y: 200}
        var Enemy3 = {class: Zombie, name: "zombie", walkAreaX: [250, 280], walkAreaY: [150, 250], x: 160, y: 270}
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}