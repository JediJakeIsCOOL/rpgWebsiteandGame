class Area101_102 extends BaseScene {
    constructor() {
        super(`Area101_102`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_101_102.png';
        super.preload(`area101_102`, area);
    }

    create() {
        var currArea = [101, 102];
        var sceneBorders = {x: [138, 425], y: [120, 440]}; // Scene dimensions
        var areaChanges = {
            northChange : "", 
            eastChange : "", 
            southChange : [
                215,
                300, 
                sceneBorders.y[1] - 30,
                sceneBorders.y[1] + 30], 
            westChange : [
                sceneBorders.x[0] - 30,
                sceneBorders.x[0] + 30, 
                220, 
                275]
        }; // Defines part of scene where the user transitions to other scene
        var areaChangeTo = {
            northChange : `Area${currArea[0]}_${currArea[1] + 1}`, 
            eastChange : `Area${currArea[0] + 1}_${currArea[1]}`,
            southChange : `Area${currArea[0]}_${currArea[1] - 1}`, 
            westChange : `Area${currArea[0] - 1}_${currArea[1]}`
        }

        var Enemy1 = {class: DeathKnight, name: "deathKnight", walkAreaX: [100, 200], walkAreaY: [130, 300], x: 150, y: 150}
        var Enemy2 = {class: Goblin, name: "goblin", walkAreaX: [300, 400], walkAreaY: [200, 400], x: 350, y: 250}
        var Enemy3 = {class: Goblin, name: "goblin", walkAreaX: [100, 200], walkAreaY: [350, 430], x: 150, y: 380}
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}