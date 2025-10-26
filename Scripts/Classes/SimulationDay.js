

class SimulationDay
{
    Day;

    constructor (day)
    {
        this.Day = day;

        Data.Profiles.forEach(profile => {


            this[profile.Name] = {
                Before: profile.Balance,
                Change: 0,
                After: 0
            };

        });
    }


}