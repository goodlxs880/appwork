namespace ash {

    export class Signal
    {
        private nodes:Array<ListenerNode>;
		private nodesCache:Array<ListenerNode>;
        private dispatching:boolean;


        public constructor()
        {
            this.nodes = new Array<ListenerNode>();
			this.nodesCache = new  Array<ListenerNode>();
        }

		public dispatch( ...args:any[] ) : void
		{
			for (let node of this.nodes)
			{
				node.listener.apply(null, args);
			}
		}

		
		public get numListeners() : number
		{
			return this.nodes.length;
		}

		private isContain( listener : Function ) : boolean
		{
			for (let node of this.nodes)
			{
				if (node.listener == listener) return true;
			}
			return false;
		}

		public add( listener : Function ) : void
		{
			if (this.isContain(listener)) return;
			let node:ListenerNode = this.createNode();
			node.listener = listener;
			this.addNode(node);
		}
		
		public addOnce( listener : Function ) : void
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

		public remove( listener : Function ) : void
		{
			
		}
		
		public removeAll() : void
		{
			
		}

		private createNode() : ListenerNode
		{
			return null;
		}

		private disposeNode( node : ListenerNode ) : void
		{

		}

		public releaseCache() : void
		{

		}
    }

}