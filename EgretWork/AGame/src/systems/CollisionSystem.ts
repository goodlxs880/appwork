class CollisionSystem extends ash.System
{
	private creator : EntityCreator;
	
	private games : ash.NodeList;
	private spaceships : ash.NodeList;
	private asteroids : ash.NodeList;
	private bullets : ash.NodeList;

	constructor( creator : EntityCreator )
	{
        super();
		this.creator = creator;
	}

	public addToEngine( engine : ash.Engine ) : void
	{
		this.games = engine.getNodeList( GameNode );
		this.spaceships = engine.getNodeList( SpaceshipCollisionNode );
		this.asteroids = engine.getNodeList( AsteroidCollisionNode );
		this.bullets = engine.getNodeList( BulletCollisionNode );
	}
	
	public update( time : number ) : void
	{
		let bullet : any;
		let asteroid : any;
		let spaceship : any;

		for ( bullet = this.bullets.head; bullet; bullet = bullet.next )
		{
			for ( asteroid = this.asteroids.head; asteroid; asteroid = asteroid.next )
			{
				if ( egret.Point.distance( asteroid.position.position, bullet.position.position ) <= asteroid.collision.radius )
				{
					this.creator.destroyEntity( bullet.entity );
					if ( asteroid.collision.radius > 10 )
					{
						this.creator.createAsteroid( asteroid.collision.radius - 10, asteroid.position.position.x + Math.random() * 10 - 5, asteroid.position.position.y + Math.random() * 10 - 5 );
						this.creator.createAsteroid( asteroid.collision.radius - 10, asteroid.position.position.x + Math.random() * 10 - 5, asteroid.position.position.y + Math.random() * 10 - 5 );
					}
					asteroid.asteroid.fsm.changeState( "destroyed" );
					
					// asteroid.audio.play( ExplodeAsteroid );
					if( this.games.head )
					{
						this.games.head.state.hits++;
					}
					break;
				}
			}
		}

		for ( spaceship = this.spaceships.head; spaceship; spaceship = spaceship.next )
		{
			for ( asteroid = this.asteroids.head; asteroid; asteroid = asteroid.next )
			{
				if ( egret.Point.distance( asteroid.position.position, spaceship.position.position ) <= asteroid.collision.radius + spaceship.collision.radius )
				{
					spaceship.spaceship.fsm.changeState( "destroyed" );
					// spaceship.audio.play( ExplodeShip );
					if( this.games.head )
					{
						this.games.head.state.lives--;
					}
					break;
				}
			}
		}
	}

	public removeFromEngine( engine : ash.Engine ) : void
	{
		this.spaceships = null;
		this.asteroids = null;
		this.bullets = null;
	}
}
