class HudView extends egret.Sprite
{
	private score : egret.TextField;
	private lives : egret.TextField;
	
	constructor()
	{
        super();
		this.score = this.createTextField();
		this.score.x = 480;
		this.score.y = 5;
		this.addChild( this.score );
		
		this.lives = this.createTextField();
		this.lives.x = 0;
		this.lives.y = 5;
		this.addChild( this.lives );
		
		this.setScore( 0 );
		this.setLives( 3 ) ;
	}
	
	public setScore( value : number ) : void
	{
		this.score.text = "SCORE: " + value;
	}
	
	public setLives( value : number ) : void
	{
		this.lives.text = "LIVES: " + value;
	}
	
	private createTextField() : egret.TextField
	{
		let tf : egret.TextField = new egret.TextField();
		tf.width = 120;
		return tf;
	}
}
