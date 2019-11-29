class SDeathThroes extends ash.System
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
        this.nodeList = engine.getNodeList( NDeathThroes );
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

	private updateNode( node : NDeathThroes, time : number ) : void
	{
		node.death.countdown -= time;
		if ( node.death.countdown <= 0 )
		{
			this.creator.destroyEntity( node.entity );
		}
	}
}
