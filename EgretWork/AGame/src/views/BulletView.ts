class BulletView extends egret.Shape
{
	constructor()
	{
        super();
		this.graphics.beginFill( 0xFFFFFF );
		this.graphics.drawCircle( 0, 0, 2 );
		this.graphics.endFill();
	}
}
