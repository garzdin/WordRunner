var gameWidth = window.innerWidth;
var gameHeight = window.innerHeight;

var desY = 900;
var desX = 1600;

var game = new Phaser.Game(desX, desY, Phaser.AUTO, 'game');

var wordList = ["scissor", "monkey", "moon", "color", "butter", "water",
    "summer", "sun", "soap", "knot", "note", "left", "wood", "glass",
	"sound", "bike", "wheel", "spoon", "lamp", "paper", "pencil", "this","aims","their","time","with","there","fact","word","these","kept","such","world","above","many","zoo","age","likely","record","date","main","space","eggs","order","people","more","small","sold","idea","press","large","became","because","become","enter","family","great","burn","first","horse","built","longest","person","along","earl" ,"itself" ,"belongs" ,"early" ,"events" ,"another" ,"could" ,"ever" ,"clock" ,"bring" ,"colour" ,"house" ,"match" ,"speed" ,"little" ,"sheep" ,"farmer" ,"accept" ,"central" ,"energy" ,"school" ,"slang" ,"known" ,"total" ,"widely" ,"upheld" ,"view" ,"until" ,"third" ,"reject" ,"depth" ,"final" ,"speak" ,"money" ,"occur" ,"law" ,"range" ,"group" ,"habit" ,"admit" ,"agree" ,"except" ,"quest" ,"degree" ,"joint" ,"poet" ,"affect" ,"borrow" ,"effect" ,"bright" ,"force" ,"apply" ,"impact" ,"moment" ,"sign" ,"twice" ,"usage" ,"binder" ,"edited" ,"field" ,"blunt" ,"bound" ,"bring" ,"focus" ,"choose" ,"who" ,"stoop" ,"chose" ,"were" ,"choice" ,"where" ,"motion" ,"why" ,"which" ,"royal" ,"method" ,"salary" ,"south" ,"style" ,"sister" ,"mount" ,"second" ,"search" ,"strong" ,"stated" ,"chains" ,"sung" ,"social" ,"enough" ,"modern" ,"endear" ,"hence" ,"grew" ,"lodge" ,"length" ,"exotic" ,"manual" ,"labour" ,"annual" ,"armour" ,"series" ,"height" ,"tenant" ,"weight" ,"heavy" ,"dense" ,"casual" ,"trace" ,"sense" ,"curved" ,"models" ,"phrase" ,"since" ,"aunt" ,"decade" ,"uncle" ,"cousin" ,"thus" ,"niece" ,"solve" ,"nephew" ,"source" ,"policy" ,"wealth" ,"deduce" ,"denied" ,"lyrics" ,"honour" ,"depot" ,"museum" ,"taught" ,"vacuum" ,"scholar" ,"volume" ,"caught" ,"severe" ,"theory" ,"parish" ,"aisle" ,"isle" ,"alias" ,"yacht" ,"ethos" ,"list" ,"mizzle" ,"buzzer" ,"pyjama" ,"jumper" ,"jacket" ,"joking" ,"apple" ,"sun" ,"sky" ,"sound" ,"past" ,"water" ,"gum" ,"lie" ,"done" ,"paper" ,"palm" ,"plum" ,"pulse" ,"pause" ,"jump" ,"planet" ,"plane" ,"glass" ,"guy" ,"woman" ,"peach" ,"boy" ,"score" ,"page" ,"wood" ,"trees" ,"forest" ,"ground" ,"laser" ,"heart" ,"chair" ,"across" ,"line" ,"animal" ,"answer" ,"bulb" ,"sparkle" ,"sheet" ,"shoe" ,"monkey" ,"flower" ,"flow" ,"hug" ,"huge" ,"hurt" ,"kiss" ,"mouth" ,"music" ,"muse" ,"finish"];

var displayWord = [];

var letterIndex = 0;

var opacityIndex = 0;

var compareWord = [];

