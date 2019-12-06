class NBulletAge extends ash.Node
{
	public bullet : CBullet;
	public position : CPosition;
	public motion : CMotion;

    public static componentMap = new Map<string, any>()
				.set("bullet", CBullet)
				.set("position", CPosition)
				.set("motion", CMotion)
				;
}
