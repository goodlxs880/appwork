class NAudio extends ash.Node
{
	public audio : CAudio;

    public static componentMap = new Map<string, any>()
				.set("audio", CAudio);
}
