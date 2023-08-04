import './Spinner.scss'

export default function Spinner() {
    return (
        <div className={"spinner"}>
        <h2>Loading</h2>
            {/*<div className={"first-dot"}></div>*/}
            <div className={"second-dot"}></div>
            <div className={"third-dot"}></div>
        </div>
    )
}
