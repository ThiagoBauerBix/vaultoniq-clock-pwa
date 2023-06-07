import { useEffect } from "react";
import { useStep } from "../../hooks/useStep";
import { useNavigate } from "react-router-dom";
import { CaretLeft } from "@phosphor-icons/react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  notes: string;
};

export default function Notes() {
  const { setHeaderInfo, setNotes, notes } = useStep();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      notes: notes || "",
    },
  });

  useEffect(() => {
    setHeaderInfo({
      title: "Add Notes",
      icon: "notes",
    });
  }, [setHeaderInfo]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setNotes(data.notes);
    navigate("/review");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center justify-between mx-2 py-8">
        <textarea
          className="border border-1 border-gray-400 rounded-xl py-6 px-4"
          {...register("notes")}
          cols={35}
          rows={23}
          defaultValue={notes}
        />
      </div>
      <div className="flex flex-row items-center justify-between mx-2">
        <button
          className="btn-primary bg-transparent p-4 flex flex-row items-center gap-2 justify-center text-white"
          onClick={() => navigate("/photos")}
        >
          <CaretLeft
            className="bg-transparent"
            color="#fff"
            size={22}
            weight="fill"
          />
          Back
        </button>
        <button
          type="submit"
          className="btn-primary px-24 py-4 mr-4 flex flex-row items-center gap-2 justify-center text-white"
        >
          Next
        </button>
      </div>
    </form>
  );
}
