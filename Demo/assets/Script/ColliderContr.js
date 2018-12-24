

cc.Class({
    extends: cc.Component,

    properties: {
       
    },


    start: function() {

    },

    onLoad: function () {
		this.Game = cc.find('Canvas').getComponent('Game');
		cc.director.getCollisionManager().enabled = true;
        //cc.director.getCollisionManager().enabledDebugDraw = true;
		this.touchingNumber = 0;
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var delta = event.touch.getDelta();
            this.x += delta.x;
            this.y += delta.y;
        }, this.node);
		
		
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            
        }, this.node);
    },
	
	onCollisionEnter: function (other, self) {
        //this.node.color = cc.Color.RED;
		cc.log('onCollisionEnter');
		if (other.node.group === 'ball') {
			this.Game.setStartGame(false);
			this.Game.setResult(false);
        }else if(other.node.group === 'fish'){
			this.Game.setStartGame(false);
			this.Game.setResult(true);
		}
    },
    
    onCollisionStay: function (other, self) {

    },
    
    onCollisionExit: function (other) {
        this.touchingNumber --;
        if (this.touchingNumber === 0) {
            //this.node.color = cc.Color.WHITE;
        }
		cc.log('onCollisionExit');
    },

    update: function (dt) {

    },
});
