class Area98_100 extends BaseScene {
    constructor() {
        // super(`Area${currArea[0]}_${currArea[1]}`);
        super(`Area98_100`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_98_100.png';
        super.preload(`area98_100`, area);
    }

    create() {
        var currArea = [98, 100];
        var sceneBorders = {x: [90, 480], y: [125, 465]}; // Scene dimensions
        var areaChanges = {
            northChange : [170, 286, sceneBorders.y[0] - 30, sceneBorders.y[0] + 30],
            eastChange : [sceneBorders.x[1] - 30, sceneBorders.x[1] + 30, sceneBorders.y[0], sceneBorders.y[1]], 
            southChange : "", 
            westChange : ""
        }; // Defines part of scene where the user transitions to other scene
        var areaChangeTo = {
            northChange : "Store", 
            eastChange : `Area${currArea[0] + 1}_${currArea[1]}`,
            southChange : "", 
            westChange : ""
        };

        var Enemy1 = {class: Goblin, name: "goblin", walkAreaX: [100, 200], walkAreaY: [150, 300], x: 180, y: 200};
        var Enemy2 = {class: Goblin, name: "goblin", walkAreaX: [300, 450], walkAreaY: [250, 450], x: 350, y: 280};
        var Enemy3 = "None";
        var Enemy4 = "None";

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);
    }   
}