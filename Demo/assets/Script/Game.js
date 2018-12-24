cc.Class({
    extends: cc.Component,

    properties: {
        fish_box : cc.Node,
		fish_polygon : cc.Node,
		boll_circle : cc.Node,
		startGame : false,
		startMove : false,
		startFall : false,
		
		logo: cc.Node,
		startGameBtn : cc.Node,
		startMoveBtn : cc.Node,
		
		resultMask: cc.Node,
		resultTip: cc.Label,
		
    },

    onLoad: function () {
		cc.debug.setDisplayStats(false);
		this.fish1Position = this.fish_box.getPosition();
		this.fish2Position = this.fish_polygon.getPosition();
		this.bollPosition = this.boll_circle.getPosition();
		
		this.fishSpeed = 100;
		this.ballSpeed = Math.random().toFixed(2)*400 + 500;
		
    },
	
	setStartGame : function(isStartGame){
		this.startGame = isStartGame;
		if(!this.startGame){
			this.resultMask.active = true;
		}
	},
	
	onStartGame : function(){
		this.setStartGame(true);
		this.startGameBtn.active = false;
		this.logo.active = false;
		this.startMoveBtn.active = true;
		this.startFall = true;
	},
	
	setResult: function(isSuccess){
		this.resultTip.string = isSuccess ?  '恭喜O(∩_∩)O~' : '好气哦╭(╯^╰)╮';
		
	},
	
	onResetGame : function(){
		this.fish_box.setPosition(this.fish1Position);
		this.fish_polygon.setPosition(this.fish2Position);
		this.boll_circle.setPosition(this.bollPosition);
		this.setStartGame(false);
		this.startGameBtn.active = true;
		this.logo.active = true;
		this.startMoveBtn.active = false;
		this.startFall = false;
		this.resultMask.active = false;
	},
	
	onButtonClick: function (){
		var self = this;
		this.startMove = !this.startMove;
		
		cc.loader.loadRes(this.startMove ? 'img/startmove' : 'img/stopmove', function (err, spriteFrame) {
			cc.log(err);
			self.startMoveBtn.getComponent(cc.Sprite).spriteFrame.setTexture(spriteFrame);
		});
	},
	
    update: function (dt) {
		if(this.startGame){
			if(this.startFall){
				this.fall = this.boll_circle.y>-374 ?  true : false;
				if(this.fall){
					this.boll_circle.y -= dt * this.ballSpeed;
				}else{
					this.boll_circle.y = 374;
					this.ballSpeed = Math.random().toFixed(2)*400 + 500;
				}
			}
			
			if(this.startMove){
				this.fish_box.x += dt * this.fishSpeed;
				this.fish_polygon.x -= dt * this.fishSpeed;
			}
		}	
    },
});
