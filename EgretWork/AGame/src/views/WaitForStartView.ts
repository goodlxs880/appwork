class WaitForStartView extends egret.Sprite
{
	private gameOver : egret.TextField;
	private clickToStart : egret.TextField;
	
	public click : ash.Signal = new ash.Signal();
	
	constructor()
	{
        super();
		this.gameOver = this.createGameOver();
		this.addChild( this.gameOver );
		this.clickToStart = this.createClickToStart();
		this.addChild( this.clickToStart );

		this.addEventListener( egret.Event.ADDED_TO_STAGE, this.addClickListener, this );
		this.addEventListener( egret.Event.REMOVED_FROM_STAGE, this.removeClickListener, this );
	}
	
	private createGameOver() : egret.TextField
	{

		let tf : egret.TextField = new egret.TextField();
		tf.width = 200;
		tf.text = "ASTEROIDS";
		tf.x = 200;
		tf.y = 175;
		return tf;
	}
	
	private dispatchClick( event : MouseEvent ) : void
	{
		this.click.dispatch();
	}
	
	public addClickListener( event : Event ) : void
	{
		this.stage.addEventListener( egret.TouchEvent.TOUCH_END, this.dispatchClick, this );
	}
	
	public removeClickListener( event : Event ) : void
	{
		this.stage.removeEventListener( egret.TouchEvent.TOUCH_END, this.dispatchClick, this );
		this.gameOver.text = "GAME OVER";
	}
	
	private createClickToStart() : egret.TextField
	{
		let tf : egret.TextField = new egret.TextField();
		tf.width = 200;
		tf.text = "CLICK TO START";
		tf.x = 200;
		tf.y = 225;
		return tf;
	}
}
