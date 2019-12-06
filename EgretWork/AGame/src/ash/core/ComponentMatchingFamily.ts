namespace ash {

    export class ComponentMatchingFamily implements IFamily
	{
		private nodes : NodeList;
		private entities : Map<string, Node>;
		private nodeClass : any;
		private components : Map<string, any>;
		private nodePool : NodePool;
		private engine : Engine;
		private keysFilter : string[];

		private _releaseNodePoolCache : FuncHandler = new ash.FuncHandler( this.releaseNodePoolCache, this );

		/**
		 * The constructor. Creates a ComponentMatchingFamily to provide a NodeList for the
		 * given node class.
		 * 
		 * @param nodeClass The type of node to create and manage a NodeList for.
		 * @param engine The engine that this family is managing teh NodeList for.
		 */
		constructor( nodeClass : any, engine : Engine )
		{
			this.nodeClass = nodeClass;
			this.engine = engine;
			this.init();
		}

		/**
		 * Initialises the class. Creates the nodelist and other tools. Analyses the node to determine
		 * what component types the node requires.
		 */
		private init() : void
		{
			this.nodes = new NodeList();
			this.entities = new Map<string, Node>();
			this.components = this.nodeClass.componentMap;
			this.nodePool = new NodePool( this.nodeClass, this.components );
			this.nodePool.dispose( this.nodePool.get() ); // create a dummy instance to ensure describeType works.
 		}
		
		/**
		 * The nodelist managed by this family. This is a reference that remains valid always
		 * since it is retained and reused by Systems that use the list. i.e. we never recreate the list,
		 * we always modify it in place.
		 */
		public nodeList() : NodeList
		{
			return this.nodes;
		}

		/**
		 * Called by the engine when an entity has been added to it. We check if the entity should be in
		 * this family's NodeList and add it if appropriate.
		 */
		public newEntity( entity : Entity ) : void
		{
			this.addIfMatch( entity );
		}
		
		/**
		 * Called by the engine when a component has been added to an entity. We check if the entity is not in
		 * this family's NodeList and should be, and add it if appropriate.
		 */
		public componentAddedToEntity( entity : Entity, componentClass : any ) : void
		{
			this.addIfMatch( entity );
		}
		
		/**
		 * Called by the engine when a component has been removed from an entity. We check if the removed component
		 * is required by this family's NodeList and if so, we check if the entity is in this this NodeList and
		 * remove it if so.
		 */
		public componentRemovedFromEntity( entity : Entity, componentClass : any ) : void
		{
			for ( let cls of this.components.values() )
			{
				if ( cls == componentClass ) 
				{
					this.removeIfMatch( entity );
				}
			}
		}
		
		/**
		 * Called by the engine when an entity has been rmoved from it. We check if the entity is in
		 * this family's NodeList and remove it if so.
		 */
		public removeEntity( entity : Entity ) : void
		{
			this.removeIfMatch( entity );
		}
		
		/**
		 * If the entity is not in this family's NodeList, tests the components of the entity to see
		 * if it should be in this NodeList and adds it if so.
		 */
		private addIfMatch( entity : Entity ) : void
		{
			if( !this.entities.has( entity.name ) )
			{
				for ( let componentClass of this.components.values() )
				{
					if ( !entity.has( componentClass ) )
                    {
                        return;
                    }
				}

				let node : any = this.nodePool.get();
				node.entity = entity;

				this.components.forEach( function( componentClass:any, key:string ){
					node[key] = entity.get( componentClass );
				} )

                this.entities.set( entity.name, node );
				this.nodes.add( node );
			}
		}
		
		/**
		 * Removes the entity if it is in this family's NodeList.
		 */
		private removeIfMatch( entity : Entity ) : void
		{
			if( this.entities.has( entity.name ) )
			{
                let node : Node = this.entities.get( entity.name );
                this.entities.delete( entity.name );
				this.nodes.remove( node );
				if( this.engine.updating )
				{
					this.nodePool.cache( node );
					this.engine.updateComplete.add( this._releaseNodePoolCache );
				}
				else
				{
					this.nodePool.dispose( node );
				}
			}
		}
		
		/**
		 * Releases the nodes that were added to the node pool during this engine update, so they can
		 * be reused.
		 */
		private releaseNodePoolCache() : void
		{
			this.engine.updateComplete.remove( this._releaseNodePoolCache );
			this.nodePool.releaseCache();
		}
		
		/**
		 * Removes all nodes from the NodeList.
		 */
		public cleanUp() : void
		{
			for( let node : Node = this.nodes.head; node; node = node.next )
			{
                this.entities.delete(node.entity.name);
			}
			this.nodes.removeAll();
		}
	}

}