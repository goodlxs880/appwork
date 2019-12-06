class CMotionControls implements ash.IComponent
{
	public left : number = 0;
	public right : number = 0;
	public up : number = 0;
	public down : number = 0;
	
	public accelerationRate : number = 0;
	public rotationRate : number = 0;
	
	constructor( left : number, right : number, up : number, down: number, accelerationRate : number, rotationRate : number )
	{
		this.left = left;
		this.right = right;
		this.up = up;
		this.down = down;
		this.accelerationRate = accelerationRate;
		this.rotationRate = rotationRate;
	}
}
