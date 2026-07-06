import CharacterLogItem from './CharacterLogItem';
import ContactLogItem from './ContactLogItem';

export default function LogList({
    logs,
    isContactLogPage = false,
    isCharacterLogPage = false,
}) {
    return (
        <>
            <div className="flex flex-col gap-4">
                {[...logs].reverse().map((log) => {
                    if (isContactLogPage) {
                        return <ContactLogItem key={log.id} contactLog={log} />;
                    } else if (isCharacterLogPage) {
                        return (
                            <CharacterLogItem key={log.id} characterLog={log} />
                        );
                    }
                })}
            </div>
        </>
    );
}
