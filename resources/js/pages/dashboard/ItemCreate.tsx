import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Form, Head } from '@inertiajs/react';

export default function ItemCreate() {
    return (
        <>
            <Head title="Dashboard - Item Creation Form" />

            <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background px-6 py-[2rem] md:p-10">
                <div className="w-full max-w-sm">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col items-center gap-4">
                            <div className="space-y-2 text-center">
                                <h1 className="text-xl font-medium">
                                    Item Creation
                                </h1>
                                <p className="text-center text-sm text-muted-foreground">
                                    Enter item details bellow
                                </p>
                            </div>
                        </div>

                        <Form
                            action="/dashboard/items"
                            method="post"
                            disableWhileProcessing
                            className="flex flex-col gap-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="name"
                                                name="name"
                                                placeholder="Item Name"
                                            />
                                            <InputError
                                                message={errors.name}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="type">Type</Label>
                                            <Input
                                                id="type"
                                                type="text"
                                                required
                                                tabIndex={2}
                                                name="type"
                                                placeholder="Item Type"
                                            />
                                            <InputError
                                                message={errors.gender}
                                                className="mt-2"
                                            />
                                        </div>

                                        {errors.validation && (
                                            <div className="text-red-400">
                                                {errors.validation}
                                            </div>
                                        )}

                                        <Button
                                            type="submit"
                                            className="mt-2 w-full"
                                            tabIndex={9}
                                            data-test="create-item-button"
                                        >
                                            {processing && <Spinner />}
                                            Create
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
