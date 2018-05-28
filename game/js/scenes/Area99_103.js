class Area99_103 extends BaseScene {
    constructor() {
        super(`Area99_103`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_99_103.png';
        super.preload(`area99_103`, area);
    }

    create() {
        var currArea = [99, 103];
        var sceneBorders = {x: [40, 315], y: [90, 480]}; // Scene dimensions
        var areaChanges = {
            northChange : [
                185,
                250, 
                sceneBorders.y[0] - 30,
                sceneBorders.y[0] + 30], 
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

        var Enemy1 = {class: DeathKnight, name: "deathKnight", walkAreaX: [100, 200], walkAreaY: [100, 300], x: 150, y: 150}
        var Enemy2 = {class: DeathKnight, name: "deathKnight", walkAreaX: [230, 300], walkAreaY: [200, 400], x: 250, y: 250}
        var Enemy3 = {class: DeathKnight, name: "deathKnight", walkAreaX: [100, 200], walkAreaY: [350, 450], x: 150, y: 350}
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}