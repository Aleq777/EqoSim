

var formManager = new FormManager();
var viewManager = new ViewManager();


function LoadQFormView()
{
    ProfilesMemory  .Initialise();
    ItemsMemory     .Initialise();
    EventsMemory    .Initialise();
    
    formManager.Start();
    viewManager.Start();
}