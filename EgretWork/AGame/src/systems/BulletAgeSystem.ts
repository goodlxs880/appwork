class BulletAgeSystem extends ash.System
{
	private creator : EntityCreator;
    private nodeList : ash.NodeList;
	
	constructor( creator : EntityCreator )
	{
		super();
		this.creator = creator;
	}

    public addToEngine( engine : ash.Engine ) : void
    {
        this.nodeList = engine.getNodeList( BulletAgeNode );
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

	private updateNode( node : BulletAgeNode, time : number ) : void
	{
		let bullet : Bullet = node.bullet;
		bullet.lifeRemaining -= time;
		if ( bullet.lifeRemaining <= 0 )
		{
			this.creator.destroyEntity( node.entity );
		}
	}
}
