class SpaceshipCollisionNode extends ash.Node
{
	public spaceship : Spaceship;
	public position : CPosition;
	public collision : Collision;
	// public audio : Audio;

    public static componentMap = new Map<string, any>()
		.set("spaceship", Spaceship)
		.set("position", CPosition)
        .set("collision", Collision);
}
