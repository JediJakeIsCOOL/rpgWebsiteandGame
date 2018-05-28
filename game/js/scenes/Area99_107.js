class Area99_107 extends BaseScene {
    constructor() {
        super(`Area99_107`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_99_107.png';
        super.preload(`area99_107`, area);
    }

    create() {
        var currArea = [99, 107];
        var sceneBorders = {x: [100, 390], y: [95, 430]}; // Scene dimensions
        var areaChanges = {
            northChange : "", 
            eastChange : [
                sceneBorders.x[1] - 30,
                sceneBorders.x[1] + 30, 
                335,
                415],
            southChange : [
                140,
                250, 
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

        var Enemy1 = {class: DeathKnight, name: "deathKnight", walkAreaX: [120, 300], walkAreaY: [100, 300], x: 150, y: 150}
        var Enemy2 = "None"
        var Enemy3 = "None"
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}