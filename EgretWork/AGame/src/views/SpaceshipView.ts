class SpaceshipView extends egret.Sprite
{
	constructor()
	{
        super();
		// this.graphics.beginFill( 0xFFFFFF );
		// this.graphics.moveTo( 20, 0 );
		// this.graphics.lineTo( -14, 14 );
		// this.graphics.lineTo( -8, 0 );
		// this.graphics.lineTo( -14, -14 );
		// this.graphics.lineTo( 20, 0 );
		// this.graphics.endFill();

		let content:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
		let img:egret.Bitmap = new egret.Bitmap();
		img.texture = RES.getRes("hero_png");
		img.x = -img.texture.textureWidth*0.5;
		img.y = -img.texture.textureHeight*0.5;
		this.addChild(img);
	}
	
}
