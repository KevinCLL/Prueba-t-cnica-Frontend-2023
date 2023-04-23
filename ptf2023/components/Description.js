import Image from 'next/image'
import Link from 'next/link'

export default function Description({ title, author, image, link }) {
    return (
        <Link href={link} className="flex flex-col w-1/4 ring ring-gray-300 mt-14 p-8 rounded-lg bg-white">
            <Image
                src={image}
                alt="Picture of the author"
                width="600"
                height="600"
            />
            <h2 className="uppercase font-bold text-center" >{title}</h2>
            <h3 className="text-center text-gray-600">by {author}</h3>
        </Link>
    );
}