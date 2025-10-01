import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import API from "../../api/axios";
import { X } from "lucide-react";
import type { Subscription,ExtendedSubscription } from "../../redux/types/subscription.types";
import { useAppDispatch } from "../../redux/hooks";
import { fetchUsers } from "../../redux/Slice/useSliceForAdmin/userSlice";


interface Props {
  userId:string;
  id?: string;
  onClose: () => void;
  onSuccess: () => void;
}

const defaultValues: ExtendedSubscription = {
  _id: "",
  startDate: "",
  endDate: "",
  amount: 0,
  studentLimit: 0,
  staffLimit: 0,
  features: [],
  userId: "",
};
const featureOptions = ["attendance", "timeTable", "exam"];

const SubscriptionForm: React.FC<Props> = ({ id, onClose, onSuccess,userId }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<ExtendedSubscription>({ defaultValues:{
    ...defaultValues,
  } });
  // states
  const dispatch = useAppDispatch();

  const features = watch("features") || [];

  useEffect(() => {
    console.log("SubscriptionId",id)
    if (id) {
      API.get<Subscription>(`/subscriptions/${id}`).then((res) => {

        const formdata:ExtendedSubscription={
          ...res.data,
          startDate:res.data.startDate.split("T")[0],
          endDate:res.data.endDate.split("T")[0],
          userId: userId,
        }
        reset(formdata);
      });
    } else {
      reset({
      // ...defaultValues,
      userId,
    });
    }
  }, [id]);

  const toggleFeature = (feature: string) => {
    const exists = features.includes(feature);
    const updated = exists
      ? features.filter((f) => f !== feature)
      : [...features, feature];
    setValue("features", updated);
  };

  const onSubmit = async (data: Subscription) => {
    try {
      if (id) {
        await API.put(`/subscriptions/${id}`, data);
      } else {
        await API.post("/subscriptions", data);
      }
      await dispatch(fetchUsers())
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">{id ? "Update" : "Create"} Subscription</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
            <label className="block text-sm">user ID</label>
            <input type="text" {...register("userId", { required: true })} className="w-full border p-2 rounded" disabled />
          </div>
          <div>
            <label className="block text-sm">Start Date</label>
            <input type="date" {...register("startDate", { required: true })} className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="block text-sm">End Date</label>
            <input type="date" {...register("endDate", { required: true })} className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="block text-sm">Amount</label>
            <input type="number" {...register("amount", { required: true })} className="w-full border p-2 rounded" />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm">Student Limit</label>
              <input type="number" {...register("studentLimit", { required: true })} className="w-full border p-2 rounded" />
            </div>
            <div className="flex-1">
              <label className="block text-sm">Staff Limit</label>
              <input type="number" {...register("staffLimit", { required: true })} className="w-full border p-2 rounded" />
            </div>
          </div>

          <div>
            <label className="block text-sm">Features</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {featureOptions.map((feature) => (
                <button
                  key={feature}
                  type="button"
                  onClick={() => toggleFeature(feature)}
                  className={`px-3 py-1 rounded-full border ${
                    features.includes(feature) ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {feature}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 text-right">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {id ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionForm;
