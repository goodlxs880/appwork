class ActionMove 
{

    private _name:string;

    public get name():string
    {
        return this._name;
    }

    public set name(n:string)
    {
        this._name = n;
    }

    public printInfo(str : string):any
    {
        console.log(str);
        if (str == "hello")
        {
            return true;
        }
        return false;
    }
}