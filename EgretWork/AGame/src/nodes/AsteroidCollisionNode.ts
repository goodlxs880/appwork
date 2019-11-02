class AsteroidCollisionNode extends ash.Node
{
	public asteroid : Asteroid;
	public position : CPosition;
	public collision : Collision;
	// public audio : Audio;

	public static componentMap = new Map<string, any>()
		.set("asteroid", Asteroid)
		.set("position", CPosition)
		.set("collision", Collision);
}
