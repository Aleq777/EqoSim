

const EventsDataName = "Aleq777.EqoSim.Events";

let EventsMemory = new Memory(EventsDataName, Data, "Events");

function EditEvent(index, item)
{
    const eventsForm = formManager.GetByName("EventsCreator");

    eventsForm.Edit(index);
}

function RemoveEvent(index, item)
{
    const eventsView = viewManager.GetByName("Events");

    delete Data.Events[index];

    eventsView.Reload();
}