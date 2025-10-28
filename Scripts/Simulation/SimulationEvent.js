
const EnumEventTypes = {
    Buy: "Buy",
    Sell: "Sell"
};

class SimulationEvent
{
    Item;
    Day;
    Act;

    constructor (event)
    {
        this.Item = new SimulationItem(event.Item);
        this.Day = event.Day;
        this.Act = event.Act;
    }
}