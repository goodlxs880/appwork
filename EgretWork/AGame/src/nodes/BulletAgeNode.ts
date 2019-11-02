class BulletAgeNode extends ash.Node
{
	public bullet : Bullet;

    public static componentMap = new Map<string, any>()
				.set("bullet", Bullet);
}
