class SWaitForStart extends ash.System
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
		this.waitNodes = engine.getNodeList( NWaitForStart );
		this.gameNodes = engine.getNodeList( NGame );
		this.asteroids = engine.getNodeList( NAsteroidCollision );
	}
	
	public update( time : number ) : void
	{
		let node : NWaitForStart = this.waitNodes.head;
		let game : NGame = this.gameNodes.head;
		if( node && node.wait.startGame && game )
		{
			for( let asteroid = this.asteroids.head; asteroid; asteroid = asteroid.next )
			{
				this.creator.destroyEntity( asteroid.entity );
			}

			game.state.setForStart();
			let sound : CSound = game.audio.sounds.get("bgm_mp3");
			if ( sound )
			{
				sound.triggerPlay = true;
			}
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
