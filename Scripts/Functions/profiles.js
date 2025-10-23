
const ProfilesDataName = "Aleq777.EqoSim.Profiles";

let ProfilesMemory = new Memory(ProfilesDataName, Data, "Profiles");

function EditProfile(index, item)
{
    const profilesForm = formManager.GetByName("ProfilesCreator");

    profilesForm.Edit(index);
}

function RemoveProfile(index, item)
{
    const profilesView = viewManager.GetByName("Profiles");

    delete Data.Profiles[index];
    
    profilesView.Reload();
}