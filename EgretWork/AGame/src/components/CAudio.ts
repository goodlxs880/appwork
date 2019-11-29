class CAudio implements ash.IComponent
{
	public sounds : Map<string, CSound> = new Map<string, CSound>();
	
	constructor( soundArray : Array<CSound> )
	{
		for ( let sound of soundArray )
		{
			this.sounds.set( sound.fileName, sound );
		}
	}
}