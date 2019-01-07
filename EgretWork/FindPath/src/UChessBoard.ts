class UChessBoard extends eui.Panel implements  eui.UIComponent {

	private lblTitle: eui.Label;
	private btnEnter: eui.Button;

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
		

		this.lblTitle.text = "hello";
		this.btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
	}
	
	protected onButtonClick(e:egret.TouchEvent):void
	{
		this.lblTitle.text = "hello world";
	}

}