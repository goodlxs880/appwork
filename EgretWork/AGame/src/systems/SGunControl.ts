class SGunControl extends ash.System
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
        this.nodeList = engine.getNodeList( NGunControl );
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

	private updateNode( node : NGunControl, time : number ) : void
	{
		let control : CGunControls = node.control;
		let position : CPosition = node.position;
		let gun : CGun = node.gun;

		gun.shooting = this.keyPoll.isDown( control.trigger );
		gun.timeSinceLastShot += time;
		if ( gun.shooting && gun.timeSinceLastShot >= gun.minimumShotInterval )
		{
			this.creator.createUserBullet( gun, position );
			let sound : CSound = node.audio.sounds.get("bullet_mp3");
				if ( sound )
			{
				sound.triggerPlay = true;
			}
			gun.timeSinceLastShot = 0;
		}
	}
}
