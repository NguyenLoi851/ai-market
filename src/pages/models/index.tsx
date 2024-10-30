import SideNav from '@/components/layout/sidenav';
import { useEffect, useState } from 'react';
import type { ModelView } from '@/lib/definitions/model';
import { fetchModels } from '@/lib/actions/model';
import ModelCard from '@/components/models/model-card';


export default function Models() {

    const [modelViews, setModelViews] = useState<ModelView[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchModels();
            setModelViews(data);
        };
        fetchData();
    }, []);

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