

class SimulationDay
{
    Day;

    constructor (day)
    {
        this.Day = day;

        Data.Profiles.forEach(profile => {

            if (profile.Current == null)
            {
                profile.Current = 0;
            }

            this[profile.Name] = {
                Before: profile.Current,
                Change: 0,
                After: 0
            };

        });
    }


}