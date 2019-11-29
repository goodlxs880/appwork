namespace ash {


    export class Entity
    {
        private static nameCount : number = 0;
		
		/**
		 * Optional, give the entity a name. This can help with debugging and with serialising the entity.
		 */
		private _name : string;

		private _uid : string;

		/**
		 * This signal is dispatched when a component is added to the entity.
		 */
		public componentAdded : Signal;
		/**
		 * This signal is dispatched when a component is removed from the entity.
		 */
		public componentRemoved : Signal;
		/**
		 * Dispatched when the name of the entity changes. Used internally by the engine to track entities based on their names.
		 */
		public nameChanged : Signal;
        
		
		public previous : Entity;
		public next : Entity;
		public components : Map<string, any>;

		/**
		 * The constructor
		 * 
		 * @param name The name for the entity. If left blank, a default name is assigned with the form _entityN where N is an integer.
		 */
		constructor( name : string = "" )
		{
			this.componentAdded = new Signal();
			this.componentRemoved = new Signal();
			this.nameChanged = new Signal();
			this.components = new Map<string, IComponent>();
			this._uid = UUID.randomUUID();
			if( name )
			{
				this._name = name;
			}
			else
			{
				this._name = "_entity" + (++Entity.nameCount);
			}
		}
		
		/**
		 * All entities have a name. If no name is set, a default name is used. Names are used to
		 * fetch specific entities from the engine, and can also help to identify an entity when debugging.
		 */
		public get name() : string
		{
			return this._name;
		}
		public set name( value : string )
		{
			if( this._name != value )
			{
				let previous : string = this._name;
				this._name = value;
				this.nameChanged.dispatch( this, previous );
			}
		}

		/**
		 * Add a component to the entity.
		 * 
		 * @param component The component object to add.
		 * @param componentClass The class of the component. This is only necessary if the component
		 * extends another component class and you want the framework to treat the component as of 
		 * the base class type. If not set, the class type is determined directly from the component.
		 * 
		 * @return A reference to the entity. This enables the chaining of calls to add, to make
		 * creating and configuring entities cleaner. e.g.
		 * 
		 * <code>entity : Entity = new Entity()
		 *     .add( new Position( 100, 200 )
		 *     .add( new CDisplay( new PlayerClip() );</code>
		 */
		public add( component : IComponent, componentClass : any = null ) : Entity
		{
			if ( !componentClass )
			{
				componentClass = component.constructor;
			}

			let clsName : string = componentClass.name;
			if ( this.components.has( clsName ) )
			{
				this.remove( componentClass );
			}
			this.components.set( clsName, component );
			this.componentAdded.dispatch( this, componentClass );
			return this;
		}

		/**
		 * Remove a component from the entity.
		 * 
		 * @param componentClass The class of the component to be removed.
		 * @return the component, or null if the component doesn't exist in the entity
		 */
		public remove( componentClass : any ) : any
		{
			let clsName : string  = componentClass.name;
			let component : any = this.components.get(clsName);
			if ( component )
			{
				this.components.delete(clsName);
				this.componentRemoved.dispatch( this, componentClass );
				return component;
			}
			return null;
		}

		/**
		 * Get a component from the entity.
		 * 
		 * @param componentClass The class of the component requested.
		 * @return The component, or null if none was found.
		 */
		public get( componentClass : any ) : any
		{
			let clsName : string = componentClass.name;
			return this.components.get(clsName);
		}
		
		/**
		 * Get all components from the entity.
		 * 
		 * @return An array containing all the components that are on the entity.
		 */
		public getAll() : IComponent[]
		{
			return [...this.components];
		}

		/**
		 * Does the entity have a component of a particular type.
		 * 
		 * @param componentClass The class of the component sought.
		 * @return true if the entity has a component of the type, false if not.
		 */
		public has( componentClass : any ) : boolean
		{
			let clsName : string = componentClass.name;
			return this.components.has(clsName);
		}
    }

}