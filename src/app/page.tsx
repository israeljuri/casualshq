import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-5 space-y-8">
      <section className="grid gap-4">
        <h1 className="text-3xl">Main On-Boarding Screens</h1>
        <ul>
          <li>
            <Link href="/sign-up" className="underline hover:text-blue-500">
              Sign Up (Flow) ✅
            </Link>
          </li>
          <li>
            <Link href="/sign-in" className="underline hover:text-blue-500">
              Sign In ✅
            </Link>
          </li>
          <li>
            <Link
              href="/forgot-password"
              className="underline hover:text-blue-500"
            >
              Forgot Password ✅
            </Link>
          </li>
          <li>
            <Link
              href="/reset-password?token=this_is_a_token"
              className="underline hover:text-blue-500"
            >
              Reset Password ✅
            </Link>
          </li>
        </ul>
      </section>

      <section className="grid gap-4">
        <h1 className="text-3xl">Staff Screens</h1>
        <ul>
          <li>
            <Link
              href="/staff/sign-in"
              className="underline hover:text-blue-500"
            >
              Sign In (Staff search) ✅
            </Link>
          </li>
          <li>
            <Link
              href="/staff/onboarding/?token=1"
              className="underline hover:text-blue-500"
            >
              Onboarding (Flow) ✅
            </Link>
          </li>
          <li>
            <Link href="/staff" className="underline hover:text-blue-500">
              Dashboard ✅
            </Link>
          </li>
        </ul>
      </section>

      <section className="grid gap-4">
        <h1 className="text-3xl">Admin Screens</h1>
        <ul>
          {/* <li>
            <Link
              href="/staff/sign-in"
              className="underline hover:text-blue-500"
            >
              Sign In (Staff search) ✅
            </Link>
          </li> */}
        </ul>
      </section>
    </main>
  );
}
