import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Form, Head } from '@inertiajs/react';

export default function Edit({ character, items }) {
    return (
        <>
            <Head>
                <title>Character Edit Form</title>
                <meta
                    name="description"
                    content="Edit your FantasyRealm character"
                />
            </Head>

            <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background px-6 py-[2rem] md:p-10">
                <div className="w-full max-w-sm">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col items-center gap-4">
                            <div className="space-y-2 text-center">
                                <h1 className="text-xl font-medium">
                                    Edit Character
                                </h1>
                                <p className="text-center text-sm text-muted-foreground">
                                    Edit your characters details bellow
                                </p>
                            </div>
                        </div>

                        <Form
                            action={`/characters/${character.id}`}
                            method="patch"
                            disableWhileProcessing
                            className="flex flex-col gap-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="image">Image</Label>
                                            <Input
                                                id="image"
                                                type="file"
                                                autoFocus
                                                tabIndex={1}
                                                name="image"
                                            />
                                            <InputError
                                                message={errors.name}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                required
                                                autoFocus
                                                tabIndex={2}
                                                autoComplete="name"
                                                name="name"
                                                placeholder="Character Name"
                                                defaultValue={character.name}
                                            />
                                            <InputError
                                                message={errors.name}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="gender">
                                                Gender
                                            </Label>
                                            <Input
                                                id="gender"
                                                type="text"
                                                required
                                                tabIndex={3}
                                                autoComplete="gender"
                                                name="gender"
                                                placeholder="Character Gender"
                                                defaultValue={character.gender}
                                            />
                                            <InputError
                                                message={errors.gender}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="skin_color">
                                                Skin Color
                                            </Label>
                                            <Input
                                                id="skin_color"
                                                type="text"
                                                required
                                                tabIndex={4}
                                                name="skin_color"
                                                placeholder="Character Skin Color"
                                                defaultValue={
                                                    character.skin_color
                                                }
                                            />
                                            <InputError
                                                message={errors.skin_color}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="eye_color">
                                                Eye Color
                                            </Label>
                                            <Input
                                                id="eye_color"
                                                type="text"
                                                required
                                                tabIndex={5}
                                                name="eye_color"
                                                placeholder="Character Eye Color"
                                                defaultValue={
                                                    character.eye_color
                                                }
                                            />
                                            <InputError
                                                message={errors.eye_color}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="eye_shape">
                                                Eye Shape
                                            </Label>
                                            <Input
                                                id="eye_shape"
                                                type="text"
                                                required
                                                tabIndex={6}
                                                name="eye_shape"
                                                placeholder="Character Eye Shape"
                                                defaultValue={
                                                    character.eye_shape
                                                }
                                            />
                                            <InputError
                                                message={errors.eye_shape}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="hair_color">
                                                Hair Color
                                            </Label>
                                            <Input
                                                id="hair_color"
                                                type="text"
                                                required
                                                tabIndex={7}
                                                name="hair_color"
                                                placeholder="Character Hair Color"
                                                defaultValue={
                                                    character.hair_color
                                                }
                                            />
                                            <InputError
                                                message={errors.hair_color}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="nose_shape">
                                                Nose Shape
                                            </Label>
                                            <Input
                                                id="nose_shape"
                                                type="text"
                                                required
                                                tabIndex={8}
                                                name="nose_shape"
                                                placeholder="Character Nose Shape"
                                                defaultValue={
                                                    character.nose_shape
                                                }
                                            />
                                            <InputError
                                                message={errors.nose_shape}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="mouth_shape">
                                                Mouth Shape
                                            </Label>
                                            <Input
                                                id="mouth_shape"
                                                type="text"
                                                required
                                                tabIndex={9}
                                                name="mouth_shape"
                                                placeholder="Character Mouth Shape"
                                                defaultValue={
                                                    character.mouth_shape
                                                }
                                            />
                                            <InputError
                                                message={errors.mouth_shape}
                                                className="mt-2"
                                            />
                                        </div>

                                        <h2 className="font-bold">Items</h2>
                                        {items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex items-center space-x-3"
                                            >
                                                <Checkbox
                                                    id={item.name}
                                                    name={`items[${item.name}]`}
                                                    defaultChecked={character.items.some(
                                                        (characterItem) =>
                                                            characterItem.id ===
                                                            item.id,
                                                    )}
                                                />
                                                <Label htmlFor={item.name}>
                                                    {item.name}
                                                </Label>
                                            </div>
                                        ))}

                                        {errors.validation && (
                                            <div className="text-red-400">
                                                {errors.validation}
                                            </div>
                                        )}

                                        <Button
                                            type="submit"
                                            className="mt-2 w-full"
                                            tabIndex={10}
                                            data-test="create-character-button"
                                        >
                                            {processing && <Spinner />}
                                            Edit
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}
