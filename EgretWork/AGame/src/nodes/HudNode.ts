class HudNode extends ash.Node
{
	public state : GameState;
	public hud : Hud;

	public static componentMap = new Map<string, any>()
		.set("state", GameState)
		.set("hud", Hud);
}
