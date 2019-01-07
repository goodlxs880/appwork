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
        _this.skinName = "resource/ui/UChessBoard.exml";
        return _this;
    }
    UChessBoard.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    UChessBoard.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.lblTitle.text = "hello";
        this.btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    };
    UChessBoard.prototype.onButtonClick = function (e) {
        this.lblTitle.text = "hello world";
    };
    return UChessBoard;
}(eui.Panel));
__reflect(UChessBoard.prototype, "UChessBoard", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=UChessBoard.js.map