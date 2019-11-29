class NMovement extends ash.Node
{
	public position : CPosition;
	public motion : CMotion;

    public static componentMap = new Map<string, any>()
		.set("position", CPosition)
        .set("motion", CMotion);
}
