

class Memory
{
    Name;
    DataSource;
    Accessor;

    constructor (name, dataSource, accessor)
    {
        this.Name = name;
        this.DataSource = dataSource;
        this.Accessor = accessor;
    }

    get Value()
    {
        let result = window.localStorage.getItem(this.Name);

        if (!result)
        {
            return this.Update();
        }

        return JSON.parse(result).Value;
    }

    Initialise()
    {
        let value = this.Value;

        log(value)
        this.DataSource[this.Accessor] = value;
    }

    Update()
    {
        let result = JSON.stringify({
            Value: this.DataSource[this.Accessor]
        });

        window.localStorage.setItem(this.Name, result);

        return this.DataSource[this.Accessor];
    }

    Reset()
    {
        let answer = window.confirm("Czy na pewno chcesz wyczyścić pamięć tego elementu?");

        if (!answer)
            return;

        this._Clear();

        window.location.reload();
    }
    
    _Clear()
    {
        window.localStorage.removeItem(this.Name);
    }
}