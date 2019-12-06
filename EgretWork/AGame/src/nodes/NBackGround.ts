class NBackGround extends ash.Node
{
	public display : CDisplay;
	public position : CPosition;
	public backGround : CBackGround;

	public static componentMap = new Map<string, any>()
		.set("display", CDisplay)
		.set("position", CPosition)
		.set("backGround", CBackGround)
		;
}
