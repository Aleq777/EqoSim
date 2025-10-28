

class SimulationDay
{
    Day;
    // [Profile Name]: { Before, Change, After }

    constructor (day, befores, incomes, afters)
    {
        this.Day = day;

        Object.entries(befores).forEach(entry => {

            const [index, beforeValue] = entry;

            this[index] = {
                Before: beforeValue,
                Change: incomes[index],
                After: afters[index]
            };

        });
    }
}