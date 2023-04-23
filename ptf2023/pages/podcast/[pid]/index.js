import { useRouter } from 'next/router'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Header from '@/components/Header'
import Description from '@/components/Description'

const inter = Inter({ subsets: ['latin'] })

function Page({ podcast }) {
  const router = useRouter()
  const { pid } = router.query

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
          <div className="flex flex-col w-3/4 p-8">
            <p className="ring ring-gray-300 mt-6 p-8 w-full rounded-lg bg-white text-xl font-bold">
              Episodes: {podcast.resultCount}
            </p>
            <div className="ring ring-gray-300 mt-6 p-8 w-full rounded-lg bg-white">
              <table className="table-fixed w-full">
                <thead>
                  <tr>
                    <th className="w-3/5">Title</th>
                    <th>Date</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {podcast.results.filter(pd => pd.wrapperType === "podcastEpisode").map((pd) => (
                    <tr className="even:bg-gray-200">
                      <td className="text-blue-600"><Link key={pd.trackId} href={`/podcast/${pid}/episode/${pd.trackId}`} className="flex">{pd.trackName}</Link></td>
                      <td className="text-center">{`${pd.releaseDate.toLocaleString().split(',')[0].split('T')[0].replaceAll('-', '/')}`}</td>
                      <td className="text-center">{`${Math.floor((pd.trackTimeMillis/1000/60) << 0)}:${Math.floor((pd.trackTimeMillis/1000) % 60)}`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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