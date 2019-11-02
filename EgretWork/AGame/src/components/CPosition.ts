class CPosition
{
	public position : egret.Point;
	public rotation : number = 0;
	
	constructor( x : number, y : number, rotation : number )
	{
		this.position = new egret.Point( x, y );
		this.rotation = rotation;
	}
}
