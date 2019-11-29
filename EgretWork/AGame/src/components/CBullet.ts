class CBullet implements ash.IComponent
{
	public lifeRemaining : number;
	
	constructor( lifetime : number )
	{
		this.lifeRemaining = lifetime;
	}
}
