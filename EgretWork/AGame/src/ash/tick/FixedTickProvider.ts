namespace ash {

    export class FixedTickProvider extends Signal implements ITickProvider
	{
		private displayObject : egret.DisplayObject;
		private frameTime : number;
		private isPlaying : boolean = false;
		
		/**
		 * Applies a time adjustement factor to the tick, so you can slow down or speed up the entire engine.
		 * The update tick time is multiplied by this value, so a value of 1 will run the engine at the normal rate.
		 */
		public timeAdjustment : number = 1;
		
		constructor( displayObject : egret.DisplayObject, frameTime : number )
		{
            super();
			this.displayObject = displayObject;
			this.frameTime = frameTime;
		}
		
		public start() : void
		{
			this.displayObject.addEventListener( egret.Event.ENTER_FRAME, this.dispatchTick, this );
			this.isPlaying = true;
		}
		
		public stop() : void
		{
			this.isPlaying = false;
			this.displayObject.removeEventListener( egret.Event.ENTER_FRAME, this.dispatchTick, this );
		}
		
		private dispatchTick( event : Event ) : void
		{
			this.dispatch( this.frameTime * this.timeAdjustment );
		}

		public playing() : boolean
		{
			return this.isPlaying;
		}
	}

}