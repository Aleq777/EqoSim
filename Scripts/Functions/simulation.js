

function InitialiseSimulationView()
{
    const simulationViewXML = document.getElementById("views");

    const parser = new DOMParser();

    const views = parser.parseFromString(simulationViewXML.innerHTML, "application/xml");

    let view = views.FindTag("View");

    let content = `
    <Views>
        <View Name="Simulation" Title="Przebieg symulacji">
            <Description>
                Jeśli nie wyświetla się żaden profil, przejdź do
                <a href="./profiles.html">Profile</a>
                i utwórz tam profil.
                <br/>
                <b>
                    Rozpoznasz brak profili po wyświetlaniu się jedynie kolumny <u>Dzień</u>
                </b>
            </Description>
            <Data>Data.Days</Data>
            <Column Key="Day">
                <Title>Dzień</Title>
            </Column>
    `;

    Data.Profiles.forEach(profile => {
        content += _CreateProfileColumn(views, profile);
    });

    content += `</View> </Views>`;
    simulationViewXML.innerHTML = content;
}

function _CreateProfileColumn(doc, profile)
{
    let d = doc.createElement("a");

    let column = doc.createElement("Column");
    column.SetAttr("Type", "Custom");

    let columnTitle = doc.createElement("Title");
    columnTitle.innerHTML = `<div style="background-color:${profile.Color};">
        ${profile.Name}
    </div>`;
    column.appendChild(columnTitle);

    let columnEach = doc.createElement("Each");
    columnEach.SetAttr("Using", `$=${profile.Name}`);
    column.appendChild(columnEach);

    //#region innerColumn
    let table = doc.createElement("Table");
    columnEach.appendChild(table);
    
    let data = doc.createElement("Data");
    data.innerHTML = `[$]`;
    table.appendChild(data);

    let beforeColumn = doc.createElement("Column");
    beforeColumn.SetAttr("Key", "Before");
    let beforeColumnTitle = doc.createElement("Title");
    beforeColumnTitle.innerHTML = "Przed";
    beforeColumn.appendChild(beforeColumnTitle)
    table.appendChild(beforeColumn);
    
    let changeColumn = doc.createElement("Column");
    changeColumn.SetAttr("Key", "Change");
    let changeColumnTitle = doc.createElement("Title");
    changeColumnTitle.innerHTML = "Zmiana";
    changeColumn.appendChild(changeColumnTitle)
    table.appendChild(changeColumn);
    
    let afterColumn  = doc.createElement("Column");
    afterColumn.SetAttr("Key", "After");
    let afterColumnTitle  = doc.createElement("Title");
    afterColumnTitle.innerHTML = "Po";
    afterColumn.appendChild(afterColumnTitle)
    table.appendChild(afterColumn);
    //#endregion

    d.appendChild(column);
    return d.innerHTML;
}

function StartSimulation(index, item)
{
    const terminateOn = item.Questions[0].GetValue();

    const minBal = item.Questions[1].GetValue();

    const maxBal = item.Questions[2].GetValue();

    const lastDay = item.Questions[3].GetValue();

    const view = viewManager.GetByName(item.ConnectedView);


    for (let i = 0; i + 1 <= lastDay; i++)
    {
        let day = new SimulationDay(i);

        Data.Days.push(day);
        view.Reload();
    }

}