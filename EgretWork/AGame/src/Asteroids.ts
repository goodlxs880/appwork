class Asteroids
{
    private container : egret.DisplayObjectContainer;
	private engine : ash.Engine;
	private tickProvider : ash.FrameTickProvider;
	private creator : EntityCreator;
	private keyPoll : KeyPoll;
	private config : GameConfig;
	
    constructor( container : egret.DisplayObjectContainer, width : number, height : number )
	{
		this.container = container;
		this.prepare( width, height );
	}
	
	private prepare( width : number, height : number ) : void
	{
		let engine = new ash.Engine();
		let creator = new EntityCreator( engine );
		KeyPoll.instance.init( this.container.stage );
		let keyPoll = KeyPoll.instance;
		let config = new GameConfig();
		config.width = width;
		config.height = height;

		engine.addSystem( new SWaitForStart( creator ), 		SystemPriorities.preUpdate );
		engine.addSystem( new SGameManager( creator, config ), 	SystemPriorities.preUpdate );
		engine.addSystem( new SMotionControl( keyPoll ), 		SystemPriorities.update );
		engine.addSystem( new SGunControl( keyPoll, creator ), 	SystemPriorities.update );
		engine.addSystem( new SBulletAge( creator ), 			SystemPriorities.update );
		engine.addSystem( new SDeathThroes( creator ), 			SystemPriorities.update );
		engine.addSystem( new SMovement( config ), 				SystemPriorities.move );
		engine.addSystem( new SCollision( creator ), 			SystemPriorities.resolveCollisions );
		engine.addSystem( new SAnimation(), 					SystemPriorities.animate );
		engine.addSystem( new SHud(), 							SystemPriorities.animate );
		engine.addSystem( new SRender( this.container ), 		SystemPriorities.render );
		engine.addSystem( new SAudio(), 						SystemPriorities.render );
		
		creator.createWaitForClick();
		creator.createGame();

		this.engine = engine;
	}
	
	public start() : void
	{
		this.tickProvider = new ash.FrameTickProvider( this.container );
		this.tickProvider.add( new ash.FuncHandler( this.engine.update, this.engine ) );
		this.tickProvider.start();
	}

}