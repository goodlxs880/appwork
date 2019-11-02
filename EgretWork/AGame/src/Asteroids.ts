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

		

		engine.addSystem( new WaitForStartSystem( creator ), SystemPriorities.preUpdate );
		engine.addSystem( new GameManager( creator, config ), SystemPriorities.preUpdate );
		engine.addSystem( new MotionControlSystem( keyPoll ), SystemPriorities.update );
		engine.addSystem( new GunControlSystem( keyPoll, creator ), SystemPriorities.update );
		engine.addSystem( new BulletAgeSystem( creator ), SystemPriorities.update );
		engine.addSystem( new DeathThroesSystem( creator ), SystemPriorities.update );
		engine.addSystem( new MovementSystem( config ), SystemPriorities.move );
		engine.addSystem( new CollisionSystem( creator ), SystemPriorities.resolveCollisions );
		engine.addSystem( new AnimationSystem(), SystemPriorities.animate );
		engine.addSystem( new HudSystem(), SystemPriorities.animate );
		engine.addSystem( new RenderSystem( this.container ), SystemPriorities.render );
		// engine.addSystem( new AudioSystem(), SystemPriorities.render );
		
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