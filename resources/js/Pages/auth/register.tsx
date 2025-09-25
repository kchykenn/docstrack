import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLogoIconBG from '@/components/app-logo-icon-bg';
import AppLogoDOH from '@/components/app-logo-assess_doh';
import AppLogoBP from '@/components/app-logo-assess_bp';
import AppLogoMental from '@/components/app-logo-assess_mental';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/register', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Background */}
            <AppLogoIconBG className="absolute inset-0 w-full h-full object-cover opacity-100 z-0" />
            <div className="absolute inset-0 bg-black/60 z-[1]" />

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
                {/* Combined Card */}
                <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-lg w-full max-w-4xl overflow-hidden">

                    {/* Logo Side */}
                    <div className="w-full lg:w-1/2 p-6 flex flex-col items-center justify-between text-center">
                        {/* Logos */}
                        {/* Text */}
                        <div>
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <AppLogoDOH />
                                <AppLogoBP />
                            </div>
                            <h3 className="text-xl font-bold text-green-700">DEPARTMENT OF HEALTH</h3>
                            <p className="text-lg text-gray-700 font-bold">eMental Health System</p>
                            <div className="mt-4">
                                <AppLogoMental />
                            </div>
                            {/* Version */}
                            <div className="text-xs text-gray-500 italic mt-4">Version 1.0</div>
                        </div>
                    </div>

                    {/* Separator */}
                    <div className="hidden lg:block w-px bg-black/20" />

                    {/* Register Form Side */}
                    <div className="w-full lg:w-1/2 p-6 flex flex-col justify-center">
                        <Head title="Register" />

                        {/* Heading with icons */}
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <span className="text-2xl font-extrabold bg-gradient-to-r from-green-600 via-yellow-400 to-green-600 bg-clip-text text-transparent">
                                REGISTER ACCOUNT
                            </span>
                        </div>

                        {/* Alert message */}
                        <div className="mb-6 p-4 rounded-md bg-yellow-100 border border-yellow-400 text-yellow-700 text-sm text-center">
                            Registration is disabled. Please contact your system administrator to create an account.
                        </div>

                        <form className="flex flex-col gap-6" onSubmit={submit}>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Full name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        disabled
                                        placeholder="Full name"
                                        className="bg-gray-100 text-gray-500 placeholder-gray-400"
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        disabled
                                        placeholder="email@example.com"
                                        className="bg-gray-100 text-gray-500 placeholder-gray-400"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        tabIndex={3}
                                        autoComplete="new-password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        disabled
                                        placeholder="Password"
                                        className="bg-gray-100 text-gray-500 placeholder-gray-400"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">Confirm password</Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        required
                                        tabIndex={4}
                                        autoComplete="new-password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        disabled
                                        placeholder="Confirm password"
                                        className="bg-gray-100 text-gray-500 placeholder-gray-400"
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>

                                <Button
                                    type="submit"
                                    className="mt-2 w-full opacity-50 cursor-not-allowed"
                                    tabIndex={5}
                                    disabled
                                >
                                    Create account
                                </Button>
                            </div>

                            <div className="text-muted-foreground text-center text-sm mt-4">
                                Already have an account?{' '}
                                <TextLink href="/login" tabIndex={6}>
                                    Log in
                                </TextLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
