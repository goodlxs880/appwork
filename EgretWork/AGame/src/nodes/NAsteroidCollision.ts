class NAsteroidCollision extends ash.Node
{
	public asteroid : CAsteroid;
	public position : CPosition;
	public collision : CCollision;
	public audio : CAudio;

	public static componentMap = new Map<string, any>()
		.set("asteroid", CAsteroid)
		.set("position", CPosition)
		.set("collision", CCollision)
		.set("audio", CAudio)
		;
}
