class GunControlNode extends ash.Node
{
	public control : GunControls;
	public gun : Gun;
	public position : CPosition;
	// public audio : Audio;

    public static componentMap = new Map<string, any>()
		.set("control", GunControls)
		.set("gun", Gun)
        .set("position", CPosition);
}
