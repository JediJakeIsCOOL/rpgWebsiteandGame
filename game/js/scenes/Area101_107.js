class Area101_107 extends BaseScene {
    constructor() {
        super(`Area101_107`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_101_107.png';
        super.preload(`area101_107`, area);
    }

    create() {
        var currArea = [101, 107];
        var sceneBorders = {x: [20, 355], y: [215, 480]}; // Scene dimensions
        var areaChanges = {
            northChange : "", 
            eastChange : "",
            southChange : [
                sceneBorders.x[0],
                sceneBorders.x[1], 
                sceneBorders.y[1] - 30,
                sceneBorders.y[1] + 30], 
            westChange : [
                sceneBorders.x[0] - 30,
                sceneBorders.x[0] + 30, 
                sceneBorders.y[0],
                sceneBorders.y[1]],
        }; // Defines part of scene where the user transitions to other scene
        var areaChangeTo = {
            northChange : `Area${currArea[0]}_${currArea[1] + 1}`, 
            eastChange : `Area${currArea[0] + 1}_${currArea[1]}`,
            southChange : `Area${currArea[0]}_${currArea[1] - 1}`, 
            westChange : `Area${currArea[0] - 1}_${currArea[1]}`
        }

        var Enemy1 = {class: Zombie, name: "zombie", walkAreaX: [100, 200], walkAreaY: [250, 350], x: 150, y: 300}
        var Enemy2 = {class: Zombie, name: "zombie", walkAreaX: [230, 350], walkAreaY: [240, 400], x: 320, y: 280}
        var Enemy3 = "None"
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}