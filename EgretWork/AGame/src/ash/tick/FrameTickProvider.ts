namespace ash {

    /**
	 * Uses the enter frame event to provide a frame tick where the frame duration is the time since the previous frame.
	 * There is a maximum frame time parameter in the constructor that can be used to limit
	 * the longest period a frame can be.
	 */
	export class FrameTickProvider extends Signal implements ITickProvider
	{
		private displayObject : egret.DisplayObject;
		private previousTime : number;
		private maximumFrameTime : number;
		private isPlaying : boolean = false;
		
		/**
		 * Applies a time adjustement factor to the tick, so you can slow down or speed up the entire engine.
		 * The update tick time is multiplied by this value, so a value of 1 will run the engine at the normal rate.
		 */
		public timeAdjustment : number = 1;
		
		constructor( displayObject : egret.DisplayObject, maximumFrameTime : number = Number.MAX_VALUE )
		{
            super();
			this.displayObject = displayObject;
			this.maximumFrameTime = maximumFrameTime;
		}
		
		public start() : void
		{
			this.previousTime = egret.getTimer();
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
			let temp : number = this.previousTime;
			this.previousTime = egret.getTimer();
			var frameTime : number = ( this.previousTime - temp ) / 1000;
			if( frameTime > this.maximumFrameTime )
			{
				frameTime = this.maximumFrameTime;
			}
			this.dispatch( frameTime * this.timeAdjustment );
		}

		public playing() : boolean
		{
			return this.isPlaying;
		}
	}

}