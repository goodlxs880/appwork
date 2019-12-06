class EntityCreator
{
    private engine : ash.Engine;
    private config : GameConfig;
    private waitEntity : ash.Entity;

    constructor( engine : ash.Engine, config : GameConfig )
    {
        this.engine = engine;
        this.config = config;
    }

    public destroyEntity( entity : ash.Entity ) : void
    {
        this.engine.removeEntity( entity );
    }

    public createBackGound(offsetY : number) : ash.Entity
    {
        let bgEntity : ash.Entity = new ash.Entity()
            .add( new CDisplay( new BackGoundView(this.config) ) )
            .add( new CPosition( this.config.width*0.5, offsetY, 0 ) )
            .add( new CBackGround( 50 ) )
            ;
        
        this.engine.addEntity( bgEntity );
        return bgEntity;
    }

    public createGame() : ash.Entity
    {
        let hud : HudView = new HudView();
        let sounds : Array<CSound> = new Array<CSound>();
        sounds.push( new CSound( "bgm_mp3", -1 ) );
        
        let gameEntity : ash.Entity = new ash.Entity( "game" )
            .add( new CGameState() )
            .add( new CHud( hud ) )
            .add( new CDisplay( hud ) )
            .add( new CPosition( 0, 0, 0 ) )
            .add( new CAudio(sounds) )
            ;
        this.engine.addEntity( gameEntity );
        return gameEntity;
    }

    public createWaitForClick() : ash.Entity
    {
        if( !this.waitEntity )
        {
            let waitView : WaitForStartView = new WaitForStartView( this.config );
            
            let waitEntity : ash.Entity = new ash.Entity( "wait" )
                .add( new CWaitForStart( waitView ) )
                .add( new CDisplay( waitView ) )
                .add( new CPosition( 0, 0, 0 ) );
            this.waitEntity = waitEntity;
        }
        this.waitEntity.get( CWaitForStart ).startGame = false;
        this.engine.addEntity( this.waitEntity );
        return this.waitEntity;
    }

    public createAsteroid( radius : number, x : number, y : number ) : ash.Entity
    {
        let asteroid : ash.Entity = new ash.Entity();
        
        let fsm : ash.EntityStateMachine = new ash.EntityStateMachine( asteroid );
        
        fsm.createState( "alive" )
            .add( CMotion ).withInstance( new CMotion( ( Math.random() - 0.5 ) * 20 * ( 80 - radius ), ( Math.random() - 0.5 ) * 20 * ( 80 - radius ), Math.random() * 2 - 1, 0 ) )
            .add( CCollision ).withInstance( new CCollision( radius ) )
            .add( CDisplay ).withInstance( new CDisplay( new AsteroidView( radius ) ) )
            ;
        
        let deathView : AsteroidDeathView = new AsteroidDeathView( radius );
        fsm.createState( "destroyed" )
            .add( CDeathThroes ).withInstance( new CDeathThroes( 3 ) )
            .add( CDisplay ).withInstance( new CDisplay( deathView ) )
            .add( CAnimation ).withInstance( new CAnimation( deathView ) )
            ;
        
        let sounds : Array<CSound> = new Array<CSound>();
        sounds.push( new CSound( "boom_mp3", 1 ) );

        asteroid
            .add( new CAsteroid( fsm ) )
            .add( new CPosition( x, y, 0 ) )
            .add( new CAudio( sounds ) );
            
        fsm.changeState( "alive" );
        this.engine.addEntity( asteroid );
        return asteroid;
    }

    public createSpaceship() : ash.Entity
    {
        let spaceship : ash.Entity = new ash.Entity();
        let fsm : ash.EntityStateMachine = new ash.EntityStateMachine( spaceship );
        
        fsm.createState( "playing" )
            .add( CMotion ).withInstance( new CMotion( 0, 0, 0, 15 ) )
            .add( CMotionControls ).withInstance( new CMotionControls( 65, 68, 87, 83, 100, 3 ) )
            .add( CGun ).withInstance( new CGun( 8, 0, 0.3, 4 ) )
            .add( CGunControls ).withInstance( new CGunControls( 32 ) )
            .add( CCollision ).withInstance( new CCollision( 9 ) )
            .add( CDisplay ).withInstance( new CDisplay( new SpaceshipView() ) );
        
        let deathView : SpaceshipBoomView = new SpaceshipBoomView();
        fsm.createState( "destroyed" )
            .add( CDeathThroes ).withInstance( new CDeathThroes( 3 ) ) 
            .add( CDisplay ).withInstance( new CDisplay( deathView ) )
            .add( CAnimation ).withInstance( new CAnimation( deathView ) );
        
        let sounds : Array<CSound> = new Array<CSound>();
        sounds.push( new CSound( "bullet_mp3", 1 ) );
        sounds.push( new CSound( "boom_mp3", 1 ) );

        spaceship
            .add( new CSpaceship( fsm ) )
            .add( new CPosition( this.config.width * 0.5, this.config.height - 200, -Math.PI*0.5 ) )
            .add( new CAudio( sounds ) )
            ;
            
        fsm.changeState( "playing" );
        this.engine.addEntity( spaceship );
        return spaceship;
    }

    public createUserBullet( gun : CGun, parentPosition : CPosition ) : ash.Entity
    {
        let cos : number = Math.cos( parentPosition.rotation );
        let sin : number = Math.sin( parentPosition.rotation );
        let bullet : ash.Entity = new ash.Entity()
            .add( new CBullet( gun.bulletLifetime ) )
            .add( new CPosition(
                cos * gun.offsetFromParent.x - sin * gun.offsetFromParent.y + parentPosition.position.x,
                sin * gun.offsetFromParent.x + cos * gun.offsetFromParent.y + parentPosition.position.y, 0 ) )
            .add( new CCollision( 10 ) )
            .add( new CMotion( cos * 1500, sin * 1500, 0, 0 ) )
            .add( new CDisplay( new BulletView( parentPosition.rotation ) ) )
            ;
        this.engine.addEntity( bullet );
        return bullet;
    }

}