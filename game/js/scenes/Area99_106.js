class Area99_106 extends BaseScene {
    constructor() {
        super(`Area99_106`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_99_106.png';
        super.preload(`area99_106`, area);
    }

    create() {
        var currArea = [99, 106];
        var sceneBorders = {x: [20, 400], y: [145, 470]}; // Scene dimensions
        var areaChanges = {
            northChange : [
                140,
                250, 
                sceneBorders.y[0] - 30,
                sceneBorders.y[0] + 30], 
            eastChange : "", 
            southChange : "", 
            westChange : [
                sceneBorders.x[0] - 30,
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

        var Enemy1 = {class: DeathKnight, name: "deathKnight", walkAreaX: [100, 200], walkAreaY: [150, 300], x: 150, y: 180}
        var Enemy2 = "None"
        var Enemy3 = "None"
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}