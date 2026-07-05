import CharacterItem from './CharacterItem';

export default function CharacterList({ user, characters }) {
    return (
        <>
            <div className="flex flex-col gap-4">
                {[...characters].reverse().map((character) => (
                    <CharacterItem
                        key={character.id}
                        user={user}
                        character={character}
                    />
                ))}
            </div>
        </>
    );
}
