namespace ash {
	
	/**
	 * A collection of nodes.
	 * 
	 * <p>Systems within the engine access the components of entities via NodeLists. A NodeList contains
	 * a node for each Entity in the engine that has all the components required by the node. To iterate
	 * over a NodeList, start from the head and step to the next on each loop, until the returned value
	 * is null.</p>
	 * 
	 * <p>for( node : Node = nodeList.head; node; node = node.next )
	 * {
	 *   // do stuff
	 * }</p>
	 * 
	 * <p>It is safe to remove items from a nodelist during the loop. When a Node is removed form the 
	 * NodeList it's previous and next properties still point to the nodes that were before and after
	 * it in the NodeList just before it was removed.</p>
	 */
	export class NodeList
	{
		/**
		 * The first item in the node list, or null if the list contains no nodes.
		 */
		public head : any;
		/**
		 * The last item in the node list, or null if the list contains no nodes.
		 */
		public tail : any;
		
		/**
		 * A signal that is dispatched whenever a node is added to the node list.
		 * 
		 * <p>The signal will pass a single parameter to the listeners - the node that was added.</p>
		 */
		public nodeAdded : Signal;
		/**
		 * A signal that is dispatched whenever a node is removed from the node list.
		 * 
		 * <p>The signal will pass a single parameter to the listeners - the node that was removed.</p>
		 */
		public nodeRemoved : Signal;
		
		constructor()
		{
			this.nodeAdded = new Signal();
			this.nodeRemoved = new Signal();
		}
		
		public add( node : Node ) : void
		{
			if( ! this.head )
			{
				this.head = this.tail = node;
				node.next = node.previous = null;
			}
			else
			{
				this.tail.next = node;
				node.previous = this.tail;
				node.next = null;
				this.tail = node;
			}
			this.nodeAdded.dispatch( node );
		}
		
		public remove( node : Node ) : void
		{
			if ( this.head == node)
			{
				this.head = this.head.next;
			}
			if ( this.tail == node)
			{
				this.tail = this.tail.previous;
			}
			
			if (node.previous)
			{
				node.previous.next = node.next;
			}
			
			if (node.next)
			{
				node.next.previous = node.previous;
			}
			this.nodeRemoved.dispatch( node );
			// N.B. Don't set node.next and node.previous to null because that will break the list iteration if node is the current node in the iteration.
		}
		
		public removeAll() : void
		{
			while( this.head )
			{
				let node : Node = this.head;
				this.head = node.next;
				node.previous = null;
				node.next = null;
				this.nodeRemoved.dispatch( node );
			}
			this.tail = null;
		}
		
		/**
		 * true if the list is empty, false otherwise.
		 */
		public get empty() : boolean
		{
			return this.head == null;
		}
		
		/**
		 * Swaps the positions of two nodes in the list. Useful when sorting a list.
		 */
		public swap( node1 : Node, node2 : Node ) : void
		{
			if( node1.previous == node2 )
			{
				node1.previous = node2.previous;
				node2.previous = node1;
				node2.next = node1.next;
				node1.next  = node2;
			}
			else if( node2.previous == node1 )
			{
				node2.previous = node1.previous;
				node1.previous = node2;
				node1.next = node2.next;
				node2.next  = node1;
			}
			else
			{
				let temp : Node = node1.previous;
				node1.previous = node2.previous;
				node2.previous = temp;
				temp = node1.next;
				node1.next = node2.next;
				node2.next = temp;
			}
			if( this.head == node1 )
			{
				this.head = node2;
			}
			else if( this.head == node2 )
			{
				this.head = node1;
			}
			if( this.tail == node1 )
			{
				this.tail = node2;
			}
			else if( this.tail == node2 )
			{
				this.tail = node1;
			}
			if( node1.previous )
			{							
				node1.previous.next = node1;
			}
			if( node2.previous )
			{
				node2.previous.next = node2;
			}
			if( node1.next )
			{
				node1.next.previous = node1;
			}
			if( node2.next )
			{
				node2.next.previous = node2;
			}
		}
		
