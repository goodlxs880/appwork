class MovementSystem extends ash.System
{
	private config : GameConfig;
    private nodeList : ash.NodeList;
	
	constructor( config : GameConfig )
	{
        super();
		this.config = config;
	}

    public addToEngine( engine : ash.Engine ) : void
    {
        this.nodeList = engine.getNodeList( MovementNode );
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

	private updateNode( node : MovementNode, time : number ) : void
	{
		let position : CPosition = node.position;
		let motion : Motion = node.motion;

		position = node.position;
		motion = node.motion;
		position.position.x += motion.velocity.x * time;
		position.position.y += motion.velocity.y * time;
		if ( position.position.x < 0 )
		{
			position.position.x += this.config.width;
		}
		if ( position.position.x > this.config.width )
		{
			position.position.x -= this.config.width;
		}
		if ( position.position.y < 0 )
		{
			position.position.y += this.config.height;
		}
		if ( position.position.y > this.config.height )
		{
			position.position.y -= this.config.height;
		}
		position.rotation += motion.angularVelocity * time;
		if ( motion.damping > 0 )
		{
			var xDamp : number = Math.abs( Math.cos( position.rotation ) * motion.damping * time );
			var yDamp : number = Math.abs( Math.sin( position.rotation ) * motion.damping * time );
			if ( motion.velocity.x > xDamp )
			{
				motion.velocity.x -= xDamp;
			}
			else if ( motion.velocity.x < -xDamp )
			{
				motion.velocity.x += xDamp;
			}
			else
			{
				motion.velocity.x = 0;
			}
			if ( motion.velocity.y > yDamp )
			{
				motion.velocity.y -= yDamp;
			}
			else if ( motion.velocity.y < -yDamp )
			{
				motion.velocity.y += yDamp;
			}
			else
			{
				motion.velocity.y = 0;
			}
		}
	}
}
