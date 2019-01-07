class UChessBoard extends eui.Panel implements  eui.UIComponent {

	private lblTitle: eui.Label;
	private rectBg: eui.Rect;

	public constructor() {
		super();

		this.skinName = "resource/ui/UChessBoard.exml";
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		
		this.$addListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);

		

	}
	
	protected onButtonClick(e:egret.TouchEvent):void
	{
		this.lblTitle.text = e.localX + "," + e.localY;

		this.rectBg.graphics.lineStyle(1, 0x000000);
		for (var i:number = 1; i < 30; i++)
		{
			this.rectBg.graphics.moveTo(i*20, 0);
			this.rectBg.graphics.lineTo(i*20, 600);
		}
		
		for (var j:number = 1; j < 30; j++)
		{
			this.rectBg.graphics.moveTo(0, j*20);
			this.rectBg.graphics.lineTo(600, j*20);
		}
	}

}