namespace ash {

	/**
	 * This component provider always returns the same instance of the component. The instance
	 * is created when first required and is of the type passed in to the constructor.
	 */
	export class ComponentSingletonProvider implements IComponentProvider
	{
		private componentType : any;
		private instance : any;
		
		/**
		 * Constructor
		 * 
		 * @param type The type of the single instance
		 */
		constructor( type : any )
		{
			this.componentType = type;
		}
		
		/**
		 * Used to request a component from this provider
		 * 
		 * @return The single instance
		 */
		public getComponent() : any
		{
			if( !this.instance )
			{
				this.instance = new this.componentType();
			}
			return this.instance;
		}
		
		/**
		 * Used to compare this provider with others. Any provider that returns the same single
		 * instance will be regarded as equivalent.
		 * 
		 * @return The single instance
		 */
		public getIdentifier() : any
		{
			return this.getComponent();
		}
	}
}
