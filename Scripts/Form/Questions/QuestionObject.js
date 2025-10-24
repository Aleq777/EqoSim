

class QuestionObject extends QuestionSelect
{
    Source;
    KeyLabel;

    constructor (xml)
    {
        super (xml);

        this.Source = xml.Attr("Source")
        this.KeyLabel = xml.Attr("KeyLabel");
    }

    CreateHTML(obj)
    {
        this._SetBaseHTML(obj);

        let select = Create("select");
        select.id = Form.GetCellID();

        this.Answers.forEach((answer, index) => {

            let option = Create("option");
            option.value = index;
            option.innerHTML = answer[this.KeyLabel];
            select.appendChild(option);

        });

        this.Cell.appendChild(select);

        this.HTML = select;

        this.Reset();
    }

    _FillAnswers()
    {
        this.Answers = eval(this.XML.Attr("Source"));
    }

    Check()
    {
        if (!this.CheckIsFilledIfRequired())
            return false;

        return this.HideErrors();
    }

    GetValue()
    {
        return eval(this.Source)[this.HTML.value];
    }
}