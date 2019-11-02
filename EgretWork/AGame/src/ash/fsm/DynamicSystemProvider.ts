namespace ash {


    /**
     * This System provider returns results of a method call. The method
     * is passed to the provider at initialisation.
     */
    export class DynamicSystemProvider implements ISystemProvider
    {
        private method:Function;
        private systemPriority:number = 0;


        /**
         * Constructor
         *
         * @param method The method that returns the System instance;
         */
        constructor( method:Function )
        {
            this.method = method;
        }

        /**
         * Used to request a component from this provider
         *
         * @return The instance of the System
         */
        public getSystem():System
        {
            return this.method();
        }

        /**
         * Used to compare this provider with others. Any provider that returns the same component
         * instance will be regarded as equivalent.
         *
         * @return The method used to call the System instances
         */
        public getIdentifier():any
        {
            return this.method;
        }

        /**
         * The priority at which the System should be added to the Engine
         */
        public getPriority():number
        {
            return this.systemPriority;
        }

        public setPriority( value:number ):void
        {
            this.systemPriority = value;
        }
    }
}
