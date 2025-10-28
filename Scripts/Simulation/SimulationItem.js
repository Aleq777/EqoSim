

class SimulationItem
{
    Name;
    Price;
    SellValue;
    Income;
    IncomeFrequency;

    constructor (item)
    {
        this.Name = item.Name;
        this.Price = parseInt(item.Price);
        this.SellValue = parseInt(item.SellValue);
        this.Income = parseInt(item.Income);
        this.IncomeFrequency = parseInt(item.IncomeFrequency);
    }
}