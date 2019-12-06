class WaitForStartView extends egret.Sprite
{
	private gameOver : egret.TextField;
	private clickToStart : egret.TextField;
	private config : GameConfig;
	
	public click : ash.Signal = new ash.Signal();
	
	constructor( config : GameConfig )
	{
        super();

		this.config = config;
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
		tf.width = 400;
		tf.height = 200;
		tf.text = "飞机大战";
		tf.x = this.config.width * 0.5 - 200;
		tf.y = this.config.height * 0.5 - 200;
		tf.size = 100;
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
		this.gameOver.text = "游戏结束";
	}
	
	private createClickToStart() : egret.TextField
	{
		let tf : egret.TextField = new egret.TextField();
		tf.width = 400;
		tf.height = 200;
		tf.text = "点击开始";
		tf.x = this.config.width * 0.5 - 200;
		tf.y = this.config.height * 0.5 - 100;
		tf.size = 100;
		return tf;
	}
}
