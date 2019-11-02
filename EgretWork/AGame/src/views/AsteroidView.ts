class AsteroidView extends egret.Shape
{
    constructor( radius : number )
    {
        super();
        let angle : number = 0;
        this.graphics.beginFill( 0xFFFFFF );
        this.graphics.moveTo( radius, 0 );
        while( angle < Math.PI * 2 )
        {
            let length : number = ( 0.75 + Math.random() * 0.25 ) * radius;
            let posX : number = Math.cos( angle ) * length;
            let posY : number = Math.sin( angle ) * length;
            this.graphics.lineTo( posX, posY );
            angle += Math.random() * 0.5;
        }
        this.graphics.lineTo( radius, 0 );
        this.graphics.endFill();
    }
}
