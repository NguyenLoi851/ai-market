import Link from 'next/link';
import NavLinks from '@/components/layout/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import Search from '@/components/creators/search';
import { featchModelTypes } from '@/lib/actions/model';
import { useEffect, useState } from 'react';
import type { ModelType } from '@/lib/definitions/model';

export default function SideNav() {
  const [modelTypes, setModelTypes] = useState<ModelType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const types = await featchModelTypes();
      setModelTypes(types);
    };
    fetchData();
  }, []);


  return (
    <div className="flex flex-col px-4 py-4 md:px-2">
      <div className="px-0.5 pb-4">
        <Search placeholder='Search Model...' />
      </div>
      <div className="flex grow flex-col max-w-lg pl-2 overflow-y-auto space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        {modelTypes.map((type) => (
          <label key={type.type} className="flex items-center space-x-2">
            <input type="checkbox" value={type.type} className="form-checkbox" />
            <span>{type.type}</span>
          </label>
        ))}

      </div>
    </div>
  );
}
