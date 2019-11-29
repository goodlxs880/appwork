class CDisplay implements ash.IComponent
{
	public displayObject : egret.DisplayObject = null;
	
	constructor( displayObject : egret.DisplayObject )
	{
		this.displayObject = displayObject;
	}
}
