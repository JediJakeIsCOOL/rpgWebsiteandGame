class Area98_107 extends BaseScene {
    constructor() {
        super(`Area98_107`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_98_107.png';
        super.preload(`area98_107`, area);
    }

    create() {
        var currArea = [98, 107];
        var sceneBorders = {x: [190, 380], y: [20, 460]}; // Scene dimensions
        var areaChanges = {
            northChange : "", 
            eastChange : "", 
            southChange : [
                sceneBorders.x[0],
                sceneBorders.x[1], 
                sceneBorders.y[1] - 30,
                sceneBorders.y[1] + 30], 
            westChange : ""
        }; // Defines part of scene where the user transitions to other scene
        var areaChangeTo = {
            northChange : `Area${currArea[0]}_${currArea[1] + 1}`, 
            eastChange : `Area${currArea[0] + 1}_${currArea[1]}`,
            southChange : `Area${currArea[0]}_${currArea[1] - 1}`, 
            westChange : `Area${currArea[0] - 1}_${currArea[1]}`
        }

        var Enemy1 = {class: DeathKnight, name: "deathKnight", walkAreaX: [200, 300], walkAreaY: [100, 220], x: 250, y: 150}
        var Enemy2 = {class: DeathKnight, name: "deathKnight", walkAreaX: [300, 370], walkAreaY: [250, 400], x: 350, y: 280}
        var Enemy3 = "None"
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}