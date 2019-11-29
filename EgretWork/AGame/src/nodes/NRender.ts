class NRender extends ash.Node
{
	public position : CPosition;
	public display : CDisplay;

	public static componentMap = new Map<string, any>()
		.set("display", CDisplay)
		.set("position", CPosition);
}
