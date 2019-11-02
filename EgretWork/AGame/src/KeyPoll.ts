class KeyPoll
{

	private static _instance:KeyPoll;
	private states:egret.ByteArray;
	private dispObj:egret.DisplayObject;
	
	/**
	 * Constructor
	 * 
	 * @param displayObj a display object on which to test listen for keyboard events. To catch all key events use t
	 */
	constructor()  //
	{
		
	}
	
	public static get instance() : KeyPoll
	{
		if ( !KeyPoll._instance )
		{
			KeyPoll._instance = new KeyPoll();
		}
		return KeyPoll._instance;
	}

	public init( dispObj : egret.DisplayObject ) : void
	{
		let states = new egret.ByteArray();
		states.writeUnsignedInt( 0 );
		states.writeUnsignedInt( 0 );
		states.writeUnsignedInt( 0 );
		states.writeUnsignedInt( 0 );
		states.writeUnsignedInt( 0 );
		states.writeUnsignedInt( 0 );
		states.writeUnsignedInt( 0 );
		states.writeUnsignedInt( 0 );
		this.states = states;
		// dispObj.addEventListener( KeyboardEvent.KEY_DOWN, this.keyDownListener, false, true, 0 );
		// dispObj.addEventListener( KeyboardEvent.KEY_UP, this.keyUpListener, false, true, 0 );
		document.addEventListener( "keydown", KeyPoll.instance.keyDownListener );
		document.addEventListener( "keyup", KeyPoll.instance.keyUpListener );
		dispObj.addEventListener( egret.Event.ACTIVATE, KeyPoll.instance.activateListener, KeyPoll.instance, true, 0 );
		dispObj.addEventListener( egret.Event.DEACTIVATE, KeyPoll.instance.deactivateListener, KeyPoll.instance, true, 0 );
	}

	private keyDownListener( ev:KeyboardEvent ):void
	{
		KeyPoll.instance.states[ ev.keyCode >>> 3 ] |= 1 << (ev.keyCode & 7);
	}
	
	private keyUpListener( ev:KeyboardEvent ):void
	{
		KeyPoll.instance.states[ ev.keyCode >>> 3 ] &= ~(1 << (ev.keyCode & 7));
	}
	
	private activateListener( ev:Event ):void
	{
		for( let i:number = 0; i < 8; ++i )
		{
			this.states[ i ] = 0;
		}
	}

	private deactivateListener( ev:Event ):void
	{
		for( let i:number = 0; i < 8; ++i )
		{
			this.states[ i ] = 0;
		}
	}
	
	/**
	 * To test whether a key is down.
	 *
	 * @param keyCode code for the key to test.
	 *
	 * @return true if the key is down, false otherwise.
	 *
	 * @see isUp
	 */
	public isDown( keyCode:number ):boolean
	{
		return ( this.states[ keyCode >>> 3 ] & (1 << (keyCode & 7)) ) != 0;
	}
	
	/**
	 * To test whetrher a key is up.
	 *
	 * @param keyCode code for the key to test.
	 *
	 * @return true if the key is up, false otherwise.
	 *
	 * @see isDown
	 */
	public isUp( keyCode:number ):boolean
	{
		return ( this.states[ keyCode >>> 3 ] & (1 << (keyCode & 7)) ) == 0;
	}
}
