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

		if ( this.keyPoll.isDown( control.left ) )
		{
			position.rotation -= control.rotationRate * time;
		}

		if ( this.keyPoll.isDown( control.right ) )
		{
			position.rotation += control.rotationRate * time;
		}

		if ( this.keyPoll.isDown( control.accelerate ) )
		{
			// motion.velocity.x += Math.cos( position.rotation ) * control.accelerationRate * time;
			// motion.velocity.y += Math.sin( position.rotation ) * control.accelerationRate * time;
			motion.velocity.x = Math.cos( position.rotation ) * 100;
			motion.velocity.y = Math.sin( position.rotation ) * 100;
		}

		if ( this.keyPoll.isUp( control.accelerate ) )
		{
			motion.velocity.x = 0;
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
