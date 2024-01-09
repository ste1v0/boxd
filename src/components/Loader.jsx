import { AtomLoader } from 'react-loaders-kit'

export default function Loader({ loading }) {

    const loaderProps = {
        loading,
        size: 100,
        duration: 0.5,
    }
    return (
        <div className="loader">
            <AtomLoader {...loaderProps}/>
        </div>
    )
}