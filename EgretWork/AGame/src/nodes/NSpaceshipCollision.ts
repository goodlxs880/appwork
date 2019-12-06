class NSpaceshipCollision extends ash.Node
{
	public spaceship : CSpaceship;
	public position : CPosition;
	public collision : CCollision;
	public audio : CAudio;

    public static componentMap = new Map<string, any>()
		.set("spaceship", CSpaceship)
		.set("position", CPosition)
        .set("collision", CCollision)
		.set("audio", CAudio)
		;
}
