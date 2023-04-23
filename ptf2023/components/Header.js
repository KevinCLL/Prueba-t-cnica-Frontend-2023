import Link from 'next/link'

export default function Header() {
    return (
        <div className="text-blue-600 text-2xl my-4 pb-2 border-b-4" >
            <Link href={'/'}>
                <h1>Podcaster</h1>
            </Link>
        </div>
    );
}