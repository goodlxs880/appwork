namespace ash {

	/**
	 * This is a state machine for an entity. The state machine manages a set of states,
	 * each of which has a set of component providers. When the state machine changes the state, it removes
	 * components associated with the previous state and adds components associated with the new state.
	 */
	export class EntityStateMachine
	{
		private states : Map<string, any>;
		/**
		 * The current state of the state machine.
		 */
		private currentState : EntityState;
		/**
		 * The entity whose state machine this is
		 */
		public entity : Entity;

		/**
		 * Constructor. Creates an EntityStateMachine.
		 */
		constructor( entity : Entity )
		{
			this.entity = entity;
			this.states = new Map<string, any>();
		}

		/**
		 * Add a state to this state machine.
		 * 
		 * @param name The name of this state - used to identify it later in the changeState method call.
		 * @param state The state.
		 * @return This state machine, so methods can be chained.
		 */
		public addState( name : string, state : EntityState ) : EntityStateMachine
		{
            this.states.set( name, state );
			return this;
		}
		
		/**
		 * Create a new state in this state machine.
		 * 
		 * @param name The name of the new state - used to identify it later in the changeState method call.
		 * @return The new EntityState object that is the state. This will need to be configured with
		 * the appropriate component providers.
		 */
		public createState( name : string ) : EntityState
		{
			let state : EntityState = new EntityState();
            this.states.set( name, state );
			return state;
		}

		/**
		 * Change to a new state. The components from the old state will be removed and the components
		 * for the new state will be added.
		 * 
		 * @param name The name of the state to change to.
		 */
		public changeState( name : string ) : void
		{
            let newState : EntityState = this.states.get( name );
			if ( !newState )
			{
				throw( new Error( "Entity state " + name + " doesn't exist" ) );
			}
			if( newState == this.currentState )
			{
				newState = null;
				return;
			}
			let toAdd : Map<string, any>;
			if ( this.currentState )
			{
				toAdd = new Map<string, any>();

                newState.providers.forEach( function( type : any, k : string ) {
					let clsName : string = type.getComponent().constructor.name;
					toAdd.set( clsName, newState.providers.get( clsName ) );
                } )

				for ( let instan of this.currentState.providers.values() )
				{
					let type = instan.constructor;
					let curPro = instan.getComponent();
                    let other : IComponentProvider = toAdd.get(curPro.constructor.name);
					
                    if ( other && other.getIdentifier() == curPro )
					{
						toAdd.delete( curPro.constructor.name );
					}
					else
					{
						this.entity.remove( curPro.constructor );
					}
				}
			}
			else
			{
				toAdd = newState.providers;
			}

			for ( let type of toAdd.values() )
			{
				this.entity.add( type.getComponent() );
			}

			this.currentState = newState;
		}
	}
}
