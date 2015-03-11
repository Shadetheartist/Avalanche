var canvas, ctx;
var theTop = 200 * -100;
var cameraOffset = -410;
var heightZero = -600;
var highScore = 0;
var d = 0,
    q = 0;
var pausecd,
    holdUpdate, holdRender;
var floor;
var lava;

var MMCD;
var MiniMap;
var MMData;

var bgY2 = -100;
var bgY3 = -100;

var showDebug = false,
    gameOn = true;
var spawns;

function init() {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");
    floor = new GameObject(new Rectangle(0, 600, 1000, 10000), "#5E3630", .66);
    lava = new Rectangle(0, 900, canvas.width, canvas.height * 5);
    pausecd = new coolDown(0);
    MMCD = new coolDown(0);
    MiniMap = new Rectangle(0, 0, 1000, 600);
    MMData = [];

    aReset();
    spawns = [];
    if (gameOn) {
        spawns[5] = spawnQue(50, 1, 0.5, 4, 2200);
        spawns[0] = spawnQue(75, 1, 0.5, 4, 2200);
        spawns[1] = spawnQue(150, 1, 0.5, 3.4, 4500);
        spawns[2] = spawnQue(175, 1, 0.5, 3.3, 7000);
        spawns[3] = spawnQue(200, 1, 0.5, 3.2, 10000);
        spawns[4] = spawnQue(350, 1, 0.5, 2.8, 70000);
    } else {
        boxes.push(
            new droppingBox(
                new GameObject(
                    new Rectangle(300, 420, 100, 200),
                    "#000",
                    0.7,
                    new Vector2(0, 0)
                )
            )
        );
        boxes.push(
            new droppingBox(
                new GameObject(
                    new Rectangle(500, 450, 200, 100),
                    "#000",
                    0.7,
                    new Vector2(0, 0)
                )
            )
        );
        boxes.push(
            new droppingBox(
                new GameObject(
                    new Rectangle(740, 450, 200, 500),
                    "#000",
                    0.7,
                    new Vector2(0, 0)
                )
            )
        );
    }
    BGspawnQue(20, .5);
    main();
}




///////////////////////////////////////////////////////////////////////////////render/////////////////////////////////////////////

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); - (200 * 100)
    var backGround = ctx.createLinearGradient(0, 600 - cameraOffset / 2, 0, theTop / 2 - cameraOffset / 2);
    backGround.addColorStop(1, "#000");
    backGround.addColorStop(0.7, "#273b95");
    backGround.addColorStop(0.3, "#455dc9");
    backGround.addColorStop(0.15, "#901e46");
    backGround.addColorStop(0, "#600000");

    var bgLavaFilm = ctx.createLinearGradient(0, lava.y - cameraOffset, 0, lava.y - cameraOffset - 550);
    bgLavaFilm.addColorStop(0, "rgb(223, 0, 0)");
    bgLavaFilm.addColorStop(1, "rgba(223, 0, 0, 0)");

    var fgLavaFilm = ctx.createLinearGradient(0, lava.y - cameraOffset, 0, lava.y - cameraOffset - 100);
    fgLavaFilm.addColorStop(0, "rgb(194, 0, 0)");
    fgLavaFilm.addColorStop(1, "rgba(194, 0, 0, 0)");

    ctx.globalAlpha = 1;
    ctx.fillStyle = backGround;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;

    //backdrop cityline
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 600 - cameraOffset / 3, 1000, -120);
    ctx.drawImage(backdrop, 0, -100 - cameraOffset / 3, 1000, 600);
    ctx.drawImage(backdrop2, 0, bgY2 - cameraOffset / 4, 1000, 600);
    ctx.drawImage(backdrop3, 0, bgY3 - cameraOffset / 6, 1000, 600);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 490 - cameraOffset / 3, canvas.width, 2000);
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = backGround;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    //end of city
    
    
    for (var i = 0; i < backgroundRects.length; i++)
        backgroundRects[i].draw();

    ctx.fillStyle = bgLavaFilm;
    ctx.fillRect(0, 600, canvas.width, -100000);


    ctx.fillStyle = "#000";
    ctx.fillRect(floor.rect.x, floor.rect.y - cameraOffset, floor.rect.w, floor.rect.h);

    for (var i = 0; i < boxes.length; i++)
        boxes[i].GO.draw();
    for (var i = 0; i < stoppedBoxes.length; i++)
        stoppedBoxes[i].draw();
    for (var i = 0; i < players.length; i++)
        players[i].render();
    for (var i = 0; i < particles.length; i++)
        particles[i].render();
    for (var i = 0; i < menuButtons.length; i++)
        menuButtons[i].render();

    ctx.fillStyle = fgLavaFilm;
    ctx.fillRect(0, 600, canvas.width, -100000);

    
    ctx.fillStyle = "#c40000";
    ctx.fillRect(lava.x, lava.y - cameraOffset, lava.w, lava.h);
    ctx.fillRect(lava.x, lava.y + 800 - cameraOffset, lava.w, lava.h);
    
    
    ctx.fillStyle = "#FFF";
    ctx.font = "30px Arial";
    ctx.fillText("Highest: " + -Math.floor(_highestHeight + heightZero) / 100 + "m", 10, 30);
    ctx.fillText("Current: " + -Math.floor(players[0].highestHeight + heightZero) / 100 + "m", 10, 60);
    
    ctx.fillText("Score: " + players[0].score, 10, 90); //Debug
    
    for (var i = 0; i < scoreNums.length; i++)
        scoreNums[i].render();

    ctx.font = "20px Arial";

    for (var i = 0; i < MMData.length; i++)
        MMData[i].draw();
    if (showDebug) {
        ctx.fillStyle = "lightblue";
        players[0].renderListOfThingsThatHappened(10);
        ctx.fillText(q, 10, 170); //Debug
        ctx.fillText(boxes.length, 10, 200); //Debug
        ctx.fillText(stoppedBoxes.length, 10, 230); //Debug
        ctx.fillText(backgroundRects.length, 10, 260); //Debug
        ctx.fillText(players[0].wallSides, 10, 290); //Debug

    }
}

