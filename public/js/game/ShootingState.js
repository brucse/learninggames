PracticeGame.ShootingState = function(game) {
    this.bullet = null
        // this.gun = null
    this.policeman = null
    this.robber = null
        //this.game = game
    this.shotCounter = 0
    this.round
    this.surveyCount = 1
    this.frameCount = 0
    this.robberVelocity = 60
    // this.surveyType
    this.robberLastPositionX
    
    this.stolenBicycleGroup

};

PracticeGame.ShootingState.prototype = Object.create(PracticeGameBaseState.prototype)

PracticeGame.ShootingState.prototype.init = function(round, newSurvey, newGame) {
    var surveyCountMax
    //todo remove the whole else if, there is no meaning
    if (this.surveyType == 'mult2part1' || this.surveyType == 'mult2part1rnd') {
        surveyCountMax = 5
    }else if(this.surveyType == 'mult2part2' || this.surveyType == 'mult2part2rnd'){
        surveyCountMax = 5 
    }
    else if (this.surveyType == 'div2part1' || this.surveyType == 'div2part1rnd' ) {
        surveyCountMax = 5
    }
    else if (this.surveyType == 'div2part2' || this.surveyType == 'div2part2rnd') {
        surveyCountMax =  5
    }


    this.shotCounter = 0
    if (this.surveyCount >= surveyCountMax) {
        // this.game.state.start('GrandFinaleState', true, false, this.surveyType);
    }
    this.round = round
    if (newSurvey && !newGame) {
        this.surveyCount++
    this.round = this.surveyCount 
        // this.robberLastPositionX = this.world.width / 2
    }

    if (newGame) {
    // this.surveyType = surveyType
    //todo remove the whole else if, there is no meaning
        if (this.surveyType == 'mult2part1' || this.surveyType == 'mult2part1rnd') {
            this.surveyCount = 1
        }else if(this.surveyType == 'mult2part2' || this.surveyType == 'mult2part2rnd'){
            this.surveyCount = 1
        }
        else if (this.surveyType == 'div2part1' || this.surveyType == 'div2part1rnd') {
            this.surveyCount = 1
        }
        else if (this.surveyType == 'div2part2' || this.surveyType == 'div2part2rnd') {
            this.surveyCount = 1
        }
        // this.surveyCount = 1
    }
}

