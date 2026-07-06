export default function CharacterLogItem({ characterLog }) {
    const createdAt = new Date(characterLog.created_at);

    return (
        <>
            <section className="flex justify-between rounded border border-sidebar-border/80 px-3 py-4">
                <div className="flex flex-col gap-2 px-1 py-1.5 text-left text-sm">
                    <p>Character Name: {characterLog.name}</p>
                    <p>User id: {characterLog.user_id}</p>

                    {Array.isArray(characterLog.changes) ? (
                        <p>Changes: None</p>
                    ) : (
                        <>
                            <p>Changes: </p>
                            {Object.entries(characterLog.changes).map(
                                ([key, val]) => (
                                    <p className="pl-4" key={key}>
                                        {key}: {val}
                                    </p>
                                ),
                            )}
                        </>
                    )}

                    <p>Items: </p>
                    {characterLog.items.map((itemId) => (
                        <p className="pl-4" key={itemId}>
                            Id: {itemId}
                        </p>
                    ))}

                    <p>
                        Time Updated: {createdAt.getDate()}-
                        {createdAt.getMonth()}-{createdAt.getFullYear()}{' '}
                        {createdAt.getHours()}:{createdAt.getMinutes()}
                    </p>
                </div>
            </section>
        </>
    );
}
