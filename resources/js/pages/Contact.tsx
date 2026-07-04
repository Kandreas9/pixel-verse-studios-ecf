import AppLogoIcon from '@/components/app-logo-icon';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { TextArea } from '@/components/ui/text-area';
import { home } from '@/routes';
import { Form, Head, Link, usePage } from '@inertiajs/react';

export default function Contact() {
    const { auth } = usePage().props;

    return (
        <>
            <Head>
                <title>Contact</title>
                <meta
                    name="description"
                    content="Contact PixelVerse Studios with any inquires"
                />
            </Head>

            <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col items-center gap-4">
                            <div className="space-y-2 text-center">
                                <h1 className="text-xl font-medium">Contact</h1>
                                <p className="text-center text-sm text-muted-foreground">
                                    Enter your details bellow to contact us
                                </p>
                            </div>
                        </div>

                        <Form
                            action="/contact"
                            method="post"
                            disableWhileProcessing
                            resetOnSuccess={['details']}
                            className="flex flex-col gap-6"
                        >
                            {({ processing, errors, recentlySuccessful }) => (
                                <>
                                    <div className="grid gap-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="email"
                                                name="email"
                                                placeholder="email@example.com"
                                                defaultValue={
                                                    auth.user && auth.user.email
                                                }
                                            />
                                            <InputError
                                                message={errors.email}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="name">
                                                Username
                                            </Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                required
                                                tabIndex={2}
                                                autoComplete="name"
                                                name="name"
                                                placeholder="Full Name"
                                                defaultValue={
                                                    auth.user && auth.user.name
                                                }
                                            />
                                            <InputError
                                                message={errors.name}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="details">
                                                Contact Details
                                            </Label>
                                            <TextArea
                                                id="details"
                                                required
                                                tabIndex={3}
                                                autoComplete="details"
                                                name="details"
                                                placeholder="Contact Details"
                                            />
                                            <InputError
                                                message={errors.details}
                                                className="mt-2"
                                            />
                                        </div>

                                        {recentlySuccessful && (
                                            <div className="text-green-400">
                                                Your message has been sent
                                            </div>
                                        )}

                                        {errors.validation && (
                                            <div className="text-red-400">
                                                {errors.validation}
                                            </div>
                                        )}

                                        <Button
                                            type="submit"
                                            className="mt-2 w-full"
                                            tabIndex={4}
                                            data-test="contact-button"
                                        >
                                            {processing && <Spinner />}
                                            Contact
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
