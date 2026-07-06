import ModeratorDashboardItem from './ModeratorDashboardItem';

export default function ModeratorList({ moderators }) {
    return (
        <>
            <div className="flex flex-col gap-4">
                {[...moderators].reverse().map((moderator) => (
                    <ModeratorDashboardItem
                        key={moderator.id}
                        moderator={moderator}
                    />
                ))}
            </div>
        </>
    );
}
