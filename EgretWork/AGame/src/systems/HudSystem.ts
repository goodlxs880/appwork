class HudSystem extends ash.System
{

    private nodeList : ash.NodeList;

	constructor()
	{
		super();
	}
	
    public addToEngine( engine : ash.Engine ) : void
    {
        this.nodeList = engine.getNodeList( HudNode );
    }

    public update( time : number ) : void
    {
        for( let node = this.nodeList.head; node; node = node.next )
        {
            node.hud.view.setLives( node.state.lives );
		    node.hud.view.setScore( node.state.hits );
        }
    }

    public removeFromEngine( engine : ash.Engine ) : void
	{
			
		this.nodeList = null;
	}
}
