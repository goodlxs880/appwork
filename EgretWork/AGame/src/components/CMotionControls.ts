class CMotionControls implements ash.IComponent
{
	public left : number = 0;
	public right : number = 0;
	public accelerate : number = 0;
	
	public accelerationRate : number = 0;
	public rotationRate : number = 0;
	
	constructor( left : number, right : number, accelerate : number, accelerationRate : number, rotationRate : number )
	{
		this.left = left;
		this.right = right;
		this.accelerate = accelerate;
		this.accelerationRate = accelerationRate;
		this.rotationRate = rotationRate;
	}
}
