class Area102_105 extends BaseScene {
    constructor() {
        super(`Area102_105`);
    }

    preload() {
        var area = '/assets/sprites/background-images/area_102_105.png';
        super.preload(`area102_105`, area);
    }

    create() {
        var currArea = [102, 105];
        var sceneBorders = {x: [20, 385], y: [140, 317]}; // Scene dimensions
        var areaChanges = {
            northChange : [
                135,
                280, 
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

        var Enemy1 = {class: Shadow, name: "shadow", walkAreaX: [100, 200], walkAreaY: [150, 300], x: 150, y: 170}
        var Enemy2 = {class: Shadow, name: "shadow", walkAreaX: [300, 370], walkAreaY: [200, 310], x: 350, y: 250}
        var Enemy3 = "None"
        var Enemy4 = "None"

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}