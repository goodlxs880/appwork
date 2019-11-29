class NHud extends ash.Node
{
	public state : CGameState;
	public hud : CHud;

	public static componentMap = new Map<string, any>()
		.set("state", CGameState)
		.set("hud", CHud);
}
