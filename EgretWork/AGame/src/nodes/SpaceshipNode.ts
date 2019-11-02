class SpaceshipNode extends ash.Node
{
	public spaceship : Spaceship;
	public position : CPosition;

	public static componentMap = new Map<string, any>()
		.set("spaceship", Spaceship)
		.set("position", CPosition);
}
