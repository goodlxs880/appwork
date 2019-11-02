namespace ash {

    export class PcKeyBoardHelper
    {
        private static _instance: PcKeyBoardHelper;
        private list: Object;
        private isListening: boolean = false;
    
        public constructor() {
            this.list = {};
        }
    
        public static get instance(): PcKeyBoardHelper {
            if(PcKeyBoardHelper._instance == null) {
                PcKeyBoardHelper._instance = new PcKeyBoardHelper();
            }
            return PcKeyBoardHelper._instance;
        }
    
        private add(): void {
            if(this.isListening == false) {
                this.isListening = true;
                document.addEventListener("keydown",PcKeyBoardHelper.instance.onKeyDown);
            }
        }
    
        private onKeyDown(evt): void {
            console.log("evt.keyCode:" + evt.keyCode);
            var target: any;
            for(target in PcKeyBoardHelper.instance.list) {
                var vo: KeyVo = PcKeyBoardHelper.instance.list[target];
                vo.callback.call(vo.target,evt);
            }
        }
    
    
        /**
         * 注册监听
         * @param callback 回调方法
         * @param target 
         */
        public addListener(callback: any,target: any): void {
            var temp: string = egret.getQualifiedClassName(target);
            if(PcKeyBoardHelper._instance.list[temp] == null) {
                var vo: KeyVo = new KeyVo(temp,target,callback);
                PcKeyBoardHelper._instance.list[vo.name] = vo;
            }
            PcKeyBoardHelper._instance.add();
        }
    
    
        /**
         * 移出监听
         */
        public removeListener(target: any): void {
            var temp: string = egret.getQualifiedClassName(target);
            if(PcKeyBoardHelper._instance.list[temp] != null) {
                delete PcKeyBoardHelper._instance.list[temp];
            }
            this.checkCount();
        }
    
    
        private checkCount(): void {
            for(var key in PcKeyBoardHelper._instance.list) {
                return;
            }
            document.removeEventListener("keydown",PcKeyBoardHelper.instance.onKeyDown);
            this.isListening = false;
        }
    }
    
    class KeyVo {
        public name: string = "";
        public target: egret.DisplayObject;
        public callback: Function;
    
        public constructor(name: string,tar: any,call: any) {
            this.name = name;
            this.target = tar;
            this.callback = call;
        }
    }

}