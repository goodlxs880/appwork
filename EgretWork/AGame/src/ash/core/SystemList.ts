namespace ash {

	/**
	 * Used internally, this is an ordered list of Systems for use by the engine update loop.
	 */
	export class SystemList
	{
		public head : System;
		public tail : System;
		
		public add( system : System ) : void
		{
			if( ! this.head )
			{
				this.head = this.tail = system;
				system.next = system.previous = null;
			}
			else
			{
				for( var node : System = this.tail; node; node = node.previous )
				{
					if( node.priority <= system.priority )
					{
						break;
					}
				}
				if( node == this.tail )
				{
					this.tail.next = system;
					system.previous = this.tail;
					system.next = null;
					this.tail = system;
				}
				else if( !node )
				{
					system.next = this.head;
					system.previous = null;
					this.head.previous = system;
					this.head = system;
				}
				else
				{
					system.next = node.next;
					system.previous = node;
					node.next.previous = system;
					node.next = system;
				}
			}
		}
		
		public remove( system : System ) : void
		{
			if ( this.head == system)
			{
				this.head = this.head.next;
			}
			if ( this.tail == system)
			{
				this.tail = this.tail.previous;
			}
			
			if (system.previous)
			{
				system.previous.next = system.next;
			}
			
			if (system.next)
			{
				system.next.previous = system.previous;
			}
			// N.B. Don't set system.next and system.previous to null because that will break the list iteration if node is the current node in the iteration.
		}
		
		public removeAll() : void
		{
			while( this.head )
			{
				let system : System = this.head;
				this.head = this.head.next;
				system.previous = null;
				system.next = null;
			}
			this.tail = null;
		}
		
		public get( systemClass : any ) : System
		{
            let clsName : string = systemClass.name;
			for ( let system : System = this.head; system; system = system.next )
			{
				if ( system.constructor.name == clsName )
				{
					return system;
				}
			}
			return null;
		}
	}
}
