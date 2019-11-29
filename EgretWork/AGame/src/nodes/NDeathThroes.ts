class NDeathThroes extends ash.Node
{
	public death : CDeathThroes;

    public static componentMap = new Map<string, any>()
				.set("death", CDeathThroes);
}
