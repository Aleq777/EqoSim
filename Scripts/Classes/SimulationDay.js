

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
                After: profile.Balance
            };

        });

        this._UpdateDay();
    }

    _UpdateDay()
    {
        let change = { };
        Data.Profiles.forEach(profile => change[profile.Name] = 0);

        Data.Events.forEach(event => {

            if (this.Day + 1 == event.Day)
            {
                // log("KAKA");

                const cost = event.Act === "Buy" ? -event.Item.Price : event.Item.SellValue;
                // log(cost);

                // searching for the correct profile
                Data.Profiles.forEach(profile => {
                    if (profile.Name === event.Profile.Name)
                    {
                        profile.Balance += cost;
                    }
                })

                // event.Profile.Balance += cost;
                Data.Profiles.forEach(profile => log(profile == event.Profile));
                // log(event.Profile);
                change[event.Profile.Name] += cost;

                // update current
                this[event.Profile.Name].Change += cost;
                // log(this[event.Profile.Name].Before);
                log(cost);
                this[event.Profile.Name].After += this[event.Profile.Name].Before + cost;
            }
        });
    }
}