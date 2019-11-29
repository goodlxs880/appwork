class NGame extends ash.Node
{
	public state : CGameState;
	public audio : CAudio;

	public static componentMap = new Map<string, any>()
		.set("state", CGameState)
		.set("audio", CAudio);
}
