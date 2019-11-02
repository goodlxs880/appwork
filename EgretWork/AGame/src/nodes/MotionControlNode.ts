class MotionControlNode extends ash.Node
{
	public control : MotionControls;
	public position : CPosition;
	public motion : Motion;

    public static componentMap = new Map<string, any>()
		.set("control", MotionControls)
		.set("position", CPosition)
        .set("motion", Motion);
}
