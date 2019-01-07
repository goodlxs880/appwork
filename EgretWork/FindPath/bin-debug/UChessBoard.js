var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var UChessBoard = (function (_super) {
    __extends(UChessBoard, _super);
    function UChessBoard() {
        var _this = _super.call(this) || this;
        _this.skin.addEventListener(eui.UIEvent.COMPLETE, function () {
            // this.rectBg.graphics.lineStyle(1, 0x000000);
            // for (var i:number = 1; i < 30; i++)
            // {
            // 	this.rectBg.graphics.moveTo(i*20, 0);
            // 	this.rectBg.graphics.lineTo(i*20, 600);
            // }
            // for (var j:number = 1; j < 30; j++)
            // {
            // 	this.rectBg.graphics.moveTo(0, j*20);
            // 	this.rectBg.graphics.lineTo(600, j*20);
            // }
        }, _this);
        _this.skinName = "resource/ui/UChessBoard.exml";
        return _this;
    }
    UChessBoard.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    UChessBoard.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.$addListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    };
    UChessBoard.prototype.onButtonClick = function (e) {
        this.lblTitle.text = e.localX + "," + e.localY;
    };
    return UChessBoard;
}(eui.Panel));
__reflect(UChessBoard.prototype, "UChessBoard", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=UChessBoard.js.map