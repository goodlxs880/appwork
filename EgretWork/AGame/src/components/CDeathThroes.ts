class CDeathThroes implements ash.IComponent
{
	public countdown : number;
	
	constructor( duration : number )
	{
		this.countdown = duration;
	}
}
