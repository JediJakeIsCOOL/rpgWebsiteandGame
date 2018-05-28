class Area98_102 extends BaseScene {
    constructor() {
        super(`Area98_102`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_98_102.png';
        super.preload(`area98_102`, area);
    }

    create() {
        var currArea = [98, 102];
        var sceneBorders = {x: [105, 480], y: [95, 390]}; // Scene dimensions
        var areaChanges = {
            northChange : "", 
            eastChange : [
                sceneBorders.x[1] - 30,
                sceneBorders.x[1] + 30, 
                sceneBorders.y[0], 
                sceneBorders.y[1]], 
            southChange : "", 
            westChange : ""
        }; // Defines part of scene where the user transitions to other scene
        var areaChangeTo = {
            northChange : `Area${currArea[0]}_${currArea[1] + 1}`, 
            eastChange : `Area${currArea[0] + 1}_${currArea[1]}`,
            southChange : `Area${currArea[0]}_${currArea[1] - 1}`, 
            westChange : `Area${currArea[0] - 1}_${currArea[1]}`
        }

        var Enemy1 = {class: DeathKnight, name: "deathKnight", walkAreaX: [140, 250], walkAreaY: [100, 300], x: 150, y: 150}
        var Enemy2 = {class: DeathKnight, name: "deathKnight", walkAreaX: [300, 400], walkAreaY: [200, 350], x: 350, y: 250}
        var Enemy3 = {class: DeathKnight, name: "deathKnight", walkAreaX: [110, 240], walkAreaY: [350, 390], x: 150, y: 370}
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}