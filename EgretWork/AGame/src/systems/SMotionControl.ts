class SMotionControl extends ash.System
{
	private keyPoll : KeyPoll;
    private nodeList : ash.NodeList;
	
	constructor( keyPoll : KeyPoll )
	{
		super();
		this.keyPoll = keyPoll;
	}

	private updateNode( node : NMotionControl, time : number ) : void
	{
		let control : CMotionControls = node.control;
		let position : CPosition = node.position;
		let motion : CMotion = node.motion;

		if ( this.keyPoll.isDown( control.left ) && this.keyPoll.isUp( control.right ) )
		{
			motion.velocity.x = -300;
		} 
		else if ( this.keyPoll.isUp( control.left ) && this.keyPoll.isDown( control.right ) )
		{
			motion.velocity.x = 300;
		}
		else
		{
			motion.velocity.x = 0;
		}

		if ( this.keyPoll.isDown( control.up ) && this.keyPoll.isUp( control.down ) )
		{
			motion.velocity.y = -300;
		} 
		else if ( this.keyPoll.isUp( control.up ) && this.keyPoll.isDown( control.down ) )
		{
			motion.velocity.y = 300;
		}
		else
		{
			motion.velocity.y = 0;
		}

	}

    public addToEngine( engine : ash.Engine ) : void
    {
        this.nodeList = engine.getNodeList( NMotionControl );
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
}
