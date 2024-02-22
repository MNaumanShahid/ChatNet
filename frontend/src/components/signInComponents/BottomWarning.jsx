
export function BottomWarning({label, buttonText}) {
    return <div className="font-semibold flex">
        <div className="mx-1">{label}</div>
        <button className="underline">{buttonText}</button>
    </div>
}