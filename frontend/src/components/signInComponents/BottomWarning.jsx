import { Link } from "react-router-dom";

export function BottomWarning({label, buttonText, to}) {
    return <div className="font-semibold flex">
        <div className="mx-1">{label}</div>
        <Link className="underline" to={to}>{buttonText}</Link>
    </div>
}