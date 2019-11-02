class Motion
{
	public velocity : egret.Point = new egret.Point();
	public angularVelocity : number = 0;
	public damping : number = 0;
	
	constructor( velocityX : number, velocityY : number, angularVelocity : number, damping : number )
	{
		this.velocity = new egret.Point( velocityX, velocityY );
		this.angularVelocity = angularVelocity;
		this.damping = damping;
	}
}
