import React, { useEffect, FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLogoIconBG from '@/components/app-logo-icon-bg';
import AppLogoDOH from '@/components/app-logo-assess_doh';
import AppLogoBP from '@/components/app-logo-assess_bp';
import AppLogoIconDocs from '@/components/app-logo-assess_mental';

/* ✅ Declare custom HTML elements for TypeScript */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'df-messenger': any;
      'df-messenger-chat-bubble': any;
    }
  }
}

type LoginForm = {
  email: string;
  password: string;
  remember: boolean;
};

interface LoginProps {
  status?: string;
  canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
  const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
    email: '',
    password: '',
    remember: false,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post('/login', {
      onFinish: () => reset('password'),
    });
  };

  /* ✅ Load Dialogflow Messenger script dynamically */
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Head title="Log in">
        <link
          rel="stylesheet"
          href="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css"
        />
        <style>{`
          df-messenger {
            z-index: 999;
            position: fixed;
            --df-messenger-font-color: #000;
            --df-messenger-font-family: 'Google Sans';
            --df-messenger-chat-background: #f3f6fc;
            --df-messenger-message-user-background: #d3e3fd;
            --df-messenger-message-bot-background: #fff;
            bottom: 16px;
            right: 16px;
          }
        `}</style>
      </Head>

      {/* ✅ Dialogflow Messenger widget */}
      <df-messenger
        location="us-central1"
        project-id="doh-chd-caraga"
        agent-id="248ba00b-0205-4326-abb5-bf269704b62e"
        language-code="en"
        max-query-length="-1"
      >
        <df-messenger-chat-bubble chat-title="eDTrack AI Assistance"></df-messenger-chat-bubble>
      </df-messenger>

      {/* ✅ Login Page Layout */}
      <div className="relative min-h-screen w-full overflow-hidden">
        {/* Background */}
        <AppLogoIconBG className="absolute inset-0 w-full h-full object-cover opacity-100 z-0" />
        <div className="absolute inset-0 bg-black/40 z-[1]" />

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
          <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-lg w-full max-w-4xl overflow-hidden">
            {/* Left Panel - Logos */}
            <div className="w-full lg:w-1/2 p-6 flex flex-col items-center justify-between text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <AppLogoDOH />
                <AppLogoBP />
              </div>

              <div>
                <h3 className="text-xl font-bold text-green-700">DEPARTMENT OF HEALTH</h3>
                <p className="text-lg text-gray-700 font-bold">CHD CARAGA REGION</p>
                <p className="text-lg text-gray-700 font-bold">eDTrack System</p>
                <div className="mt-4">
                  <AppLogoIconDocs />
                </div>
              </div>

              <div className="text-xs text-gray-500 italic mt-4">Version 1.0</div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px bg-black/20" />

            {/* Right Panel - Login Form */}
            <div className="w-full lg:w-1/2 p-6 flex flex-col justify-center">
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="text-4xl font-extrabold bg-gradient-to-r from-green-600 via-yellow-400 to-green-600 bg-clip-text text-transparent">
                  LOGIN
                </span>
              </div>

              <p className="text-sm text-center text-gray-600 mb-6">
                Enter your email and password to access your account.
              </p>

              <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      autoFocus
                      tabIndex={1}
                      autoComplete="email"
                      value={data.email}
                      onChange={(e) => setData('email', e.target.value)}
                      placeholder="email@example.com"
                      className="bg-white text-black placeholder-gray-400"
                    />
                    <InputError message={errors.email} />
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      {canResetPassword && (
                        <TextLink href="/forgot-password" className="ml-auto text-xs text-black" tabIndex={5}>
                          Forgot password?
                        </TextLink>
                      )}
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      tabIndex={2}
                      autoComplete="current-password"
                      value={data.password}
                      onChange={(e) => setData('password', e.target.value)}
                      placeholder="Password"
                      className="bg-white text-black placeholder-gray-400"
                    />
                    <InputError message={errors.password} />
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="remember"
                      name="remember"
                      checked={data.remember}
                      onClick={() => setData('remember', !data.remember)}
                      tabIndex={3}
                    />
                    <Label htmlFor="remember">Remember me</Label>
                  </div>

                  <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                    Log in
                  </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm mt-4">
                  Don't have an account?{' '}
                  <TextLink href="/register" tabIndex={5}>
                    Sign up
                  </TextLink>
                </div>
              </form>

              {status && <div className="mt-4 text-center text-sm font-medium text-green-600">{status}</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
