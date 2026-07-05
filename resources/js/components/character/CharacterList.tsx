import CharacterDashboardItem from './CharacterDashboardItem';
import CharacterItem from './CharacterItem';
import CharacterSharedItem from './CharacterSharedItem';

export default function CharacterList({
    user = {},
    characters,
    isSharedPage = false,
    isDashboardPage = false,
}) {
    return (
        <>
            <div className="flex flex-col gap-4">
                {[...characters].reverse().map((character) => {
                    if (isSharedPage) {
                        return (
                            <CharacterSharedItem
                                key={character.id}
                                user={character.user}
                                character={character}
                            />
                        );
                    } else if (isDashboardPage) {
                        return (
                            <CharacterDashboardItem
                                key={character.id}
                                user={character.user}
                                character={character}
                            />
                        );
                    } else {
                        return (
                            <CharacterItem
                                key={character.id}
                                user={user}
                                character={character}
                            />
                        );
                    }
                })}
            </div>
        </>
    );
}
