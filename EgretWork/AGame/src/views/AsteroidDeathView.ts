class AsteroidDeathView extends egret.Sprite implements Animatable
{
    private static numDots : number = 8;
    
    private dots : Array<Dot>;
    
    constructor( radius : number )
    {
        super();
        this.dots = new Array<Dot>();
        for( let i : number = 0; i < AsteroidDeathView.numDots; ++i )
        {
            let dot : Dot = new Dot( radius );
            this.addChild( dot.image );
            this.dots.push( dot );
        }
    }
    
    public animate( time : number ) : void
    {
        for ( let i : number = 0; i < this.dots.length; i++ )
        {
            let dot : Dot = this.dots[i];
            dot.image.x += dot.velocity.x * time;
            dot.image.y += dot.velocity.y * time;
        }
    }
}

class Dot
{
	public velocity : egret.Point;
	public image : egret.Shape;
	
	constructor( maxDistance : number )
	{
		this.image = new egret.Shape();
		this.image.graphics.beginFill( 0xFFFFFF );
		this.image.graphics.drawCircle( 0, 0, 1 );
		this.image.graphics.endFill();
		let angle : number = Math.random() * 2 * Math.PI;
		let distance : number = Math.random() * maxDistance;
		this.image.x = Math.cos( angle ) * distance;
		this.image.y = Math.sin( angle ) * distance;
		let speed : number = Math.random() * 10 + 10;
		this.velocity = new egret.Point( Math.cos( angle ) * speed, Math.sin( angle ) * speed );
	}
}