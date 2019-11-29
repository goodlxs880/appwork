class CSound implements ash.IComponent
{
	public fileName : string;
    public loops : number;
    public triggerPlay : boolean = false;
    public soundPlayer : egret.SoundChannel;
	
	constructor( fileName : string, loops : number )
	{
		this.fileName = fileName;
        this.loops = loops;
	}
}