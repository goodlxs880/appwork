class EntityCreator
{
    private engine : ash.Engine;
    private waitEntity : ash.Entity;

    constructor( engine : ash.Engine )
    {
        this.engine = engine;
    }

    public destroyEntity( entity : ash.Entity ) : void
    {
        this.engine.removeEntity( entity );
    }

    public createGame() : ash.Entity
    {
        let hud : HudView = new HudView();
        
        let gameEntity : ash.Entity = new ash.Entity( "game" )
            .add( new GameState() )
            .add( new Hud( hud ) )
            .add( new Display( hud ) )
            .add( new CPosition( 0, 0, 0 ) );
        this.engine.addEntity( gameEntity );
        return gameEntity;
    }

    public createWaitForClick() : ash.Entity
    {
        if( !this.waitEntity )
        {
            let waitView : WaitForStartView = new WaitForStartView();
            
            let waitEntity : ash.Entity = new ash.Entity( "wait" )
                .add( new WaitForStart( waitView ) )
                .add( new Display( waitView ) )
                .add( new CPosition( 0, 0, 0 ) );
            this.waitEntity = waitEntity;
        }
        this.waitEntity.get( WaitForStart ).startGame = false;
        this.engine.addEntity( this.waitEntity );
        return this.waitEntity;
    }

    public createAsteroid( radius : number, x : number, y : number ) : ash.Entity
    {
        let asteroid : ash.Entity = new ash.Entity();
        
        let fsm : ash.EntityStateMachine = new ash.EntityStateMachine( asteroid );
        
        fsm.createState( "alive" )
            .add( Motion ).withInstance( new Motion( ( Math.random() - 0.5 ) * 4 * ( 50 - radius ), ( Math.random() - 0.5 ) * 4 * ( 50 - radius ), Math.random() * 2 - 1, 0 ) )
            .add( Collision ).withInstance( new Collision( radius ) )
            .add( Display ).withInstance( new Display( new AsteroidView( radius ) ) )
            ;
        
        let deathView : AsteroidDeathView = new AsteroidDeathView( radius );
        fsm.createState( "destroyed" )
            .add( DeathThroes ).withInstance( new DeathThroes( 3 ) )
            .add( Display ).withInstance( new Display( deathView ) )
            .add( Animation ).withInstance( new Animation( deathView ) )
            ;
        
        asteroid
            .add( new Asteroid( fsm ) )
            .add( new CPosition( x, y, 0 ) );
            //.add( new Audio );
            
        fsm.changeState( "alive" );
        this.engine.addEntity( asteroid );
        return asteroid;
    }

    public createSpaceship() : ash.Entity
    {
        let spaceship : ash.Entity = new ash.Entity();
        let fsm : ash.EntityStateMachine = new ash.EntityStateMachine( spaceship );
        
        fsm.createState( "playing" )
            .add( Motion ).withInstance( new Motion( 0, 0, 0, 15 ) )
            .add( MotionControls ).withInstance( new MotionControls( 65, 68, 87, 100, 3 ) )
            .add( Gun ).withInstance( new Gun( 8, 0, 0.3, 4 ) )
            .add( GunControls ).withInstance( new GunControls( 32 ) )
            // .add( Collision ).withInstance( new Collision( 9 ) )
            .add( Display ).withInstance( new Display( new SpaceshipView() ) );
        
        let deathView : SpaceshipDeathView = new SpaceshipDeathView();
        fsm.createState( "destroyed" )
            .add( DeathThroes ).withInstance( new DeathThroes( 5 ) ) 
            .add( Display ).withInstance( new Display( deathView ) )
            .add( Animation ).withInstance( new Animation( deathView ) );
        
        spaceship
            .add( new Spaceship( fsm ) )
            .add( new CPosition( 300, 225, 0 ) );
            // .add( new Audio() )
            
        fsm.changeState( "playing" );
        this.engine.addEntity( spaceship );
        return spaceship;
    }

    public createUserBullet( gun : Gun, parentPosition : CPosition ) : ash.Entity
    {
        let cos : number = Math.cos( parentPosition.rotation );
        let sin : number = Math.sin( parentPosition.rotation );
        let bullet : ash.Entity = new ash.Entity()
            .add( new Bullet( gun.bulletLifetime ) )
            .add( new CPosition(
                cos * gun.offsetFromParent.x - sin * gun.offsetFromParent.y + parentPosition.position.x,
                sin * gun.offsetFromParent.x + cos * gun.offsetFromParent.y + parentPosition.position.y, 0 ) )
            .add( new Collision( 0 ) )
            .add( new Motion( cos * 150, sin * 150, 0, 0 ) )
            .add( new Display( new BulletView() ) );
        this.engine.addEntity( bullet );
        return bullet;
    }

}