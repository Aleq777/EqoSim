

class QuestionMultiSelect extends ComplexQuestion
{
    constructor (xml)
    {
        super (xml);
    }
    
    CreateHTML(obj)
    {
        this._SetBaseHTML(obj);

        let select = Create("select");
        select.id = Form.GetCellID();
        select.multiple = true;

        this.Answers.forEach(answer => {
            
            let option = Create("option");
            option.value = answer.Value;
            option.innerHTML = answer.Content;
            select.appendChild(option);

        });

        this.Cell.appendChild(select);

        this.HTML = select;

        this.Reset();
    }

    GetValue()
    {
        return this.GetSelectedValues(this.HTML);
    }

    GetSelectedValues(mutliSelect)
    {
        let result = [];

        mutliSelect.forEach(option => {
            switch (option.tagName.toLowerCase())
            {
                case "option":
                    if (option.selected)
                        result.push(option.value);

                    break;
                case "optgroup":
                    let innerOptions = this.GetSelectedValues(option);

                    innerOptions.forEach(item => {
                        result.push(item);
                    });
                    break;
                default:
                    break;
            }
        });

        return result;
    }
}