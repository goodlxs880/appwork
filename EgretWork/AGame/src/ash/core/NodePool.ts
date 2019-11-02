namespace ash {

	/**
	 * This public class maintains a pool of deleted nodes for reuse by the framework. This reduces the overhead
	 * from object creation and garbage collection.
	 * 
	 * Because nodes may be deleted from a NodeList while in use, by deleting Nodes from a NodeList
	 * while iterating through the NodeList, the pool also maintains a cache of nodes that are added to the pool
	 * but should not be reused yet. They are then released into the pool by calling the releaseCache method.
	 */
	export class NodePool
	{
		private tail : Node;
		private nodeClass : any;
		private cacheTail : Node;
		private components : Map<string, any>;

		/**
		 * Creates a pool for the given node class.
		 */
		constructor( nodeClass : any, components : Map<string, any> )
		{
			this.nodeClass = nodeClass;
			this.components = components;
		}

		/**
		 * Fetches a node from the pool.
		 */
		public get() : Node
		{
			if ( this.tail )
			{
				let node : Node = this.tail;
				this.tail = this.tail.previous;
				node.previous = null;
				return node;
			}
			else
			{
				return new this.nodeClass();
			}
		}

		/**
		 * Adds a node to the pool.
		 */
		public dispose( node : Node ) : void
		{
            this.components.forEach( function( componentClass:any, key:string ) {
				node[key] = null;
            } )

			node.entity = null;
			node.next = null;
			node.previous = this.tail;
			this.tail = node;
		}
		
		/**
		 * Adds a node to the cache
		 */
		public cache( node : Node ) : void
		{
			node.previous = this.cacheTail;
			this.cacheTail = node;
		}
		
		/**
		 * Releases all nodes from the cache into the pool
		 */
		public releaseCache() : void
		{
			while ( this.cacheTail )
			{
				let node : Node = this.cacheTail;
				this.cacheTail = node.previous;
				this.dispose( node );
			}
		}
	}
}