PracticeGame.ShootingState.prototype.preload = function() {
    //	this.load.image('wall', 'assets/wall.jpg');
    this.load.image('wall', 'assets/sky1.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.spritesheet('robber', 'assets/robber_animation5.png', 35.5, 48);
    // this.load.spritesheet('robber_laying', 'assets/robber_laying.png', 48, 48);
    this.load.spritesheet('policeman', 'assets/policeman_animation_shooting.png', 34, 68);
    // this.load.spritesheet('gun', 'assets/gun.png', 24, 45);
    this.load.spritesheet('bullet', 'assets/bullet.png', 12, 16);
    this.load.spritesheet('bicycle', 'assets/bicycle.png', 60, 38);

}


PracticeGame.ShootingState.prototype.create = function() {

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.wall = this.add.sprite(0, 0, 'wall');

    //  Creates 30 bullets, using the 'bullet' graphic
    this.weapon = this.game.add.weapon(1, 'bullet');

    //  The bullet will be automatically killed when it leaves the world bounds
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

    //  The speed at which the bullet is fired
    this.weapon.bulletSpeed = 2000;

    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    this.weapon.fireRate = 10;
    this.weapon.bullets.enableBody = true
    this.game.physics.arcade.enable(this.weapon.bullets)
        // this.bullet.physicsBodyType = Phaser.Physics.ARCADE;

    // this.bullet.angle = 90

    // this.policeman = this.add.sprite(this.world.width / 2, this.world.height - 72 * this.round , 'policeman')
    this.policeman = this.add.sprite(this.world.width / 2, this.world.height - 58 * this.round , 'policeman')
    //comment it jump over shooting
    // this.policeman = this.add.sprite(this.world.width / 2, this.world.height - 350 , 'policeman')

    this.game.physics.arcade.enable(this.policeman);
    this.policeman.enableBody = true
    this.policeman.body.collideWorldBounds = true;

    // this.gun.body.drag.set(70);
    // this.policeman.body.maxVelocity.set(200);
    this.policeman.anchor.setTo(0, 0);
    //  this.gun.angle = -90
    this.weapon.bulletAngleOffset = 90;



    this.policeman.animations.add('right', [0, 1, 2], 15, true);
    this.policeman.animations.add('left', [4, 5, 6], 15, true);
    this.policeman.animations.add('stop', [3], 15, false);




    //  Tell the Weapon to track the 'player' Sprite
    //  With no offsets from the position
    //  But the 'true' argument tells the weapon to track sprite rotation
    this.weapon.trackSprite(this.policeman, 27, 3, false);

    // this.robber = this.add.sprite(this.world.width / 2, this.world.height - 350, 'robber')
    this.robber = this.add.sprite(this.world.width / 2, this.world.height - 340, 'robber')
    this.game.physics.arcade.enable(this.robber);
    this.robber.enableBody = true
    this.robber.body.collideWorldBounds = true;
    // this.robber.body.onWorldBounds = new Phaser.Signal();
    this.robber.body.bounce.x = 1
    var rnd = (this.game.rnd.pick([-1, 1]))
    this.robber.body.velocity.x = this.robberVelocity * rnd
    this.robber.body.immovable = true
    if(this.robberLastPositionX != null){
        this.robber.position.x = this.robberLastPositionX
    }


    this.robber.animations.add('right', [0, 1, 2], 15, true);
    this.robber.animations.add('left', [4, 5, 6], 15, true);
    this.robber.animations.add('stop', [3], 15, false);
    this.robber.animations.add('dead', [7], 15, false);

    this.stolenBicycleGroup = this.add.group()
    this.game.physics.arcade.enable(this.stolenBicycleGroup)
    this.stolenBicycleGroup.enableBody = true

    this.cursors = this.input.keyboard.createCursorKeys();

    this.fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);




}

PracticeGame.ShootingState.prototype.update = function() {

    if (this.cursors.up.isDown) {
        // this.game.physics.arcade.accelerationFromRotation(this.gun.rotation,0, this.gun.body.acceleration);
    }
    else {
        // this.gun.body.acceleration.set(0);
    }

    if (this.cursors.left.isDown) {
        // this.gun.body.angularVelocity = -300;

        this.policeman.body.velocity.x = -200;
        this.policeman.animations.play('left');
    }
    else if (this.cursors.right.isDown) {
        // this.gun.body.angularVelocity = 300;
        this.policeman.body.velocity.x = 200;
        this.policeman.animations.play('right');
    }
    else {
        this.policeman.body.velocity.x = 0;
        this.policeman.body.velocity.y = 0;
        this.policeman.animations.play('stop');
        // this.gun.body.angularVelocity = 0;
    }

    if (this.fireButton.isDown) {
        this.weapon.fire();
    }

    // game.physics.arcade.collide(stars, platforms);
    // this.game.world.wrap(this.policeman, 16);    
    //bullet detection

    if (this.robber.body.velocity.x > 0) {
        this.robber.animations.play('right')
    }
    else if (this.robber.body.velocity.x < 0) {
        this.robber.animations.play('left')
    }
    else if (this.robber.body.velocity.x = 0) {
        this.robber.animations.play('stop')
    }
    this.game.physics.arcade.collide(this.weapon.bullets, this.robber, this.detectBullet, null, this);
    this.game.physics.arcade.collide(this.robber, this.policeman, function() {
        // this.surveyCount++ 
        if (this.surveyType == 'mult2part1' || this.surveyType == 'mult2part2' || this.surveyType == 'mult2part1rnd' || this.surveyType == 'mult2part2rnd') {
            // this.game.state.start('SurveyStateLearn2X', true, false, this.surveyCount, this.surveyType);
            // this.game.state.start('SurveyStateLearn2X', true, false, this.surveyCount);
        this.game.state.start('GrandFinaleState', true, false, this.surveyType);
        }
        else if (this.surveyType == 'div2part1' || this.surveyType == 'div2part2' || this.surveyType == 'div2part1rnd' || this.surveyType == 'div2part2rnd') {
            // this.game.state.start('SurveyStateLearn2Div', true, false, this.surveyCount, this.surveyType);
            this.game.state.start('SurveyStateLearn2Div', true, false, this.surveyCount);
        }
    }, null, this)

    this.game.physics.arcade.collide(this.stolenBicycleGroup, this.policeman, this.policemanAndBicyleColide, null, this);
    this.game.physics.arcade.collide(this.weapon.bullets, this.stolenBicycleGroup, this.bulletAndStolenBicycleCollapse, null, this);
    
    if (this.frameCount >= 60) {
        var rnd = (this.game.rnd.pick([-1, 1]))
        this.robber.body.velocity.x = this.robberVelocity * rnd
        if (rnd > 0) {
            this.robber.animations.play('right')
        }
        else {
            this.robber.animations.play('left')
        }
        this.frameCount = 0
    }
    this.frameCount++
}

