////////////////////////////////////////////////////////////
// 名称: 
// 作者: lvxiangsong
// 日期: 2013-6-27
// 功能: 
// 版本: 
//
// 修改者           日期	           内容		
// lvxiangsong      2013-6-27
////////////////////////////////////////////////////////////
package com.lxsong.framework.utils
{
	import com.lxsong.framework.net.LURLLoader;
	import com.lxsong.framework.net.LURLRequest;
	import com.netease.protobuf.Message;
	
	import flash.events.Event;
	import flash.events.IOErrorEvent;
	import flash.utils.ByteArray;
	
	/**
	 * 网络信息工具，使用前先调用init()方法初始化
	 * @author lvxiangsong
	 */
	public class NetmsgUtil
	{
		protected static var _host:String;
		protected static var _port:int;
		
		protected static var _loadPool:Vector.<LURLLoader>;
		protected static var _urlreqPool:Vector.<LURLRequest>;
		
		public function NetmsgUtil()
		{
		}
		
		/**
		 * 使用前先初始化
		 * @param _host 主机
		 * @param _port 端口
		 */
		public static function init(_host:String, _port):void
		{
			_host = _host;
			_port = _port;
			_loadPool = new Vector.<LURLLoader>();
			_urlreqPool = new Vector.<LURLRequest>();
		}
		
		
		/**
		 * 发送信息，只发送com.netease.protobuf.Message 
		 * @param msg
		 * @param succBack 成功回调函数，参数是一个ByteArray
		 * @param faultBack 失败回调函数，参数是一个int的errorCode
		 */
		public static function sendMsg(msg:Message, succBack:Function, faultBack:Function):void
		{
			if (!_host || _port <= 0 || !_loadPool || !_urlreqPool)
				throw Error("未初始化，调用init方法重新初始化");
			
			var req:LURLRequest = getUrlReq();
			var load:LURLLoader = getLoader();
			
			load.addEventListener(Event.COMPLETE, onComp);
			load.addEventListener(IOErrorEvent.IO_ERROR, onError);
			
			req.data = msg;
			load.load(req);
			
			function onComp(evt:Event):void
			{
				var result:ByteArray = (evt.target as LURLLoader).data;
				if (succBack != null)
					succBack(result);
				releaseLoad(evt.target as LURLLoader);
			}
			
			function onError(evt:IOErrorEvent):void
			{
				releaseLoad(evt.target as LURLLoader);
			}
		}
		
		private static function releaseLoad(load:LURLLoader):void
		{
			var req:LURLRequest = load.getLUrlRequest();
			req.release();
			_urlreqPool.push(req);
			load.release();
			_loadPool.push(load);
		}
		
		private static function getLoader():LURLLoader
		{
			var load:LURLLoader = _loadPool.pop();
			if (load == null)
				load = new LURLLoader();
			return load;
		}
		
		private static function getUrlReq():LURLRequest
		{
			var req:LURLRequest = _urlreqPool.pop();
			if (req == null)
				req = new LURLRequest();
			req.host = _host;
			req.port = _port;
			return req;
		}
	}
}