

class SimulationProfile
{
    Name;
    Balance;
    Inventory;
    Events;

    constructor (profileData)
    {
        this.Name = profileData.Name;
        this.Balance = profileData.Balance;
        this.Inventory = [];
        this.Events = [];

        this._Initialise(profileData.Name);
    }

    _Initialise(myName)
    {
        Data.Events.forEach(event => {
            if (event.Profile.Name !== myName)
                return;

            this.Events.push(
                new SimulationEvent(event)
            );
        });
    }

    RunEvents(simulationDay)
    {
        let runnedEvents = [];

        this.Events.forEach(event => {
            if (simulationDay === parseInt(event.Day))
                runnedEvents.push(event);
        });

        runnedEvents.forEach(event => this._Run(event));
    }

    _Run(event)
    {
        switch (event.Act)
        {
            case EnumEventTypes.Buy:
                this.Buy(event.Item);
                break;
            case EnumEventTypes.Sell:
                this.Sell(event.Item);
                break;
            default:
                break;
        }
    }

    Buy(item)
    {
        this._AppendToInventory(item);
        this.Balance -= item.Price;
    }

    _AppendToInventory(newItem)
    {
        let found = null;

        this.Inventory.forEach((item, index) => {
            if (item.Name === newItem.Name)
                found = index;
        });

        if (found === null)
        {
            this.Inventory.push(
                new SimulationItemSlot(newItem)
            );
        }
        else
        {
            this.Inventory[found].Increase();
        }
    }

    Sell(item)
    {
        this._TrySell(item);
    }

    _TrySell(itemToSell)
    {
        let sold = false;

        this.Inventory.forEach((item, index) => {

            if (sold)
                return;

            if (item.Name !== itemToSell.Name)
                return;

            sold = true;

            let mustRemove = item.Decrease();
            this.Balance += item.SellValue;

            if (mustRemove)
                this._RemoveItemAt(index);
        });
    }

    _RemoveItemAt(index)
    {
        delete this.Inventory[index];
    }

    CollectAndPay(simulationDay)
    {
        this.Inventory.forEach(slot => {
            log(slot)

            if (slot.Item.Income && slot.CanCollect(simulationDay))
                this._CollectFrom(slot);

            slot.NextDay();
        });
    }

    _CollectFrom(slot)
    {
        this.Balance += slot.Item.Income;
    }
}