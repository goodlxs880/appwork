namespace ash {

	/**
	 * The interface for a tick provider. A tick provider dispatches a regular update tick
	 * to act as the heartbeat for the engine. It has methods to start and stop the tick and
	 * to add and remove listeners for the tick.
	 */
	export interface ITickProvider
	{
		playing() : boolean;
		
		add( listener : ash.FuncHandler ) : void;
		remove( listener : ash.FuncHandler ) : void;
		
		start() : void;
		stop() : void;
	}
}
