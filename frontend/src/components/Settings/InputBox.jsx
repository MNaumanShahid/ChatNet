
export function InputBox({value, setValue}) {
    
    const changeHandler = (e) => {
        setValue(e.target.value);
    }

    return <div>
        <input onChange={changeHandler} defaultValue={value} type="text" className="border-2 rounded-md p-1" />
    </div>
}