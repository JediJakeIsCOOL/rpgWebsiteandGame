class Area99_100 extends BaseScene {
    constructor() {
        super(`Area99_100`);
    }
    
    preload() {
        var area = '/assets/sprites/background-images/area_99_100.png';
        super.preload(`area99_100`, area);
    }

    create() {
        var currArea = [99, 100];
        var sceneBorders = {x: [20, 465], y: [20, 465]}; // Scene dimensions
        var areaChanges = {
            northChange : [
                sceneBorders.x[0],   
                sceneBorders.x[1], 
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
                sceneBorders.y[0], 
                sceneBorders.y[1]]
            }; // Defines part of scene where the user transitions to other scene
        var areaChangeTo = {
            northChange : `Area${currArea[0]}_${currArea[1] + 1}`, 
            eastChange : `Area${currArea[0] + 1}_${currArea[1]}`,
            southChange : `Area${currArea[0]}_${currArea[1] - 1}`, 
            westChange : `Area${currArea[0] - 1}_${currArea[1]}`
        };

        var Enemy1 = {class: Goblin, name: "goblin", walkAreaX: [100, 200], walkAreaY: [100, 300], x: 150, y: 150}
        var Enemy2 = {class: Goblin, name: "goblin", walkAreaX: [300, 400], walkAreaY: [200, 400], x: 350, y: 250}
        var Enemy3 = "None";
        var Enemy4 = "None";

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}