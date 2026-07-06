import ItemsList from '@/components/items/ItemsList';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

export default function Items({ items }) {
    return (
        <>
            <Head title="Dashboard - Items" />

            <div className="px-4 py-[2rem]">
                <div className="mb-[2rem] flex items-center justify-between">
                    <h2 className="text-lg font-bold">Created Items</h2>
                    <Link
                        className="cursor-pointer rounded bg-green-400 px-2 py-1"
                        href={'/dashboard/items/create'}
                    >
                        <Plus />
                    </Link>
                </div>

                <ItemsList items={items} />
            </div>
        </>
    );
}
