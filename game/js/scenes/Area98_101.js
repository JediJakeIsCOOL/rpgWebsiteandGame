class Area98_101 extends BaseScene {
    constructor() {
        super(`Area98_101`);
    }
    
    preload() {
        var area = '/assets/sprites/background-images/area_98_101.png';
        super.preload(`area98_101`, area);
    }

    create() {
        var currArea = [98, 101];
        var sceneBorders = {x: [100, 480], y: [85, 420]}; // Scene dimensions
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
        };

        var Enemy1 = {class: Goblin, name: "goblin", walkAreaX: [100, 200], walkAreaY: [100, 300], x: 150, y: 150}
        var Enemy2 = {class: Goblin, name: "goblin", walkAreaX: [300, 400], walkAreaY: [200, 400], x: 350, y: 250}
        var Enemy3 = {class: Goblin, name: "goblin", walkAreaX: [120, 180], walkAreaY: [350, 420], x: 150, y: 380}
        var Enemy4 = "None";

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}