class BulletCollisionNode extends ash.Node
{
	public bullet : Bullet;
	public position : CPosition;
	public collision : Collision;

    public static componentMap = new Map<string, any>()
		.set("bullet", Bullet)
        .set("position", CPosition)
        .set("collision", Collision);
}
