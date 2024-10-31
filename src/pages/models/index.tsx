import SideNav from "@/components/layout/sidenav";
import { useContext, useEffect, useState } from "react";
import type { ModelView } from "@/lib/definitions/model";
import { fetchModels } from "@/lib/actions/model";
import ModelCard from "@/components/models/model-card";
import { useGetAllModels } from "@/hooks/payment/use-get-all-models";
import { NearContext } from "@/wallets/near";
import BigNumber from "bignumber.js";

export default function Models() {
  const [modelViews, setModelViews] = useState<ModelView[]>([]);

  const { data: allModelsFromBlockchain } = useGetAllModels();

  useEffect(() => {
    const fetchData = async () => {
      if (!allModelsFromBlockchain) return;

      const data = await fetchModels();
      console.log("==========================", data);
      console.log("==========================", allModelsFromBlockchain);

      const data1 = data;
      const data2 = allModelsFromBlockchain;
      // Merging data
      const mergedData = data1.map((item) => {
        const data2Item = data2.find(
          ([_, d2]: [any, any]) => d2.metadata_id === item.row_num
        );

        if (data2Item) {
          const [blockchainId, { creator, fee_per_prompt, usage_count }] =
            data2Item;

          return {
            ...item,
            creator,
            feePerPrompt: new BigNumber(fee_per_prompt)
              .shiftedBy(-8)
              .toNumber(),
            usageCount: usage_count,
            blockchainId,
          };
        }

        return item; // Return original item if no match found
      });

      // Get variables in data1 with the additional fields
      const resultWithAddedFields = mergedData.filter(
        (item) => "blockchainId" in item
      );

      // Output the result
      console.log("resultWithAddedFields", resultWithAddedFields);
      const sortedResults = resultWithAddedFields.sort((a, b) => {
        return (b.usageCount || 0) - (a.usageCount || 0); // Handle potential undefined values
      });
      setModelViews(sortedResults);
    };
    fetchData();
  }, [allModelsFromBlockchain]);

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-1 px-6 pt-4 pb-6 grid grid-rows-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:overflow-y-auto">
        {modelViews.map((model, index) => (
          <ModelCard key={index} model={model} />
        ))}
      </div>
    </div>
  );
}
