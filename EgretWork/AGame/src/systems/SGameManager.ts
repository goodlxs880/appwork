class SGameManager extends ash.System
{
	private config : GameConfig;
	private creator : EntityCreator;
	
	private gameNodes : ash.NodeList;
	private spaceships : ash.NodeList;
	private asteroids : ash.NodeList;
	private bullets : ash.NodeList;

	constructor( creator : EntityCreator, config : GameConfig )
	{
        super();
		this.creator = creator;
		this.config = config;
	}

	public addToEngine( engine : ash.Engine ) : void
	{
		this.gameNodes = engine.getNodeList( NGame );
		this.spaceships = engine.getNodeList( NSpaceship );
		this.asteroids = engine.getNodeList( NAsteroidCollision );
		this.bullets = engine.getNodeList( NBulletCollision );
	}
	
	public update( time : number ) : void
	{
		let node : NGame = this.gameNodes.head;
		if( node && node.state.playing )
		{
			if( this.spaceships.empty )
			{
				if( node.state.lives > 0 )
				{
					let newSpaceshipPosition : egret.Point = new egret.Point( this.config.width * 0.5, this.config.height * 0.5 );
					let clearToAddSpaceship : boolean = true;
					for( let asteroid = this.asteroids.head; asteroid; asteroid = asteroid.next )
					{
						if( egret.Point.distance( asteroid.position.position, newSpaceshipPosition ) <= asteroid.collision.radius + 50 )
						{
							clearToAddSpaceship = false;
							break;
						}
					}
					if( clearToAddSpaceship )
					{
						this.creator.createSpaceship();
					}
				}
				else
				{
					node.state.playing = false;
					this.creator.createWaitForClick();
				}
			}
			
			if( this.asteroids.empty && this.bullets.empty && !this.spaceships.empty )
			{
				// next level
				let spaceship : NSpaceship = this.spaceships.head;
				node.state.level++;
				let asteroidCount : number = 30 + node.state.level;
				for( let i:number = 0; i < asteroidCount; ++i )
				{
					// check not on top of spaceship
					do
					{
						var position : egret.Point = new egret.Point( Math.random() * this.config.width, Math.random() * this.config.height );
					}
					while ( egret.Point.distance( position, spaceship.position.position ) <= 80 );
					this.creator.createAsteroid( 30, position.x, position.y );
				}
			}
		}
	}

	public removeFromEngine( engine : ash.Engine ) : void
	{
		this.gameNodes = null;
		this.spaceships = null;
		this.asteroids = null;
		this.bullets = null;
	}
}
