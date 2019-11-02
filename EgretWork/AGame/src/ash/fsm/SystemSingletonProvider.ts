namespace ash {

	/**
	 * This System provider always returns the same instance of the System. The instance
	 * is created when first required and is of the type passed in to the constructor.
	 */
	export class SystemSingletonProvider implements ISystemProvider
	{
		private componentType : any;
		private instance : System;
		private systemPriority : number = 0;

		/**
		 * Constructor
		 *
		 * @param type The type of the single System instance
		 */
		constructor( type : any )
		{
			this.componentType = type;
		}

		/**
		 * Used to request a System from this provider
		 *
		 * @return The single instance
		 */
		public getSystem() : System
		{
			if ( !this.instance )
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
			return this.getSystem();
		}

		/**
		 * The priority at which the System should be added to the Engine
		 */
		public getPriority() : number
		{
			return this.systemPriority;
		}

		/**
		 * @private
		 */
		public setPriority( value : number ) : void
		{
			this.systemPriority = value;
		}
	}
}
