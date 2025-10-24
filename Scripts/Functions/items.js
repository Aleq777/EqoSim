

const ItemsDataName = "Aleq777.EqoSim.Items";

let ItemsMemory = new Memory(ItemsDataName, Data, "Items");

function EditItem(index, item)
{
    const itemsForm = formManager.GetByName("ItemsCreator");

    itemsForm.Edit(index);
}

function RemoveItem(index, item)
{
    const itemsView = viewManager.GetByName("Items");

    delete Data.Items[index];

    itemsView.Reload();
}