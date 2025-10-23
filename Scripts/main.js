var formManager = null;
var viewManager = null;

function LoadQFormView()
{
    // ViewManager.Start();
    viewManager = new ViewManager();
    formManager = new FormManager();

    ProfilesMemory.Initialise();
    // Data.Profiles = ProfilesMemory.Get;
    // LoadProfiles();
    
    formManager.Start();
    viewManager.Start();
    // FormManager.Start();
}