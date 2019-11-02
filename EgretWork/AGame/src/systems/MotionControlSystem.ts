class MotionControlSystem extends ash.System
{
	private keyPoll : KeyPoll;
    private nodeList : ash.NodeList;
	
	constructor( keyPoll : KeyPoll )
	{
		super();
		this.keyPoll = keyPoll;
	}

	private updateNode( node : MotionControlNode, time : number ) : void
	{
		let control : MotionControls = node.control;
		let position : CPosition = node.position;
		let motion : Motion = node.motion;

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
			motion.velocity.x += Math.cos( position.rotation ) * control.accelerationRate * time;
			motion.velocity.y += Math.sin( position.rotation ) * control.accelerationRate * time;
		}
	}

    public addToEngine( engine : ash.Engine ) : void
    {
        this.nodeList = engine.getNodeList( MotionControlNode );
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
