import { Model } from "@/lib/definitions/model";
import Link from "next/link";
import {
  CheckIcon,
  ClockIcon,
  PencilIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/button/button";
import { createModel, State } from "@/lib/actions/model";
import { useRouter } from "next/navigation";
import { useBatchRegisterModel } from "@/hooks/batch/use-batch-register-model";
import { useState } from "react";

export default function Form() {
  const router = useRouter();
  const { mutateAsync: batchRegisterModel } = useBatchRegisterModel();
  const [feePerPrompt, setFeePerPrompt] = useState("0.01");

  const handleSubmit = async (formData: FormData) => {
    let id = await createModel(formData);
    console.log(id);
    await batchRegisterModel({
      feePerPrompt,
      metadataId: id as any,
    });
    router.push("/creators");
  };

  return (
    <>
      <input
        type="text"
        defaultValue="0.01"
        className="border-black border-2 rounded-md m-2"
        placeholder="Fee per prompt"
        onChange={(t) => setFeePerPrompt(t.target.value)}
      />

      <form action={handleSubmit}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          {/* Customer Name */}
          <div className="mb-4">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              Name
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter model name"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium"
            >
              Description
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Enter Description"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>

          {/* Invoice Status */}
          <fieldset>
            <legend className="mb-2 block text-sm font-medium">
              Set the model type
            </legend>
            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input
                    id="chat"
                    name="type"
                    type="radio"
                    value="chat"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label
                    htmlFor="chat"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                  >
                    Chat <ClockIcon className="h-4 w-4" />
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="image"
                    name="type"
                    type="radio"
                    value="image"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label
                    htmlFor="image"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                  >
                    Image <CheckIcon className="h-4 w-4" />
                  </label>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/creators"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Create Model</Button>
        </div>
      </form>
    </>
  );
}
