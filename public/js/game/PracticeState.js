/**
 * Created by brucse on 6/2/2017.
 */


PracticeState = function (game) {

}



PracticeState.prototype = Object.create(Phaser.State.prototype)

PracticeState.prototype.init = function() {
    this.question= '2+?=5'
    this.answer = '3'

}

PracticeState.prototype.preload = function() {
    this.load.spritesheet('uss_submarine', 'assets/uss_sub.png', 100, 23);
    this.load.spritesheet('battleship', 'assets/battleship.png', 100, 23);
    this.load.spritesheet('torpedo', 'assets/torpedo.png', 100, 23);

    this.load.image('wall', 'assets/sky1.png');
    this.load.spritesheet('explosion','assets/explosion.png')

}

PracticeState.prototype.create = function() {

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.wall = this.add.sprite(0, 0, 'wall');

    this.uss_submarine = this.add.sprite(this.world.width / 2, this.world.height - 58  , 'uss_submarine')

    var style = { font: "32px Courier", fill: "red" };
    this.battleships  = this.add.group();
    this.battleships.inputEnableChildren = true;
    var shiftPixel = 160
    var rightAnswerIndex = this.game.rnd.between(0,4)
    var texts = []

    var arr = []
    while(arr.length < 5){
        var randomnumber = Math.ceil(Math.random()*10)
        if(arr.indexOf(randomnumber) > -1) continue;
        arr[arr.length] = randomnumber;
    }

    var rightAnswerIndex = this.game.rnd.between(0,4)
    arr[rightAnswerIndex] = this.answer

    this.explodes = this.add.group()

    for(var i = 0 ; i < 5; i++){
        var battleship1 = this.battleships.create(shiftPixel * i, this.world.height - 400 , 'battleship')

        var text = arr[i]

        var text1 = this.game.add.text(battleship1.x + battleship1.width /2, battleship1.y - battleship1.height - 10, text, style);
        text1.anchor.set(0.5,0.5)
        // battleship1.addChild(text1)
        // text1.alignTo(battleship1, Phaser.TOP_CENTER, 16);
        battleship1.label = text
        // battleship1.events.onInputDown.add(this.clickOnBattleShip,battleship1)
        battleship1.events.onInputDown.add(this.clickOnBattleShip,this)
        battleship1.animations.add('explosion')
        this.game.physics.arcade.enable(battleship1)
        battleship1.enableBody = true

    }
    this.game.physics.arcade.enable(this.battleships)
    this.questionText = this.game.add.text(this.world.width /2, 30,this.question,style)


    this.uss_submarineMove = this.game.add.tween(this.uss_submarine)
    this.torpedo = this.add.sprite(this.uss_submarine.x, this.uss_submarine.y , 'torpedo')
    this.torpedo.visible = false
    this.game.physics.arcade.enable(this.torpedo)
    this.torpedo.enableBody = true
}

PracticeState.prototype.update = function () {

    this.physics.arcade.collide(this.torpedo, this.battleships, this.torpedoHit);
}

PracticeState.prototype.clickOnBattleShip = function (source) {
    console.log(source.label)
    var y = source.position.y
    this.uss_submarineMove.to({x:source.position.x})
    this.uss_submarineMove.onComplete.add(this.startTorpedo,this,null,source.position.x,y)
    this.uss_submarineMove.start()


}

PracticeState.prototype.startTorpedo = function (a,b,x,y) {
    this.torpedo.position.x = this.uss_submarine.position.x
    this.torpedo.position.y = this.uss_submarine.position.y
    this.torpedo.visible = true
   var torpedoTween  = this.game.add.tween(this.torpedo)
    torpedoTween.to({x: x,y: y})
    torpedoTween.start()
}

PracticeState.prototype.torpedoHit = function (torpedo,battleship) {
   battleship.animations.play('explosion')
}
