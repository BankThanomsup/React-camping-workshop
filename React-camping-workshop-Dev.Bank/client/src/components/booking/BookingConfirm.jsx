import useBookingStore from "@/store/booking-store"
import Buttons from "../form/Buttons"
import { SignInButton, useAuth } from "@clerk/clerk-react"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { createBooking } from "@/api/booking"
import { useNavigate } from "react-router"


const BookingConFirm = () => {
  //Zustand หมูเด้ง
  const range = useBookingStore((state)=>state.range)
  const checkIn = range?.from;
  const checkOut = range?.to;
  const campingId = useBookingStore((state)=>state.campingId)
  // console.log(campingId,range)

  //clerk
  const {getToken , userId} =useAuth();
  // console.log(userId)

    //Hook Form
    const { handleSubmit ,setValue,formState } = useForm()
    const { isSubmitting } = formState;
    //Navigate
    const navigate = useNavigate();


  if(!userId) {
    return (
      <div className="flex justify-center">
        <SignInButton mode="modal" forceRedirectUrl={`/user/camping/${campingId}`}>
          <Button>Sigin In ก่อน</Button>
        </SignInButton>
      </div>
    )
  }

  useEffect(()=>{
    if(campingId) setValue("campingId",campingId)
    if(checkIn) setValue("checkIn",checkIn)
    if(checkOut) setValue("checkOut",checkOut)
  },[range])
  
  const hdlBooking = async (value)=>{
    const token = await getToken()
    try {
      const res = await createBooking(token,value)  
      // console.log(res.data.result)
      const bookingId = res.data.result
      navigate(`/user/checkout/${bookingId}`)
    } catch (error) {  
      console.log(error)
      
    }
    }
  

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(hdlBooking)}>

      <Buttons text="confirm button" isPending={isSubmitting}/>
      </form>
    </div>
  )
};

export default BookingConFirm