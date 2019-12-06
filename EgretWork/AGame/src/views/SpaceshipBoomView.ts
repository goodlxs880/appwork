class SpaceshipBoomView extends egret.Sprite implements Animatable
{
	private boomMovieClip : egret.MovieClip;
	private isPlaying : boolean = false;
	
	constructor()
	{
        super();
		
		let data = RES.getRes("boom_effect_json");
		let txtr = RES.getRes("boom_effect_png");
		let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
		this.boomMovieClip = new egret.MovieClip( mcFactory.generateMovieClipData( "boom" ) );
		this.boomMovieClip.scaleX = 5;
		this.boomMovieClip.scaleY = 5;
		this.addChild( this.boomMovieClip );
	}
	
	public animate( time : number ) : void
	{
		if ( this.isPlaying ) return;

		this.isPlaying = true
		this.boomMovieClip.gotoAndPlay( "boom" );
	}
}
