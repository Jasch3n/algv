import Link from 'next/link'
import Navbar from '../components/Navbar'

export default function H() {
  const buttonStyleString = `transition duration-500 ease-in-out border-2 border-white 
  rounded-full px-2 py-1 my-4 sm:mx-4 font-semibold font-mono text-white 
  hover:bg-white hover:text-black bg-opacity-25`;
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center h-screen bg-pink-300 bg-opacity-75">
        <div className="text-center font-mono text-lg font-extrabold text-black"> Visualize any of the following algorithms via randomly generated examples. </div>
          <div className=" flex flex-col sm:flex-row justify-center items-center">
            <div className={buttonStyleString}><Link href="/DijkstraControl"><a className="font-display semi-bold"> Dijkstra's Algorithm </a></Link></div>
            <div className={buttonStyleString}><Link href="/KruskalControl"><a className=""> Kruskal's Algorithm </a></Link></div>
          </div>
      </div>
    </div>
    
  )
}
