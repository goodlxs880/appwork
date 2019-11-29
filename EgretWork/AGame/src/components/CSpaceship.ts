class CSpaceship implements ash.IComponent
{
	public fsm : ash.EntityStateMachine;
	
	constructor( fsm : ash.EntityStateMachine )
	{
		this.fsm = fsm;
	}
}
