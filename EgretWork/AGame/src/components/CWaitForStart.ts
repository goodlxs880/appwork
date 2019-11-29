class CWaitForStart implements ash.IComponent
{
	public waitForStart : WaitForStartView;
	public startGame : boolean;

	
	constructor( waitForStart : WaitForStartView )
	{
		this.waitForStart = waitForStart;
		waitForStart.click.add( new ash.FuncHandler( this.setStartGame, this ) );
	}

	public setStartGame() : void
	{
		this.startGame = true;
	}
}
