class GunControlSystem extends ash.System
{
	private keyPoll : KeyPoll;
	private creator : EntityCreator;
    private nodeList : ash.NodeList;
	
	constructor( keyPoll : KeyPoll, creator : EntityCreator )
	{
		super();
		this.keyPoll = keyPoll;
		this.creator = creator;
	}

    public addToEngine( engine : ash.Engine ) : void
    {
        this.nodeList = engine.getNodeList( GunControlNode );
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

	private updateNode( node : GunControlNode, time : number ) : void
	{
		let control : GunControls = node.control;
		let position : CPosition = node.position;
		let gun : Gun = node.gun;

		gun.shooting = this.keyPoll.isDown( control.trigger );
		gun.timeSinceLastShot += time;
		if ( gun.shooting && gun.timeSinceLastShot >= gun.minimumShotInterval )
		{
			this.creator.createUserBullet( gun, position );
			// node.audio.play( ShootGun );
			gun.timeSinceLastShot = 0;
		}
	}
}