function update() {
    
    if(formIsShowing && pressed[27]){
        hideform();
    }
    bgY2 += 0.5 / 3;
    bgY3 += 0.5 / 6;
    
    if (pressed[16]) {
        if (MMCD.isCool()) {
            var dataRects = [];
            for (var i = 0; i < boxes.length; i++)
                dataRects.push(new Rectangle(boxes[i].GO.rect.x, boxes[i].GO.rect.y, boxes[i].GO.rect.w, boxes[i].GO.rect.h));
            for (var i = 0; i < stoppedBoxes.length; i++)
                dataRects.push(new Rectangle(stoppedBoxes[i].rect.x, stoppedBoxes[i].rect.y, stoppedBoxes[i].rect.w, stoppedBoxes[i].rect.h));
            for (var i = 0; i < players.length; i++)
                dataRects.push(players[i].rect);
            MMData = minimap(dataRects, MiniMap);
        }
    } else {
        MMData.length = 0;
    }

    for (var i = 0; i < boxes.length; i++)
        boxes[i].update();
    for (var i = 0; i < backgroundRects.length; i++)
        backgroundRects[i].update();
    for (var i = 0; i < players.length; i++)
        players[i].update();
    for (var i = 0; i < particles.length; i++)
        particles[i].update();
    for (var i = 0; i < scoreNums.length; i++)
        scoreNums[i].update();

    if (lava.y > players[0].rect.y + 1500)
        lava.y = players[0].rect.y + 1500;



    if (gameOn)
        lava.y -= 0.63 * droppingBox.slomo;

    if (pressed[80] && pausecd.isCool()) {
        holdUpdate = update;
        holdRender = render;
        render = function () {};
        update = paused;
        pausecd = new coolDown(300);
    }

}

function paused() {
    ctx.fillStyle = "#FFF";
    ctx.font = "30px Arial";
    ctx.fillText("Paused", canvas.width / 2 - 100, canvas.height / 2 + 15);
    if (pressed[80] && pausecd.isCool()) {
        update = holdUpdate;
        render = holdRender;
        pausecd = new coolDown(500);
    }
}

function main() {
    requestAnimationFrame(main);
    update();
    render();
    deleteBoxes();
}

window.requestAnimationFrame = function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function ( /* function */ callback) {
            window.setTimeout(callback, 1000 / 60);
        }
    );
}();
