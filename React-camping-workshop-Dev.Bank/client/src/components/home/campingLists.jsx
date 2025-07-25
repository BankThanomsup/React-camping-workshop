

import CampingCard from "../card/CampingCard";
import useCampingStore from "@/store/camping-store";
import EmptyList from "./EmptyList";


const CampingLists = () => {

  // const[campings, setCamping] = useState([]);
    // console.log("campingLists",campings)
  const campings = useCampingStore((state)=>(state.campings))

  // console.log('bank' ,campings)
  if(campings.length ===0){
    return <EmptyList />
  }
  return (
    <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-4">
      {campings.map((element) => {
        return <CampingCard key={element.id} 
        camping={element}/> 
      })}
      {/* <div>campingLists</div> */}
    </section>
  )
}

export default CampingLists