		/**
		 * Performs an insertion sort on the node list. In general, insertion sort is very efficient with short lists 
		 * and with lists that are mostly sorted, but is inefficient with large lists that are randomly ordered.
		 * 
		 * <p>The sort takes two nodes and returns a Number.</p>
		 * 
		 * <p><code>function sortFunction( node1 : MockNode, node2 : MockNode ) : Number</code></p>
		 * 
		 * <p>If the returned number is less than zero, the first node should be before the second. If it is greater
		 * than zero the second node should be before the first. If it is zero the order of the nodes doesn't matter
		 * and the original order will be retained.</p>
		 * 
		 * <p>This insertion sort implementation runs in place so no objects are created during the sort.</p>
		 */
		public insertionSort( sortFunction : any ) : void
		{
			if( this.head == this.tail )
			{
				return;
			}
			let remains : Node = this.head.next;
            
			for( let node : Node = remains; node; node = remains )
			{
                let other:Node;
				remains = node.next;
				for( other = node.previous; other; other = other.previous )
				{
					if( sortFunction( node, other ) >= 0 )
					{
						// move node to after other
						if( node != other.next )
						{
							// remove from place
							if ( this.tail == node)
							{
								this.tail = node.previous;
							}
							node.previous.next = node.next;
							if (node.next)
							{
								node.next.previous = node.previous;
							}
							// insert after other
							node.next = other.next;
							node.previous = other;
							node.next.previous = node;
							other.next = node;
						}
						break; // exit the inner for loop
					}
				}
				if( !other ) // the node belongs at the start of the list
				{
					// remove from place
					if ( this.tail == node)
					{
						this.tail = node.previous;
					}
					node.previous.next = node.next;
					if (node.next)
					{
						node.next.previous = node.previous;
					}
					// insert at head
					node.next = this.head;
					this.head.previous = node;
					node.previous = null;
					this.head = node;
				}
			}
		}
		
		/**
		 * Performs a merge sort on the node list. In general, merge sort is more efficient than insertion sort
		 * with long lists that are very unsorted.
		 * 
		 * <p>The sort takes two nodes and returns a Number.</p>
		 * 
		 * <p><code>function sortFunction( node1 : MockNode, node2 : MockNode ) : Number</code></p>
		 * 
		 * <p>If the returned number is less than zero, the first node should be before the second. If it is greater
		 * than zero the second node should be before the first. If it is zero the order of the nodes doesn't matter.</p>
		 * 
		 * <p>This merge sort implementation creates and uses a single Vector during the sort operation.</p>
		 */
		public mergeSort( sortFunction : any ) : void
		{
			if( this.head == this.tail )
			{
				return;
			}
            let lists : Array<Node> = new Array<Node>();
			// disassemble the list
			let start : Node = this.head;
			let end : Node;
			while( start )
			{
				end = start;
				while( end.next && sortFunction( end, end.next ) <= 0 )
				{
					end = end.next;
				}
				let next : Node = end.next;
				start.previous = end.next = null;
				lists[ lists.length ] = start;
				start = next;
			}
			// reassemble it in order
			while( lists.length > 1 )
			{
				lists.push( this.merge( lists.shift(), lists.shift(), sortFunction ) );
			}
			// find the tail
			this.tail = this.head = lists[0];
			while( this.tail.next )
			{
				this.tail = this.tail.next;	
			}
		}
		
		private merge( head1 : Node, head2 : Node, sortFunction : any ) : Node
		{
			let node : Node;
			let head : Node;
			if( sortFunction( head1, head2 ) <= 0 )
			{
				head = node = head1;
				head1 = head1.next;
			}
			else
			{
				head = node = head2;
				head2 = head2.next;
			}
			while( head1 && head2 )
			{
				if( sortFunction( head1, head2 ) <= 0 )
				{
					node.next = head1;
					head1.previous = node;
					node = head1;
					head1 = head1.next;
				}
				else
				{
					node.next = head2;
					head2.previous = node;
					node = head2;
					head2 = head2.next;
				}
			}
			if( head1 )
			{
				node.next = head1;
				head1.previous = node;
			}
			else
			{
				node.next = head2;
				head2.previous = node;
			}
			return head;
		}
	}
}
