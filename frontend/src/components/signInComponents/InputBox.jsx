
export function InputBox({onChange}) {
    return <div>
        <input onChange={onChange} type="text" className="border-2 p-1 w-full rounded" />
    </div>
}