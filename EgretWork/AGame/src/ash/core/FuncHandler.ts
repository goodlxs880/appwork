namespace ash {

    export class FuncHandler
    {
        private _func : any;
        private _thisobj : any;
        private _args : any[];

        constructor( func : any, thisobj : any, args? : any )
        {
            this._func = func;
            this._thisobj = thisobj;
            this._args = args;
        }

        public apply( args? : any ) : any
        {
            if ( args.length > 0 ) 
            {
                return this._func.apply( this._thisobj, args );
            }
            else
            {
                return this._func.apply( this._thisobj, this._args );
            }
        }

        public apply2( arg1 : any, arg2 : any) : any
        {
            if ( arg1 != null && arg2 != null ) 
            {
                return this._func.apply( this._thisobj, arg1, arg2 );
            }
            else
            {
                return this._func.apply( this._thisobj, this._args );
            }
        }
    }

}