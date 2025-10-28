

// Data is used from Data object
class Simulation
{
    Day;
    Profiles;

    constructor ()
    {
        this.Profiles = [];
    }

    Initialise()
    {
        Data.Profiles.forEach(profile => {
            this._CreateProfile(profile);
        });
    }

    _CreateProfile(profile)
    {
        this.Profiles.push(
            new SimulationProfile(profile)
        );
    }

    Start()
    {
        const form = formManager.GetByName("SimulationCreator");

        const terminateEvent = form.Questions[0].GetValue(),
              minBal         = parseInt(form.Questions[1].GetValue()),
              maxBal         = parseInt(form.Questions[2].GetValue()),
              terminateDay   = parseInt(form.Questions[3].GetValue());

        for (this.Day = 0; this.Day <= terminateDay; this.Day++)
        {
            this._SimulateDay();
        }

        log(this.Profiles);
    }

    _SimulateDay()
    {
        // Get "before" day values
        const befores = this._GetCurrentBalances();
        
        // Use events
        this._RunEvents();

        // Collect incomes and pay expenses
        this._CollectAndPay();

        // Get "after" day values
        const afters = this._GetCurrentBalances();

        // Get income amount of the day
        const incomes = this._GetTodaysIncomes(befores, afters);

        let summary = new SimulationDay(this.Day, befores, incomes, afters);

        this._AddDay(summary);
    }

    _GetCurrentBalances()
    {
        let result = { };
        this.Profiles.forEach(profile => result[profile.Name] = profile.Balance);

        return result;
    }

    _GetTodaysIncomes(befores, afters)
    {
        let result = { };

        Object.entries(befores).forEach(entry => {
            const [index, beforeValue] = entry;

            result[index] = afters[index] - beforeValue;
        });

        return result;
    }

    _RunEvents()
    {
        this.Profiles.forEach(profile => profile.RunEvents(this.Day));
    }

    _CollectAndPay()
    {
        this.Profiles.forEach(profile => profile.CollectAndPay(this.Day));
    }

    _AddDay(summary)
    {
        Data.Days.push(summary);
        viewManager.GetByName("Simulation").Reload();
    }
}

const EqoSim = new Simulation();