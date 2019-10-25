namespace ash {

    export class ListenerNode
	{
		public previous : ListenerNode;
		public next : ListenerNode;
		public listener : Function;
		public once : boolean;
	}

}