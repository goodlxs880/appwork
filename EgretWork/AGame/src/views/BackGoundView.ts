class BackGoundView extends egret.Sprite
{
	constructor(config : GameConfig)
	{
        super();
		
		// let content:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
		let img:egret.Bitmap = new egret.Bitmap();
		img.texture = RES.getRes("bg_jpg");
		img.width = config.height;
		img.height = config.height;
		img.x =  - config.height*0.5;
		//img.y = -img.texture.textureHeight*0.5;
		// content.rotation = rotation*180/Math.PI;
		// content.addChild(img);
		
		this.addChild(img);
	}
}
