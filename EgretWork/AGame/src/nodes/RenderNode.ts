class RenderNode extends ash.Node
{
	public position : CPosition;
	public display : Display;

	public static componentMap = new Map<string, any>()
		.set("display", Display)
		.set("position", CPosition);
}
