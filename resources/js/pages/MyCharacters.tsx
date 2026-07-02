export default function MyCharacters({characters}) {
    return (
        <>
            { characters.map((character) => {
                return <div>{character.name}</div>
            })}
        </>
    );
}
