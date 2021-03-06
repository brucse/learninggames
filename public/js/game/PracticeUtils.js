var PracticeUtils = {}

PracticeUtils.cageAndPlatforms =  function cageAndPlatforms(cage,platforms){
	cage.body.velocity.y = 0
}

PracticeUtils.robberAndCage =   function robberAndCage(robber, cage) {
	if(this.gameState == PracticeGameConstants.GAME_STATES.START){
		cage.body.velocity.y = -400;
		this.gameState = PracticeGameConstants.GAME_STATES.CAGE_OPEN_FOR_ROBBER
	}else if (this.gameState == PracticeGameConstants.GAME_STATES.CAGE_CLOSED_FOR_POLICEMAN){
		robber.body.velocity.x = 150
	}
}

PracticeUtils.cageAndUplimit =  function cageAndUplimit(cage, uplimit) {
	cage.body.velocity.y = 0
	cageOpen = true;
}

PracticeUtils.policemanAndHorizontal = function policemanAndHorizontal(policeman, horizontal) {
	
	if(this.gameState == PracticeGameConstants.GAME_STATES.CAGE_OPEN_FOR_ROBBER){
		cage.body.velocity.y = 400;
		policeman.body.velocity.y = 0;
		this.stopPoliceman = true;
		console.log('call SurveyState')
		this.state.start('SurveyState');
		// PracticeUtils.createQuestion(this);
		this.robberInCageAndRighWall = true;
		this.gameState = PracticeGameConstants.GAME_STATES.CAGE_CLOSED_FOR_POLICEMAN
		
	}

}


PracticeUtils.policemanAndHorizontalFirst = function policemanAndHorizontalFirst(policeman, horizontal) {
	if (horizontal.policemanCollided){
		return false 
	} else{
		horizontal.policemanCollided= true;
		return true;
	}
}

PracticeUtils.moveCageUp = function moveCageUp() {
//	statusObject.robberInCageAndRighWall = true;
	statusObject.gameState = GAME_STATES.CAGE_OPEN_FOR_POLICEMAN
	cage.body.velocity.y = -800;
//	robber.body.collideWorldBounds = false;
}


//var rounds = 0;
//var ROUNDS_LIMIT = 5;



PracticeUtils.createQuestion = function createQuestion(context) {

	console.log('mode: ' +statusObject.actualMode)
	var textY = 1;
	context.game.__proto__.survey.displaySurvey(statusObject.actualMode)


	context.game.input.keyboard.addCallbacks(context, null, null, keyPress);
	//             keyPressBuffer = [];
}

//var keyPressBuffer = [];


PracticeUtils.keyPress = function keyPress(char) {
	console.log('capture key press  ' + char);

	var nextMode 

	switch(statusObject.actualMode){
	case ACTUAL_MODES.INTRODUCTION_MODE:
		nextMode = ACTUAL_MODES.ENGRAVE_MODE
		break
	case ACTUAL_MODES.ENGRAVE_MODE:
		nextMode = ACTUAL_MODES.CHECK_MODE
		break
	case ACTUAL_MODES.CHECK_MODE:
		nextMode = ACTUAL_MODES.SCORE_MODE
		break
	default:

	}

	this.game.__proto__.survey.handleUserInput(char,statusObject.actualMode,this.game)
}

/*function resetResultInText() {
	keyPressBuffer = [];
}
*/
PracticeUtils.resetWorld = function resetWorld() {

//	robber.body.velocity.x = -100
	if(policeman.position.x > 5){
	console.log('reset world');
	cage.position.y = CAGE_Y;
	cageOpen = false;
	questionAnswered = false;
	horizontal.policemanCollided = false;
	policeman.position.x = 6
		
//	console.log('set rob vis' + robber.visible)
//	robber.visible = true
//	robber.visible 
//	console.log('set rob vis 2' + robber.visible)
//	robber.body.collideWorldBounds = true;
	robber.position.x = 130
//	robber.position.y = 488
	statusObject.gameState = GAME_STATES.START
	}
}

var grandFinaleOn = true;
function isGrandFinale(x, y) {
	if(statusObject.actualMode == ACTUAL_MODES.SCORE_MODE && grandFinaleOn){
		grandFinaleOn = false
		return true
	}else{
		return false
	}
}

PracticeUtils.grandFinale = function grandFinale() {
	var game = 	this.game
	//         	alert('finale');
	console.log('finale');
	// 			robber.alpha = 0;
	// 			policeman.alpha = 0;
	cage.alpha = 0;
	game.input.enabled = false;
	robber.body.velocity.x = -100;
	policeman.body.velocity.x = -20;

	robber.body.onWorldBounds.add(function(){
		robber.body.velocity.x= -60;
		// 			policeman.body.velocity.x= -130;
		console.log('new bound')
		cursors.right.isDown = false;
		// 			stopPoliceman = true;
		// 			cursors.enabled = false;
		this.gameState = PracticeGameConstants.GAME_STATES.ROBBER_IN_PRISON
	}, this); 

	noUpdate = true;
	this.stopPoliceman = true;

	if(this.cop_car == null){

		this.cop_car = game.add.sprite(game.world.width- 150, game.world.height - 120, 'cop_car');
		game.physics.arcade.enable(this.cop_car);
		this.cop_car.enableBody = true;
		this.cop_car.body.velocity.x = -100;

		this.cop_car.body.collideWorldBounds = true;
		this.cop_car.body.onWorldBounds = new Phaser.Signal();
		this.cop_car.body.onWorldBounds.add(PracticeUtils.robberInTheCage , this);
	}


}

PracticeUtils.robberInTheCage = function robberInTheCage(){
	var game = this.game
	cop_car.alpha= 0;
	prisonCell = game.add.sprite(CAGE_X-75,CAGE_Y, 'prison_cell');
	 game.physics.arcade.enable(prisonCell);
	 prisonCell.enableBody = true;
	 robber.alpha= 1
	 robber.position.x = prisonCell.position.x + 60
//	 robber.body.velocity.x = 100
	 statusObject.robberInTheCage = true
	 policeman.position.x = 60
	 policeman.alpha= 1
	 
	 policeman.position.y =game.world.height - 150  
	 policeman.body.bounce.set(1)

}