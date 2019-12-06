class SpaceshipDeathView extends egret.Sprite implements Animatable
{
	private shape1 : egret.Shape;
	private shape2 : egret.Shape;
	private vel1 : egret.Point;
	private vel2 : egret.Point;
	private rot1 : number;
	private rot2 : number;
	
	constructor()
	{
        super();
		this.shape1 = new egret.Shape();
		this.shape1.graphics.beginFill( 0xFFFFFF );
		this.shape1.graphics.moveTo( 20, 0 );
		this.shape1.graphics.lineTo( -14, 14 );
		this.shape1.graphics.lineTo( -8, 0 );
		this.shape1.graphics.lineTo( 20, 0 );
		this.shape1.graphics.endFill();
		this.addChild( this.shape1 );
		
		this.shape2 = new egret.Shape();
		this.shape2.graphics.beginFill( 0xFFFFFF );
		this.shape2.graphics.moveTo( 20, 0 );
		this.shape2.graphics.lineTo( -14, -14 );
		this.shape2.graphics.lineTo( -8, 0 );
		this.shape2.graphics.lineTo( 20, 0 );
		this.shape2.graphics.endFill();
		this.addChild( this.shape2 );
		
		this.vel1 = new egret.Point( Math.random() * 20 - 10, Math.random() * 20 + 20 );
		this.vel2 = new egret.Point( Math.random() * 20 - 10, - ( Math.random() * 20 + 20 ) );
		
		this.rot1 = Math.random() * 300 - 150;
		this.rot2 = Math.random() * 300 - 150;
	}
	
	public animate( time : number ) : void
	{
		this.shape1.x += this.vel1.x * time;
		this.shape1.y += this.vel1.y * time;
		this.shape1.rotation += this.rot1 * time;
		this.shape2.x += this.vel2.x * time;
		this.shape2.y += this.vel2.y * time;
		this.shape2.rotation += this.rot2 * time;
	}
}
