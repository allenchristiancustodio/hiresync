import { Button } from "@/components/ui/button";
import {
  SignedOut,
  SignInButton,
  SignUpButton,
  SignedIn,
  UserButton,
  SignInWithMetamaskButton,
} from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="m-10">
      <SignInButton></SignInButton>
    </div>
  );
}
