'use client';

import { SignUp, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignUpPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  // Redirect signed-in users to homepage
  useEffect(() => {
    if (isSignedIn) {
      router.push('/'); // redirect to homepage
    }
  }, [isSignedIn]);

  return <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />;
}
