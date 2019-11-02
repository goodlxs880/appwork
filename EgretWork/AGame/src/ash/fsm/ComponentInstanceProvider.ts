namespace ash {

	/**
	 * This component provider always returns the same instance of the component. The instance
	 * is passed to the provider at initialisation.
	 */
	export class ComponentInstanceProvider implements IComponentProvider
	{
		private instance : any;
		
		/**
		 * Constructor
		 * 
		 * @param instance The instance to return whenever a component is requested.
		 */
		constructor( instance : any )
		{
			this.instance = instance;
		}
		
		/**
		 * Used to request a component from this provider
		 * 
		 * @return The instance
		 */
		public getComponent() : any
		{
			return this.instance;
		}
		
		/**
		 * Used to compare this provider with others. Any provider that returns the same component
		 * instance will be regarded as equivalent.
		 * 
		 * @return The instance
		 */
		public getIdentifier() : any
		{
			return this.instance;
		}
	}
}
