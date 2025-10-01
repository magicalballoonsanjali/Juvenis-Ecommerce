'use client';

import { SignIn, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignInPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Once Clerk is loaded and user is signed in, redirect to home
    if (isLoaded && isSignedIn) {
      router.replace('/'); 
    }
  }, [isLoaded, isSignedIn]);

  // Hide SignIn while loading or already signed in
  if (!isLoaded || isSignedIn) return null;

  return <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />;
}
