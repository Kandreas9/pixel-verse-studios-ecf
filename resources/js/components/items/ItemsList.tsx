import ItemDashboardItem from './ItemDashboardItem';

export default function ItemsList({ items }) {
    return (
        <>
            <div className="flex flex-col gap-4">
                {[...items].reverse().map((item) => (
                    <ItemDashboardItem key={item.id} item={item} />
                ))}
            </div>
        </>
    );
}
