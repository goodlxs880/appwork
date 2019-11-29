class CHud implements ash.IComponent
{
	public view : HudView;
	
	constructor( view : HudView )
	{
		this.view = view;
	}
}
