
export function Button({label, onClick}) {
    return <div>
        <button onClick={onClick} className="my-5 text-lg text-white bg-black w-full rounded-full px-24 py-3 font-semibold">{label}</button>
    </div>
}