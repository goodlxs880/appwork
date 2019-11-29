class NMotionControl extends ash.Node
{
	public control : CMotionControls;
	public position : CPosition;
	public motion : CMotion;

    public static componentMap = new Map<string, any>()
		.set("control", CMotionControls)
		.set("position", CPosition)
        .set("motion", CMotion);
}
