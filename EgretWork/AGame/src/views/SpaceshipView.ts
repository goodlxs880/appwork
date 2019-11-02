class SpaceshipView extends egret.Shape
{
	constructor()
	{
        super();
		this.graphics.beginFill( 0xFFFFFF );
		this.graphics.moveTo( 10, 0 );
		this.graphics.lineTo( -7, 7 );
		this.graphics.lineTo( -4, 0 );
		this.graphics.lineTo( -7, -7 );
		this.graphics.lineTo( 10, 0 );
		this.graphics.endFill();
	}
	
}
