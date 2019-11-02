namespace ash {

    export class Signal
    {
        private nodes:Array<ListenerNode>;
		private nodesCache:Array<ListenerNode>;
        private dispatching:boolean;


       constructor()
        {
            this.nodes = new Array<ListenerNode>();
			this.nodesCache = new  Array<ListenerNode>();
        }

		public dispatch( ...args:any[] ) : void
		{
			for (let node of this.nodes)
			{
				node.listener.apply(args);
				if( node.once )
				{
					this.remove( node.listener );
				}
			}
		}

		
		public get numListeners() : number
		{
			return this.nodes.length;
		}

		private isContain( listener : ash.FuncHandler ) : boolean
		{
			for (let node of this.nodes)
			{
				if (node.listener == listener) return true;
			}
			return false;
		}

		public add( listener : ash.FuncHandler ) : void
		{
			if (this.isContain(listener)) return;
			let node:ListenerNode = this.createNode();
			node.listener = listener;
			this.addNode(node);
		}
		
		public addOnce( listener : ash.FuncHandler ) : void
		{
			if (this.isContain(listener)) return;
			let node:ListenerNode = this.createNode();
			node.listener = listener;
			node.once = true;
			this.addNode(node);
		}
		
		protected addNode( node : ListenerNode ) : void
		{
			this.nodes.push(node);
		}

		public remove( listener : ash.FuncHandler ) : void
		{
			if ( !listener ) return;

			let num:number = this.nodes.length;
			for ( let i:number = num - 1; 0; i-- )
			{
				if ( this.nodes[i].listener == listener )
				{
					this.disposeNode( this.nodes[i] );
					this.nodes.splice( i, 1 );
				}
			}
		}
		
		public removeAll() : void
		{
			for (let node of this.nodes)
			{
				this.disposeNode(node);
			}
			this.nodes.splice(0);
		}

		private createNode() : ListenerNode
		{
			if (this.nodesCache.length > 0)
			{
				return this.nodesCache.splice(this.nodesCache.length - 1)[0];
			}
			else
			{
				return new ListenerNode();
			}
		}

		private disposeNode( node : ListenerNode ) : void
		{
			if (!node) return;

			node.listener = null;
			node.once = false;
			this.nodesCache.push(node);
		}

		public releaseCache() : void
		{
			this.nodesCache.splice(0);
		}
    }

}