class SBackGround extends ash.System
{
	private engine : ash.Engine;
	private config : GameConfig;
	
	private nodeList : ash.NodeList;
	
	constructor( config : GameConfig )
	{
        super();
		this.config = config;
	}

	public addToEngine( engine : ash.Engine ) : void
	{
		this.engine = engine;
		this.nodeList = engine.getNodeList( NBackGround );
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

	private updateNode( node : NBackGround, time : number ) : void
	{
		let backGround : CBackGround = node.backGround;
		let position : CPosition = node.position;

		position.position.y += backGround.velocityY * time;
		if ( position.position.y < 0 )
		{
			position.position.y += this.config.height*2;
		}
		if ( position.position.y > this.config.height )
		{
			position.position.y -= this.config.height*2;
		}
		
	}
}
