class NGunControl extends ash.Node
{
	public control : CGunControls;
	public gun : CGun;
	public position : CPosition;
	public audio : CAudio;

    public static componentMap = new Map<string, any>()
		.set("control", CGunControls)
		.set("gun", CGun)
        .set("position", CPosition)
		.set("audio", CAudio)
		;
}
