class RenderSystem extends ash.System
{
	public container : egret.DisplayObjectContainer;
	
	private nodeList : ash.NodeList;

	private _addToDisplay : ash.FuncHandler = new ash.FuncHandler( this.addToDisplay, this );
	private _removeFromDisplay : ash.FuncHandler = new ash.FuncHandler( this.removeFromDisplay, this );
	
	constructor( container : egret.DisplayObjectContainer )
	{
        super();
		this.container = container;
	}
	
	public addToEngine( engine : ash.Engine ) : void
	{
		this.nodeList = engine.getNodeList( RenderNode );
		for( let node = this.nodeList.head; node; node = node.next )
		{
			this.addToDisplay( node );
		}
		this.nodeList.nodeAdded.add( this._addToDisplay );
		this.nodeList.nodeRemoved.add( this._removeFromDisplay );
	}
	
	private addToDisplay( node : RenderNode ) : void
	{
		this.container.addChild( node.display.displayObject );
	}
	
	private removeFromDisplay( node : RenderNode ) : void
	{
		this.container.removeChild( node.display.displayObject );
	}
	
	public update( time : number ) : void
	{
		let position : CPosition;
		let display : Display;
		let displayObject : egret.DisplayObject;
		
		for( let node = this.nodeList.head; node; node = node.next )
		{
			display = node.display;
			displayObject = display.displayObject;
			position = node.position;
			
			displayObject.x = position.position.x;
			displayObject.y = position.position.y;
			displayObject.rotation = position.rotation * 180 / Math.PI;
		}
	}

	public removeFromEngine( engine : ash.Engine ) : void
	{
		this.nodeList = null;
	}
}
