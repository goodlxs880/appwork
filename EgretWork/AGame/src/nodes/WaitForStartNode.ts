class WaitForStartNode extends ash.Node
{
	public wait : WaitForStart = null;

	public static componentMap = new Map<string, any>()
		.set("wait", WaitForStart);
}
