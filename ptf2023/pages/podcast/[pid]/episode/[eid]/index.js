import { useRouter } from 'next/router'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Description from '@/components/Description'

const inter = Inter({ subsets: ['latin'] })

function Page({ podcast }) {
  const router = useRouter()
  const { pid, eid } = router.query

  return (
    <main className="flex justify-center min-h-screen" >
      <div className="flex w-9/12 flex-col">
        <Header/>
        <div className="flex flex-row">
          <Description
            title={podcast.results[0].artistName}
            author={podcast.results[0].collectionName}
            image={podcast.results[0].artworkUrl600}
            link={router.asPath.split('/episode')[0]}
          />
          <div className="flex flex-col w-3/4 ring ring-gray-300 my-14 mx-8 p-8 rounded-lg bg-white">
            {podcast.results.filter(pd => pd.trackId == eid).map((pd) => (
              <div key={pd.trackId}>
                <p className="text-xl font-bold">{pd.trackName}</p>
                <p className="text-gray-600 italic mt-5 mb-8" dangerouslySetInnerHTML={{ __html: pd.description }}></p>
                <audio className="w-full" src={pd.episodeUrl} controls />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export async function getServerSideProps({ query }) {
  const { pid } = query;
  const res = await fetch(`http://localhost:3000/api/getpod/${pid}`)
  const data = await res.json()

  return { props: { podcast: data } }
}

export default Page;