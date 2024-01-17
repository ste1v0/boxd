import '../App.css'

export default function Backdrop({setDropdown}) {

    function closeWindow() {
        setDropdown(false)
    }

    return (
        <> 
                <div className="backdrop" onClick={closeWindow}></div>
                <div className="backdrop__close hover" onClick={closeWindow}></div>
        </>
    )
}