//Background 
let bg
//Mage
let mage
//Wizard
let wizard

let scenes = []
let currentScene = 0

//Preloading the background image to avoid loading issues
function preload() {
	scenes[0] = {
		background: loadImage("Dark-Pixel-Forest-Background.jpg"),
	}

	//Loading background image
	bg = loadImage("Dark-Pixel-Forest-Background.jpg")
	//Sprite for the mage
	mage = new Sprite()
	//Increased size of mage sprite
	mage.scale = 3

	//Sprite for the wizard 
	wizard = new Sprite()
	//Increased size of wizard sprite
	wizard.scale = 3

	//Animations for mage 

	//Idle position mage sprite sheet
	mage.addAni('idle1', 'Idle.png', {
		frameSize: [896 / 7, 128],
		frames: 7
	})

	//Running mage sprite sheet
	mage.addAni('run1', 'Run.png', {
		frameSize: [1024 / 8, 128],
		frames: 8
	})

	//Jumping mage sprite sheet
	mage.addAni('jump1', 'Jump.png', {
		frameSize: [1024 / 8, 128],
		frames: 8
	})

	//Primary slice attack mage sprite sheet
	mage.addAni('slice1', 'Attack_1.png', {
		frameSize: [1280 / 10, 128],
		frames: 10
	})

	//Secondary slice attack mage sprite sheet
	mage.addAni('slice2', 'Attack_2.png', {
		frameSize: [512 / 4, 128],
		frames: 4
	})

	//Animations for wizard 

	//Idle position wizard sprite sheet
	wizard.addAni('idle2', 'Idle2.png', {
		frameSize: [896 / 7, 128],
		frames: 7
	})

	//Running wizard sprite sheet
	wizard.addAni('run2', 'Run2.png', {
		frameSize: [1024 / 8, 128],
		frames: 8
	})

	//Jumping wizard sprite sheet
	wizard.addAni('jump2', 'Jump2.png', {
		frameSize: [1152 / 9, 128],
		frames: 9
	})

	//Primary Flame Jet attack wizard sprite sheet
	wizard.addAni('flamejet', 'Flame_Jet_Attack.png', {
		frameSize: [1792 / 14, 128],
		frames: 14
	})

	//Secondary Fireball attack wizard sprite sheet
	wizard.addAni('fireball', 'Fireball_Attack.png', {
		frameSize: [1024 / 8, 128],
		frames: 8
	})
}

//Canvas setup
function setup() {

	//Fixed size for the canvas
	new Canvas(1920, 1080, 'fullscreen');

	//Starting position of the mage sprite
	mage.x = 650
	mage.y = height / 1.35

	//Starting position of the wizard sprite
	wizard.x = 1290
	wizard.y = height / 1.35
	wizard.mirror.x = true

}

function draw() {
	//Forest background
	background(scenes[currentScene].background);

	//To move

	if (kb.pressing('a')) {
		mage.changeAni('run1')
		mage.velocity.x = -10
		mage.mirror.x = true //true or 1 works fine
	} else if (kb.pressing('d')) {
		mage.changeAni('run1')
		mage.velocity.x = 10
		mage.mirror.x = false
	}

	//To float on air
	else if (kb.pressing('w')) {
		mage.changeAni('jump1')
		mage.velocity.y = -10
	} else if (kb.pressing(' ')) {
		mage.changeAni('jump1')
		mage.velocity.y = -10

		//To land on the ground
	} else if (kb.pressing('s')) {
		mage.changeAni('jump1')
		mage.velocity.y = +10
	}

	//Attacks
	else if (kb.pressing('e')) {
		mage.changeAni('slice1')
	} else if (kb.pressing('r')) {
		mage.changeAni('slice2')
	}

	//Idle position
	else {
		mage.changeAni('idle1')
		mage.velocity.y = 0
		mage.velocity.x = 0
	}

	if (kb.pressing('left2')) {
		wizard.changeAni('run2')
		wizard.velocity.x = -10
		wizard.mirror.x = true //true or 1 works fine
	} else if (kb.pressing('right2')) {
		wizard.changeAni('run2')
		wizard.velocity.x = 10
		wizard.mirror.x = false
	}

	//To float on air
	else if (kb.pressing('up2')) {
		wizard.changeAni('jump2')
		wizard.velocity.y = -10

		//To land on the ground
	} else if (kb.pressing('down2')) {
		wizard.changeAni('jump2')
		wizard.velocity.y = +10
	}

	//Attacks
	else if (kb.pressing('o')) {
		wizard.changeAni('flamejet')
	} else if (kb.pressing('p')) {
		wizard.changeAni('fireball')

		//Idle position
	} else {
		wizard.changeAni('idle2')
		wizard.velocity.y = 0
		wizard.velocity.x = 0
	}


	//Constraining mage and wizard so they don't go off the canvas
	mage.y = constrain(mage.y, height / 1.4, height / 1.35);
	mage.x = constrain(mage.x, 0, width);
	wizard.y = constrain(wizard.y, height / 1.4, height / 1.35);
	wizard.x = constrain(wizard.x, 0, width);

	//conditional for overlapping
	if (mage.overlapping(wizard)) {
		console.log("overlapping")
		mage.changeAni('slice1')
		wizard.changeAni('flamejet')
	}
}