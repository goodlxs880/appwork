namespace ash {


    export class Entity
    {
        private static nameCount : number = 0;
		
		/**
		 * Optional, give the entity a name. This can help with debugging and with serialising the entity.
		 */
		private _name : String;
		/**
		 * This signal is dispatched when a component is added to the entity.
		 */
		public componentAdded : Signal2;
		/**
		 * This signal is dispatched when a component is removed from the entity.
		 */
		public componentRemoved : Signal2;
		/**
		 * Dispatched when the name of the entity changes. Used internally by the engine to track entities based on their names.
		 */
		public nameChanged : Signal2;
        
		
		public previous : Entity;
		public next : Entity;
		public components : Object;

		/**
		 * The constructor
		 * 
		 * @param name The name for the entity. If left blank, a default name is assigned with the form _entityN where N is an integer.
		 */
		constructor( name : String = "" )
		{
			// this.componentAdded = new Signal2( Entity, Class );
			// this.componentRemoved = new Signal2( Entity, Class );
			// this.nameChanged = new Signal2( Entity, String );
			// this.components = new Dictionary();
			// if( name )
			// {
			// 	this._name = name;
			// }
			// else
			// {
			// 	this._name = "_entity" + (++this.nameCount);
			// }
		}
		
		// /**
		//  * All entities have a name. If no name is set, a default name is used. Names are used to
		//  * fetch specific entities from the engine, and can also help to identify an entity when debugging.
		//  */
		// public function get name() : String
		// {
		// 	return _name;
		// }
		// public function set name( value : String ) : void
		// {
		// 	if( _name != value )
		// 	{
		// 		previous : String = _name;
		// 		_name = value;
		// 		nameChanged.dispatch( this, previous );
		// 	}
		// }

		// /**
		//  * Add a component to the entity.
		//  * 
		//  * @param component The component object to add.
		//  * @param componentClass The class of the component. This is only necessary if the component
		//  * extends another component class and you want the framework to treat the component as of 
		//  * the base class type. If not set, the class type is determined directly from the component.
		//  * 
		//  * @return A reference to the entity. This enables the chaining of calls to add, to make
		//  * creating and configuring entities cleaner. e.g.
		//  * 
		//  * <code>entity : Entity = new Entity()
		//  *     .add( new Position( 100, 200 )
		//  *     .add( new Display( new PlayerClip() );</code>
		//  */
		// public function add( component : Object, componentClass : Class = null ) : Entity
		// {
		// 	if ( !componentClass )
		// 	{
		// 		componentClass = Class( component.constructor );
		// 	}
		// 	if ( components[ componentClass ] )
		// 	{
		// 		remove( componentClass );
		// 	}
		// 	components[ componentClass ] = component;
		// 	componentAdded.dispatch( this, componentClass );
		// 	return this;
		// }

		// /**
		//  * Remove a component from the entity.
		//  * 
		//  * @param componentClass The class of the component to be removed.
		//  * @return the component, or null if the component doesn't exist in the entity
		//  */
		// public function remove( componentClass : Class ) : *
		// {
		// 	component : * = components[ componentClass ];
		// 	if ( component )
		// 	{
		// 		delete components[ componentClass ];
		// 		componentRemoved.dispatch( this, componentClass );
		// 		return component;
		// 	}
		// 	return null;
		// }

		// /**
		//  * Get a component from the entity.
		//  * 
		//  * @param componentClass The class of the component requested.
		//  * @return The component, or null if none was found.
		//  */
		// public function get( componentClass : Class ) : *
		// {
		// 	return components[ componentClass ];
		// }
		
		// /**
		//  * Get all components from the entity.
		//  * 
		//  * @return An array containing all the components that are on the entity.
		//  */
		// public function getAll() : Array
		// {
		// 	componentArray : Array = new Array();
		// 	for each( component : * in components )
		// 	{
		// 		componentArray[ componentArray.length ] = component;
		// 	}
		// 	return componentArray;
		// }

		// /**
		//  * Does the entity have a component of a particular type.
		//  * 
		//  * @param componentClass The class of the component sought.
		//  * @return true if the entity has a component of the type, false if not.
		//  */
		// public function has( componentClass : Class ) : Boolean
		// {
		// 	return components[ componentClass ] != null;
		// }
    }

}