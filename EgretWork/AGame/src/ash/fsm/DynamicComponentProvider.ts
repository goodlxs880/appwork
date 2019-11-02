namespace ash {

	/**
	 * This component provider calls a to get the component instance. The must
	 * return a single component of the appropriate type.
	 */
	export class DynamicComponentProvider  implements IComponentProvider
	{
		private _closure : Function;

		/**
		 * Constructor
		 * 
		 * @param closure The that will return the component instance when called.
		 */
		constructor( closure : any )
		{
			this._closure = closure;
		}

		/**
		 * Used to request a component from this provider
		 * 
		 * @return The instance returned by calling the function
		 */
		public getComponent() : any
		{
			return this._closure();
		}

		/**
		 * Used to compare this provider with others. Any provider that uses the or method 
		 * closure to provide the instance is regarded as equivalent.
		 * 
		 * @return The function
		 */
		public getIdentifier() : any
		{
			return this._closure;
		}
	}
}