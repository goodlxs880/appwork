class GameNode extends ash.Node
{
	public state : GameState;

	public static componentMap = new Map<string, any>()
		.set("state", GameState);
}
