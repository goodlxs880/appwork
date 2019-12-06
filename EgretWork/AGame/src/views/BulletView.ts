class BulletView extends egret.Sprite
{
	constructor( rotation:number )
	{
        super();
		// this.graphics.beginFill( 0xFFFFFF );
		// this.graphics.drawCircle( 0, 0, 2 );
		// this.graphics.endFill();
		
		let content:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
		let img:egret.Bitmap = new egret.Bitmap();
		img.texture = RES.getRes("bullet_png");
		img.x = -img.texture.textureWidth*0.5;
		img.y = -img.texture.textureHeight*0.5;
		content.rotation = rotation*180/Math.PI;
		content.addChild(img);
		this.addChild(content);
	}
}
