class NSpaceship extends ash.Node
{
	public spaceship : CSpaceship;
	public position : CPosition;

	public static componentMap = new Map<string, any>()
		.set("spaceship", CSpaceship)
		.set("position", CPosition);
}
