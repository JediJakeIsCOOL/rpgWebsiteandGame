class Area100_106 extends BaseScene {
    constructor() {
        super(`Area100_106`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_100_106.png';
        super.preload(`area100_106`, area);
    }

    create() {
        var currArea = [100, 106];
        var sceneBorders = {x: [105, 480], y: [20, 290]}; // Scene dimensions
        var areaChanges = {
            northChange : [
                sceneBorders.x[0],
                sceneBorders.x[1], 
                sceneBorders.y[0] - 30,
                sceneBorders.y[0] + 30], 
            eastChange : [
                sceneBorders.x[1] - 30,
                sceneBorders.x[1] + 30, 
                sceneBorders.y[0],
                sceneBorders.y[1]],
            southChange : "", 
            westChange : "",
        }; // Defines part of scene where the user transitions to other scene
        var areaChangeTo = {
            northChange : `Area${currArea[0]}_${currArea[1] + 1}`, 
            eastChange : `Area${currArea[0] + 1}_${currArea[1]}`,
            southChange : `Area${currArea[0]}_${currArea[1] - 1}`, 
            westChange : `Area${currArea[0] - 1}_${currArea[1]}`
        }

        var Enemy1 = {class: Zombie, name: "zombie", walkAreaX: [110, 200], walkAreaY: [140, 290], x: 150, y: 150}
        var Enemy2 = {class: Zombie, name: "zombie", walkAreaX: [300, 400], walkAreaY: [40, 150], x: 350, y: 100}
        var Enemy3 = {class: Zombie, name: "zombie", walkAreaX: [250, 280], walkAreaY: [150, 250], x: 160, y: 220}
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}