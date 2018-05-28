class Area101_101 extends BaseScene {
    constructor() {
        super(`Area101_101`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_101_101.png';
        super.preload(`area101_101`, area);
    }

    create() {
        var currArea = [101, 101];
        var sceneBorders = {x: [45, 470], y: [60, 475]}; // Scene dimensions
        var areaChanges = {
            northChange : [
                215,
                300, 
                sceneBorders.y[0] - 30,
                sceneBorders.y[0] + 30], 
            eastChange : [
                sceneBorders.x[1] - 30,
                sceneBorders.x[1] + 30, 
                220, 
                275], 
            southChange : "", 
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

        var Enemy1 = {class: Goblin, name: "goblin", walkAreaX: [100, 200], walkAreaY: [100, 300], x: 150, y: 150}
        var Enemy2 = {class: Shadow, name: "shadow", walkAreaX: [300, 400], walkAreaY: [200, 400], x: 350, y: 250}
        var Enemy3 = {class: Goblin, name: "goblin", walkAreaX: [100, 200], walkAreaY: [350, 450], x: 150, y: 370}
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}