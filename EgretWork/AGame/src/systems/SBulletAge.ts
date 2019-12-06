class SBulletAge extends ash.System
{
	private creator : EntityCreator;
    private nodeList : ash.NodeList;
	private config : GameConfig;
	
	constructor( creator : EntityCreator, config : GameConfig )
	{
		super();
		this.creator = creator;
		this.config = config;
	}

    public addToEngine( engine : ash.Engine ) : void
    {
        this.nodeList = engine.getNodeList( NBulletAge );
    }

    public update( time : number ) : void
    {
        for( let node = this.nodeList.head; node; node = node.next )
        {
            this.updateNode( node, time );
        }
    }

    public removeFromEngine( engine : ash.Engine ) : void
	{
			
		this.nodeList = null;
	}

	private updateNode( node : NBulletAge, time : number ) : void
	{
		let bullet : CBullet = node.bullet;
		let position : CPosition = node.position;
		let motion : CMotion = node.motion;

		let nextX : number = position.position.x + motion.velocity.x * time;
		let nextY : number = position.position.y + motion.velocity.y * time;

		if ( nextX < 0 || nextX >= this.config.width || nextY < 0  || nextY >= this.config.height )
		{
			bullet.lifeRemaining = 0;
		}

		bullet.lifeRemaining -= time;
		if ( bullet.lifeRemaining <= 0 )
		{
			this.creator.destroyEntity( node.entity );
		}
	}
}
