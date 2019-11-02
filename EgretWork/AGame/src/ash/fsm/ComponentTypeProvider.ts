namespace ash {

	/**
	 * This component provider always returns a new instance of a component. An instance
	 * is created when requested and is of the type passed in to the constructor.
	 */
	export class ComponentTypeProvider implements IComponentProvider
	{
		private componentType : any;
		
		/**
		 * Constructor
		 * 
		 * @param type The type of the instances to be created
		 */
		constructor( type : any )
		{
			this.componentType = type;
		}
		
		/**
		 * Used to request a component from this provider
		 * 
		 * @return A new instance of the type provided in the constructor
		 */
		public getComponent() : any
		{
			return new this.componentType();
		}
		
		/**
		 * Used to compare this provider with others. Any ComponentTypeProvider that returns
		 * the same type will be regarded as equivalent.
		 * 
		 * @return The type of the instances created
		 */
		public getIdentifier() : any
		{
			return this.componentType;
		}
	}
}
