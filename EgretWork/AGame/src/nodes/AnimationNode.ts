class AnimationNode extends ash.Node
{
	public animation : Animation;

    public static componentMap = new Map<string, any>()
				.set("animation", Animation);
}
