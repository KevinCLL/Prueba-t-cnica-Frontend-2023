import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

function Home({ podcasts }) {
  const [query, setQuery] = useState('');
  const handleChange = (e) => {
    setQuery(e.target.value)
  }


  return (
    <main className="flex justify-center min-h-screen" >
      <div className="flex w-9/12 flex-col">
        <Header/>
        <div className="flex flex-row-reverse">
          <input type="text" id="filter" name="filter" onChange={handleChange} placeholder='Search...' />
          <p className="mr-4 px-2 rounded-lg bg-blue-600 text-white">{podcasts.filter(podcast => podcast.title.label.toLowerCase().includes(query.toLowerCase())).length}</p>
        </div>
        <div className="flex flex-wrap gap-4 justify-between">
          {podcasts.filter(podcast => podcast.title.label.toLowerCase().includes(query.toLowerCase())).map((podcast) => (
            <Link key={podcast.id.attributes['im:id']} href={`/podcast/${podcast.id.attributes['im:id']}`} className="flex flex-col justify-center w-1/5">
              <Image
                src={podcast['im:image'][2].label}
                alt="Picture of the author"
                width={podcast['im:image'][2].attributes.height}
                height={podcast['im:image'][2].attributes.height}
                className='rounded-full translate-x-3 translate-y-12 ring ring-gray-300'
              />
              <div className="ring ring-gray-300 pt-14 rounded-lg bg-white">
                <p className="uppercase font-bold text-center">{podcast['im:name'].label}</p>
                <p className="text-center text-gray-600">Author: {podcast['im:artist'].label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/topods`)
  const data = await res.json()

  return { props: { podcasts: data.feed.entry } }
}

export default Home;