class Gun
{
	public shooting : boolean = false;
	public offsetFromParent : egret.Point;
	public timeSinceLastShot : number = 0;
	public minimumShotInterval : number = 0;
	public bulletLifetime : number = 0;
	
	constructor( offsetX : number, offsetY : number, minimumShotInterval : number, bulletLifetime : number )
	{
		this.offsetFromParent = new egret.Point( offsetX, offsetY );
		this.minimumShotInterval = minimumShotInterval;
		this.bulletLifetime = bulletLifetime;
	}
}
