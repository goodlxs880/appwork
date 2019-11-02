class MovementNode extends ash.Node
{
	public position : CPosition;
	public motion : Motion;

    public static componentMap = new Map<string, any>()
		.set("position", CPosition)
        .set("motion", Motion);
}
