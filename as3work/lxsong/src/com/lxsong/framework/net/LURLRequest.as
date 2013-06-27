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
	import flash.events.IOErrorEvent;
	import flash.events.ProgressEvent;
	import flash.events.SecurityErrorEvent;
	import flash.net.Socket;
	import flash.utils.ByteArray;
	import flash.utils.Endian;
	
	[Event(name="close", type="flash.events.Event")]
	[Event(name="complete", type="flash.events.Event")]
	
	/**
	 * 
	 * @author lxsong
	 */
	public class LURLRequest extends EventDispatcher
	{
		protected var _host:String;
		protected var _port:int;
		protected var _socket:Socket;
		
		protected var _data:ByteArray;
		
		protected var _resultData:ByteArray;
		
		
		public function LURLRequest(host:String, port:int)
		{
			_host = host;
			_port = port;
			
			if (!_socket)
				_socket = new Socket();

			_socket.addEventListener(Event.CONNECT, onHandler);
			_socket.addEventListener(Event.CLOSE, onHandler);
			_socket.addEventListener(IOErrorEvent.IO_ERROR, onHandler);
			_socket.addEventListener(SecurityErrorEvent.SECURITY_ERROR, onHandler);
			_socket.addEventListener(ProgressEvent.SOCKET_DATA, onHandler);
		}
		
		protected function onHandler(evt:Event):void
		{
			switch (evt.type)
			{
				case Event.CONNECT:
					_socket.writeBytes(_data);
					_socket.flush();
					break;
				case ProgressEvent.SOCKET_DATA:
					_resultData = new ByteArray();
					_resultData.endian = Endian.LITTLE_ENDIAN;
					(evt.target as Socket).readBytes(_resultData, 0, _socket.bytesAvailable);
					(evt.target as Socket).close();
					dispatchEvent(new Event(Event.COMPLETE));
					close();
					break;
				case Event.CLOSE:
				case IOErrorEvent.IO_ERROR:
				case SecurityErrorEvent.SECURITY_ERROR:
					close();
					break;
				default:
					
					break;
			}
		}
		
		private function close():void
		{
			if (_socket)
			{
				if (_socket.connected)
					_socket.close();
				_socket.removeEventListener(Event.CONNECT, onHandler);
				_socket.removeEventListener(Event.CLOSE, onHandler);
				_socket.removeEventListener(IOErrorEvent.IO_ERROR, onHandler);
				_socket.removeEventListener(SecurityErrorEvent.SECURITY_ERROR, onHandler);
				_socket.removeEventListener(ProgressEvent.SOCKET_DATA, onHandler);
			}
			dispatchEvent(new Event(Event.CLOSE));
		}
		
		public function dispose():void
		{
			
		}
		
		public function connectAndSend():void
		{
			_socket.connect(_host, _port);
		}
		
		public function set data(value:ByteArray):void
		{
			_data = value;
		}
		
		public function get resultData():ByteArray
		{
			return _resultData;
		}
	}
}
