namespace ash {

	export interface ISystemProvider
	{
		getSystem() : System;

		getIdentifier() : any;

		getPriority() : number;

		setPriority( value : number ) : void;
	}
}