var bootState = {
	init: function() {
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.height = gameHeight;
		game.width = gameWidth;
		game.scale.refresh();
	},
	
    preload: function() {
		game.load.image('loadbg', 'assets/loadbg.png');
		game.load.image('loadbarbg', 'assets/loadbarbg.png');
        game.load.image('loadbar', 'assets/loadbar.png');
    },
	
	create: function() {},
	
	scaleStage:function(){
        if (game.device.desktop) {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; 
        } else {
            this.scale.scaleMode = Phaser.ScaleManager.NO_BORDER;
            this.scale.setScreenSize(true);
        }
        
        this.scale.minWidth = gameWidth / 2;
        this.scale.minHeight = gameHeight / 2;
        this.scale.maxWidth = gameWidth;
        this.scale.maxHeight = gameHeight;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setScreenSize(true);
        
		if(this.scale.scaleMode==Phaser.ScaleManager.NO_BORDER) {
			viewX = (this.scale.width / 2 - window.innerWidth / 2)*this.scale.scaleFactor.x;
			viewY = (this.scale.height / 2 - window.innerHeight / 2 - 1)*this.scale.scaleFactor.y;
			viewWidth = gameWidth-viewX;
			viewHeight = gameHeight-viewY;
		} else {
			viewX = 0;
			viewY = 0;
			viewWidth = gameWidth;
			viewHeight = gameHeight;
		}
	
		document.getElementById("game").style.width = window.innerWidth+"px";
		document.getElementById("game").style.height = window.innerHeight-1+"px";
		document.getElementById("game").style.overflow = "hidden";
    },

    update: function() {
		this.scaleStage();
        game.state.start('Preload');
    }
};

var loadState = {
    preload: function() {	
		this.preloadBg = this.add.sprite(0, 0, 'loadbg');
		this.preloadBarBg = this.add.sprite(556, 426, 'loadbarbg');
        this.preloadBar = this.add.sprite(565, 433, 'loadbar');
        this.load.setPreloadSprite(this.preloadBar);
        
		game.load.image('title', 'assets/title.png');
		game.load.audio('song', 'audio/Wings.ogg');
		game.load.audio('punch', 'audio/punch.ogg');
		game.load.audio('jump', 'audio/jump.ogg');
		game.load.audio('collect', 'audio/collect.ogg');
        game.load.atlasJSONArray('character', 'assets/character.png', 'assets/character.json');
        game.load.atlasJSONArray('alphabet', 'assets/letters.png', 'assets/letters.json');
        game.load.image('sky', 'assets/bg/sky.png');
        game.load.image('mountf', 'assets/bg/mountf.png');
        game.load.image('mountn', 'assets/bg/mountn.png');
        game.load.image('clouds', 'assets/bg/clouds.png');
        game.load.image('fence', 'assets/bg/fence.png');
        game.load.image('ground', 'assets/bg/ground.png');
        game.load.image('spike', 'assets/spikes.png');
		game.load.image('playbtn', 'assets/playbtn.png');
		game.load.image('wordsbg', 'assets/wordsbg.png');
		game.load.image('livebar', 'assets/livebar.png');
		game.load.image('livesholder', 'assets/livebg.png');
		game.load.image('success', 'assets/success.png');
		game.load.image('failed', 'assets/failed.png');
		game.load.image('pausebutton', 'assets/pausebutton.png');
		game.load.image('reloadbutton', 'assets/reloadbutton.png');
		game.load.image('menubutton', 'assets/menubutton.png');
		game.load.image('musicbutton', 'assets/music.png');
    },

    create: function() {
		game.add.audio('song', 0.6, true).play();
	},

    update: function() {
        game.state.start('Menu');
    }
};

var menuState = {
	preload: function() {},
	
	create: function() {
		this.preloadBg = this.add.sprite(0, 0, 'loadbg');
		this.musicbutton = this.add.button(game.width - 90, 25, 'musicbutton', this.muteSound, this);
		this.title = game.add.sprite(game.width / 2, 200, 'title');
		this.title.anchor.setTo(0.5, 0.5);
		this.playButton = game.add.button(game.width / 2, game.height / 2, 'playbtn', this.startGame, this);
		this.playButton.anchor.setTo(0.5, 0.5);
        this.tweenMenu(this.playButton, 2000);
		var font={font:"25px Arial",fill:"#ffffff",align:"center"};
		var text=game.add.text(game.world.centerX,game.world.centerY+410,"use Up key to jump",font);
		text.anchor.set(0.5);
	},
	
	startGame: function() {
		game.state.start('Game');
	},
	
	muteSound: function() {
        if (!game.sound.mute) {
            game.sound.mute = true;
        } else {
            game.sound.mute = false;
        }
    },
	
	tweenMenu: function(button, speed) {
        var randomInt = game.rnd.integerInRange(5, 10);
        var tween = game.add.tween(button).to({y: button.y + randomInt}, speed, "Linear", true, 0, -1);
		tween.yoyo(true);
	}
};

