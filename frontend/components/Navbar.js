import Link from 'next/link'

export default function Navbar({isBlack}){
    return <div className="absolute top-0 right-0 p-4 w-full flex justify-between items-center font-display">
    <Link href="/">
        <a className="font-semibold font-mono ${isBlack?text-black:text-white} text-lg pl-3">
            AlgV
        </a>
    </Link>
    </div>
}