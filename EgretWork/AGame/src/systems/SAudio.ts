class SAudio extends ash.System
{
    private nodeList : ash.NodeList;

	constructor()
	{
		super( );
	}

    public addToEngine( engine : ash.Engine ) : void
    {
        this.nodeList = engine.getNodeList( NAudio );
    }

    public update( time : number ) : void
    {
        let sounds : Map<string, CSound>;
        let soundPlayer : egret.Sound;
        for( let node = this.nodeList.head; node; node = node.next )
        {
            sounds = node.audio.sounds;
            sounds.forEach( function( sound : CSound, fileName : string ){
                if ( sound.triggerPlay )
                {
                    sound.triggerPlay = false;
                    if ( sound.soundPlayer != null )
                    {
                        sound.soundPlayer.stop();
                    }
                    
                    soundPlayer = RES.getRes( sound.fileName );
                    sound.soundPlayer = soundPlayer.play( 0, sound.loops );
                }
            } )
        }
    }

    public removeFromEngine( engine : ash.Engine ) : void
	{
		this.nodeList = null;
	}

}
