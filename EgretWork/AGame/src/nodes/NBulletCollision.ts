class NBulletCollision extends ash.Node
{
	public bullet : CBullet;
	public position : CPosition;
	public collision : CCollision;

    public static componentMap = new Map<string, any>()
		.set("bullet", CBullet)
        .set("position", CPosition)
        .set("collision", CCollision);
}
