

class SimulationItemSlot
{
    Item;
    Count;
    CurrentDay;

    constructor (item)
    {
        this.Item = item;
        this.Count = 1;
        this.CurrentDay = 0;
    }

    Increase()
    {
        this.Count++;
    }

    Decrease()
    {
        this.Count--;
        return this.Count === 0;
    }

    NextDay()
    {
        // Only count for income-having items
        if (this.Income)
            this.CurrentDay++;
    }

    CanCollect(simulationDay)
    {
        return simulationDay % this.Item.IncomeFrequency === 0;
    }
}