var mainState = {
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = "ccecf4";
        this.mountf = game.add.tileSprite(0, 100, 1600, 800, 'mountf');
        this.mountn = game.add.tileSprite(0, 100, 1600, 800, 'mountn');
        this.clouds = game.add.tileSprite(0, 100, 1600, 800, 'clouds');
        this.fence = game.add.tileSprite(0, 100, 1600, 800, 'fence');
        this.ground = game.add.sprite(0, 792, 'ground');
        game.physics.enable(this.ground);
        this.ground.body.immovable = true;
        this.groundv = game.add.tileSprite(0, 792, 1600, 108, 'ground');
		this.pauseButton = this.game.add.button(game.width - 90, 50, 'pausebutton', this.pauseGame, this);
		this.reloadButton = this.game.add.button(game.width - 170, 50, 'reloadbutton', function() {game.state.start('Game')}, this);
		this.menuButton = this.game.add.button(game.width - 250, 50, 'menubutton', function() {game.state.start('Menu')}, this);
        this.character = game.add.sprite(400, 400, 'character');
        this.character.anchor.setTo(0.5, 1);
        game.physics.enable(this.character, Phaser.Physics.ARCADE);
        this.character.body.gravity.y = 1100;
        this.character.body.setSize(120, 200);
        this.character.body.collideWorldBounds = true;
		this.character.animations.add('idle', ['idle-1', 'idle-2'], 4, true);
        this.character.animations.add('run', ['run-1', 'run-2', 'run-3', 'run-4'], 8, true);
        this.character.animations.add('jump', ['jump-up'], 1, true);
        this.character.animations.add('fall', ['jump-fall'], 1, true);
		this.character.animations.add('faint', ['faint-1', 'faint-2', 'faint-3'], 6, false);
        this.characterAlive = true;
        this.health = 3;
        this.spikeTimerTime = Phaser.Timer.SECOND * game.rnd.integerInRange(5, 10);
        this.letterTimerTime = Phaser.Timer.SECOND * game.rnd.integerInRange(10, 30);
        if (this.spikeTimerTime == this.letterTimerTime) {
            this.spikeTimerTime += 1;
            this.letterTimerTime -= 1;
        }
		this.spikeTimer = game.time.events.loop(this.spikeTimerTime, this.addSpike, this);
		this.letterTimer = game.time.events.loop(this.letterTimerTime, this.addLetter, this);
		this.livesbg = game.add.sprite(20, 50, 'livesholder');	
		this.livebar = game.add.sprite(86, 63, 'livebar');
        this.cursors = game.input.keyboard.createCursorKeys();
        this.spikes = game.add.group();
        this.spikes.enableBody = true;
        this.spikes.createMultiple(10, 'spike');
        this.spikes.setAll('body.immovable', true);
		this.wordsbg = game.add.sprite(game.width / 2, 75, 'wordsbg');
		this.wordsbg.anchor.setTo(0.5, 0.5);
        this.words = game.add.group();
        this.words.scale.x = 0.7;
        this.words.scale.y = 0.7;
		this.words.position.x = game.width / 2 - 130;
        this.letters = game.add.group();
        this.letters.enableBody = true;
        this.generateWord();
		switch(displayWord.length) {
			case 3:

			this.words.position.x = game.width / 2 - 100;
			break;
			case 4:
			this.words.position.x = game.width / 2 - 125;
			break;
			case 5:
			this.words.position.x = game.width / 2 - 140;
			break;
			case 6:
			this.words.position.x = game.width / 2 - 170;
			break;
			case 7:
			this.words.position.x = game.width / 2 - 200;
		}
        opacityIndex.length = displayWord.length;
    },

    update: function() {
        game.physics.arcade.collide(this.character, this.ground);
        game.physics.arcade.collide(this.spikes, this.character, this.hitSpike, null, this);
		if(this.characterAlive) {
            this.character.animations.play('run');
            this.mountf.tilePosition.x -= 2;
            this.mountn.tilePosition.x -= 1.5;
            this.clouds.tilePosition.x -= 1;
            this.fence.tilePosition.x -= 2;
            this.groundv.tilePosition.x -= 6;
            this.moveCharacter();
		}
        if (this.checkOverlap(this.letters, this.character) && this.characterAlive) {
            this.collectLetter(this.letters.getAt(0));
        } else {
            return;
        }
        this.checkCollectionStatus();
    },
		
	pauseGame: function(){
		if(!game.paused){
			game.paused = true;
			this.game.input.onDown.add(this.unpauseGame, self);
		}
	},
	
	unpauseGame: function() {
		if(game.paused){
			game.paused = false;
		}
	},

    moveCharacter: function() {
        if (game.input.pointer1.isDown && this.character.body.touching.down || this.cursors.up.isDown && this.character.body.touching.down) {
            this.character.body.velocity.y = -700;
            this.character.animations.play('jump');
			game.add.audio('jump', 1).play();
        } else if (!this.character.body.touching.down) {
            this.character.animations.play('fall');
        }
    },

    addSpike: function() {
        var switchTimerDelay = game.rnd.integerInRange(1, 2);
        switch (switchTimerDelay) {
            case 1:
                this.spikeTimer.delay += game.rnd.integerInRange(1, 5);
                break;
            case 2:
                this.spikeTimer.delay -= game.rnd.integerInRange(1, 5);
                break;
            default:
                this.spikeTimer.delay += game.rnd.integerInRange(1, 5);
        }
		if(this.characterAlive) {
            spike = this.spikes.getFirstDead();
            spike.reset(1600, 710);
            spike.scale.x = 0.7;
            spike.scale.y = 0.7;
            spike.body.velocity.x -= 350;
            spike.body.setSize(159, 152, -12, 0);
            spike.checkWorldBounds = true;
            spike.outOfBoundsKill = true;
            this.character.hasCollided = false;
		}
    },

    hitSpike: function() {
        if (this.characterAlive && !this.character.hasCollided) {
            this.health -= 1;
            this.livebar.width = this.livebar.width / 3 * this.health;
            this.character.hasCollided = true;
			game.add.audio('punch', 1).play();
			this.character.body.velocity.y = -800;
            if (this.health <= 0 && this.characterAlive) {
                var failed = game.add.sprite(game.width / 2, game.height / 2, 'failed');
				failed.anchor.setTo(0.5, 0.5);
				this.character.animations.play('faint');
                this.characterAlive = false;
            }
        }
    },

    generateWord: function() {
        displayWord = wordList[game.rnd.integerInRange(0, wordList.length - 1)].toUpperCase().split('');
        for (var i = 0; i < displayWord.length; i++) {
            var insertWord = this.words.create((i * 80), 55, 'alphabet', displayWord[i]);
            insertWord.alpha = 0.5;
        }
    },

    addLetter: function() {
        var switchTimerDelay = game.rnd.integerInRange(1, 2);
        switch (switchTimerDelay) {
            case 1:
                this.letterTimer.delay += game.rnd.integerInRange(1, 5);
                break;
            case 2:
                this.letterTimer.delay -= game.rnd.integerInRange(1, 5);
                break;
            default:
                this.letterTimer.delay += game.rnd.integerInRange(1, 5);
        }
        if (letterIndex < displayWord.length) {
            letter = this.letters.add(game.add.sprite(1600, 600, 'alphabet', displayWord[letterIndex]));
            game.physics.enable(letter);
			if(this.characterAlive) {
                letter.body.velocity.x -= 300;
			}
            letter.checkWorldBounds = true;
            letter.outOfBoundsKill = true;
            letterIndex++;
        } else {
            return;
        }
    },

    checkOverlap: function(spriteA, spriteB) {
        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();
        return Phaser.Rectangle.intersects(boundsA, boundsB);
    },

    collectLetter: function(object) {
        object.destroy();
		game.add.audio('collect', 1).play();
        compareWord[letterIndex] = displayWord[letterIndex];
        this.words.getAt(opacityIndex).alpha = 1;
        opacityIndex++;
    },

    checkCollectionStatus: function() {
        if (this.words.getAt(displayWord.length - 1).alpha === 1) {
            for (var i = 0; i < compareWord.length; i++) {
                if (compareWord[i] === displayWord[i]) {
                    var success = game.add.sprite(game.width / 2, game.height / 2, 'success');
					success.anchor.setTo(0.5, 0.5);
					this.character.animations.play('idle');
					this.characterAlive = false;
                }
            }
        }
    }
};

game.state.add('Boot', bootState);
game.state.add('Preload', loadState);
game.state.add('Menu', menuState);
game.state.add('Game', mainState);
game.state.start('Boot');