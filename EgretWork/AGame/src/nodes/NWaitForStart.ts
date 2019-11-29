class NWaitForStart extends ash.Node
{
	public wait : CWaitForStart = null;

	public static componentMap = new Map<string, any>()
		.set("wait", CWaitForStart);
}
