import FormInputs from "@/components/form/FormInputs";
import TextAreaInput from "@/components/form/TextAreaInput";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { campingSchema } from "@/utils/schema";
import { Button } from "@/components/ui/button";
import Buttons from "@/components/form/Buttons";
import CategoryInput from "@/components/form/Categoryinput";
import MainMap from "@/components/map/Mainmap";


const Camping = () => {
  const { register, handleSubmit,formState, setValue} = useForm({
    resolver: zodResolver(campingSchema),
  });
  const {errors,isSubmitting} = formState;
  // console.log("Form Errors:", errors); // Debugging
  console.log(isSubmitting)
  const BankSubmit = async (data) => {
    await new Promise((resolve)=>setTimeout(resolve,3000))
    console.log(data);
  };

  return (
    <section>
      <h1 className="capitalize text-2xl font-semibold">create camping</h1>
      <div className="border p-8 rounded-md">
        <form onSubmit={handleSubmit(BankSubmit)}>
          <div className="grid md:grid-cols-2 gap-4 mt-4 ">
            <FormInputs
              register={register}
              name="title"
              type="text"
              placeholder="Input Your Title"
              errors={errors}
            />

            <FormInputs
              register={register}
              name="price"
              type="number"
              placeholder="Input Your Price"
              errors={errors}
            />

            <TextAreaInput
              register={register}
              name="description"
              type="text"
              placeholder="Input Your Description"
              errors={errors}
            />
            <CategoryInput name="category" register={register} setValue={setValue}/>
            </div>

            <MainMap name="" register={register} setValue={setValue} />
            <Buttons text="create camping" isPending={isSubmitting} />
        </form>

      </div>
    </section>
  );
};

export default Camping;
