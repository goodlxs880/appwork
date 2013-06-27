// 文件名：
// 功能：
// 日期：2013-6-26
// 版本：
// 		作者                   日期               内容
//		lxsong             2013-6-26

package com.lxsong.framework.net
{
	import flash.events.Event;
	import flash.events.EventDispatcher;
	import flash.events.IEventDispatcher;
	import flash.events.IOErrorEvent;
	import flash.utils.ByteArray;
	
	[Event(name="complete", type="flash.events.Event")]
	[Event(name="ioError", type="flash.events.IOErrorEvent")]
	/**
	 * 
	 * @author lxsong
	 */
	public class LURLLoader extends EventDispatcher
	{
		protected var _lurlRequest:LURLRequest;
		
		protected var _data:ByteArray;
		
		public function LURLLoader(target:IEventDispatcher=null)
		{
			super(target);
			
		}
		
		public function load(lurlRequest:LURLRequest):void
		{
			if (!lurlRequest)
				return;
			
			_lurlRequest = lurlRequest;
			_lurlRequest.addEventListener(Event.COMPLETE, onComp);
			_lurlRequest.addEventListener(Event.CLOSE, onClose);
			_lurlRequest.connectAndSend();
		}
		
		protected function onComp(evt:Event):void
		{
			dispatchEvent(evt);
		}
		
		protected function onClose(evt:Event):void
		{
			dispatchEvent(new IOErrorEvent(IOErrorEvent.IO_ERROR));
		}
		
		public function get data():ByteArray
		{
			_data = _lurlRequest.resultData;
			if (!_data)
				_data = new ByteArray();
			return _data;
		}
		
		public function release():void
		{
			
		}
		
		public function getLUrlRequest():LURLRequest
		{
			return _lurlRequest;
		}
	}
}
