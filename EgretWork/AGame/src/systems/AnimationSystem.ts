class AnimationSystem extends ash.System
{
    private nodeList : ash.NodeList;

	constructor()
	{
		super( );
	}

    public addToEngine( engine : ash.Engine ) : void
    {
        this.nodeList = engine.getNodeList( AnimationNode );
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

	private updateNode( node : AnimationNode, time : number ) : void
	{
		node.animation.animation.animate( time );
	}
}
