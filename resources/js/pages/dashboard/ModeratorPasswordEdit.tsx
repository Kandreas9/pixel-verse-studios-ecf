import SecurityController from '@/actions/App/Http/Controllers/Settings/SecurityController';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Form, Head } from '@inertiajs/react';

export default function ModeratorPasswordEdit({ passwordRules, moderator }) {
    return (
        <>
            <Head title="Dashboard - Moderator Password Edit Form" />

            <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background px-6 py-[2rem] md:p-10">
                <div className="space-y-2 text-center">
                    <h1 className="text-xl font-medium">
                        Moderator Password Edit Form
                    </h1>
                    <p className="text-center text-sm text-muted-foreground">
                        Enter the details bellow to edit a moderators password
                    </p>
                </div>

                <Form
                    action={`/dashboard/moderators/${moderator.id}/password`}
                    method="patch"
                    options={{
                        preserveScroll: true,
                    }}
                    resetOnError={['password', 'password_confirmation']}
                    resetOnSuccess
                    className="space-y-6"
                >
                    {({ errors, processing }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="password">New password</Label>

                                <PasswordInput
                                    id="password"
                                    name="password"
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    placeholder="New password"
                                    passwordrules={passwordRules}
                                />

                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    Confirm password
                                </Label>

                                <PasswordInput
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    placeholder="Confirm password"
                                    passwordrules={passwordRules}
                                />

                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button
                                    className="mt-2 w-full"
                                    disabled={processing}
                                    data-test="update-password-button"
                                >
                                    Save
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}
