import CharacterItem from './CharacterItem';
import CharacterSharedItem from './CharacterSharedItem';

export default function CharacterList({
    user = {},
    characters,
    isSharedPage = false,
}) {
    return (
        <>
            <div className="flex flex-col gap-4">
                {[...characters]
                    .reverse()
                    .map((character) =>
                        isSharedPage ? (
                            <CharacterSharedItem
                                key={character.id}
                                user={character.user}
                                character={character}
                            />
                        ) : (
                            <CharacterItem
                                key={character.id}
                                user={user}
                                character={character}
                            />
                        ),
                    )}
            </div>
        </>
    );
}
