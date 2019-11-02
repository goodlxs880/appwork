class WaitForStartSystem extends ash.System
{
	private engine : ash.Engine;
	private creator : EntityCreator;
	
	private gameNodes : ash.NodeList;
	private waitNodes : ash.NodeList;
	private asteroids : ash.NodeList;
	
	constructor( creator : EntityCreator )
	{
        super();
		this.creator = creator;
	}

	public addToEngine( engine : ash.Engine ) : void
	{
		this.engine = engine;
		this.waitNodes = engine.getNodeList( WaitForStartNode );
		this.gameNodes = engine.getNodeList( GameNode );
		this.asteroids = engine.getNodeList( AsteroidCollisionNode );
	}
	
	public update( time : number ) : void
	{
		let node : WaitForStartNode = this.waitNodes.head;
		let game : GameNode = this.gameNodes.head;
		if( node && node.wait.startGame && game )
		{
			for( let asteroid = this.asteroids.head; asteroid; asteroid = asteroid.next )
			{
				this.creator.destroyEntity( asteroid.entity );
			}

			game.state.setForStart();
			node.wait.startGame = false;
			this.engine.removeEntity( node.entity );
		}
	}

	public removeFromEngine( engine : ash.Engine ) : void
	{
		this.gameNodes = null;
		this.waitNodes = null;
	}
}