PracticeGame.ShootingState.prototype.render = function() {
    //   this.game.debug.body(this.robber);
    //   this.game.debug.spriteInfo(this.policeman,20,20);
    //   this.game.debug.body(this.weapon.bullets);
    //   this.game.debug.bodyInfo(this.weapon.bullets, 32, 32);
    //   this.game.debug.bodyInfo(this.robber, 132, 132);
    // this.game.debug.text(this.shotCounter + ' talalat ' , 2,14,'#ff0')
}
PracticeGame.ShootingState.prototype.detectBullet = function(bullets, robber) {
    console.log('bullet shot')
    this.robber.animations.play('dead');
    var timer = this.game.time.create()
    
    var bicycle = this.stolenBicycleGroup.create(this.robber.position.x,this.robber.position.y,'bicycle')
    var rnd = (this.game.rnd.pick([-1, 1]))
    bicycle.body.velocity.x = rnd * 20 
    bicycle.body.velocity.y = -200
    bicycle.body.gravity.y = 200
    // bicycle.body.collideWorldBounds = true
    // bicycle.body.bounce.x = 0.4
    this.robber.body.velocity.x = 0
    timer.add(Phaser.Timer.SECOND * 1, function() {
        //@TODO what's that?
        this.robber.body.velocity.x = this.robberVelocity
        console.log('ressurrection')
        this.weapon.killAll()
        this.shotCounter++
            this.robber.animations.play('stop');


        if (this.shotCounter >= 5) {
            // 		this.game.state.start('SurveyState2X');
            this.round++
            this.robberLastPositionX = robber.position.x
                // this.game.state.start('ShootingState', true, false, this.round, false, false, this.surveyType);
            this.game.state.start('SurveyStateLearn2X', true, false, this.surveyCount);
        }

    }, this);
    timer.start()
    // this.game.paused = true
}

PracticeGame.ShootingState.prototype.policemanAndBicyleColide = function(bicycle, policeman) {
    policeman.body.velocity.y = 500
}

PracticeGame.ShootingState.prototype.bulletAndStolenBicycleCollapse = function(bullet,stolenBicycle){
    stolenBicycle.destroy()
}

PracticeGame.ShootingState.prototype.render = function() {
    // this.game.debug.spriteInfo(this.policeman,32,32)
    // console.log('render')
    // this.game.debug.text('hoppa' + this.instructionText.text,20,20,'yellow')
    // this.game.debug.body(this.bicycleGroup.children[0],20,20,'yellow')
    // if (this.bicycleGroup.children.length > 1 && this.bicycleGroup.children[1].body != null) {

    //     this.game.debug.body(this.bicycleGroup.children[1])
    // }

    // var text = this.questionTextArray[this.actualQuestionTextIndex]

}