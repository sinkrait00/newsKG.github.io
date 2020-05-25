document.addEventListener("DOMContentLoaded", ()=>{
const url = 'https://djangoparser.herokuapp.com/api/curr/'

fetch(url).then(response=>response.json())
.then(data=>{
        localStorage.setItem('table', JSON.stringify(data)); 
})
const getTableRecs = ()=>{
    return JSON.parse(localStorage.getItem('table'));
}
const createRecord = ()=>{
    const table = getTableRecs();
    table.forEach(item=>{
        record(item.code,item.name,item.value);
        currCode(item.code);
    })
}
const record = (code,name,value)=>{
    let record = document.createElement('div');
    record.className ="currency_table__record";
    let record_code = document.createElement('div');
    record_code.className= 'record_code';
    record_code.textContent = code;
    record.appendChild(record_code);
    let record_name = document.createElement('div');
    record_name.className ='record_nameCurr';
    record_name.textContent=name;
    record.appendChild(record_name);
    let record_value = document.createElement('div');
    record_value.className='record_valueCurr';
    record_value.textContent = value;
    record.appendChild(record_value);
    document.getElementById('currency_table').appendChild(record);
}
const currCode = (code)=>{
    const selectInput = document.querySelectorAll('#selectInputValueCurr');
    const selectOutput = document.querySelectorAll('#selectOutputValueCurr');
    selectInput.forEach(item=>{
        const opt = document.createElement('option');
        opt.textContent = code;
        item.appendChild(opt);
    })
    selectOutput.forEach(item=>{
        const opt = document.createElement('option');
        opt.textContent = code;
        item.appendChild(opt);
    })
}

let convertorShow = false;

document.getElementById('convertorBtn').addEventListener('click', ()=>{
    convertorShow = !convertorShow;
    if(convertorShow){
        document.getElementById('convertor').style.display = 'flex';
        document.getElementById('convertorBtn').textContent = "Закрыть конвертор валют";
    }else{
        document.getElementById('convertor').style.display = 'none';
        document.getElementById('convertorBtn').textContent = "Открыть конвертор валют";
    }
})




const changeInputHandler = ()=>{
    const inputVal = document.getElementById('inputValueCurr').value;
    const select1 = document.getElementById('selectInputValueCurr').value;
    const select2 = document.getElementById('selectOutputValueCurr').value;
    document.getElementById('outputValueCurr').value=k(inputVal,select1,select2);
}
    document.getElementById('inputValueCurr').addEventListener ("change",changeInputHandler);
    document.getElementById('selectInputValueCurr').addEventListener ("change",changeInputHandler);  
    document.getElementById('selectOutputValueCurr').addEventListener ("change",changeInputHandler);  

const k = (value,selectedVal,selectedVal2)=>{
    const table = getTableRecs();
    let curr1,curr2;
    table.map((item)=>{
        if(item.code==selectedVal){
            curr1= item.value/item.nominal;
           
        }
        if(item.code==selectedVal2){
            curr2=item.value/item.nominal;
        }
    })
    return (value*curr1/curr2).toFixed(3);
}
createRecord();
});