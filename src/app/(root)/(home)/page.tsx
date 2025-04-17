"use client";

import ActionCard from "@/components/ActionCard";
import { QUICK_ACTIONS } from "@/constants";
import { useUserRole } from "@/hooks/useUserRole";
import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import MeetingModal from "@/components/MeetingModal";
import LoaderUI from "@/components/LoaderUI";
import { Loader2Icon } from "lucide-react";
import MeetingCard from "@/components/MeetingCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function Home() {
  const router = useRouter();

  const { isInterviewer, isCandidate, isLoading } = useUserRole();
  const interviews = useQuery(api.interviews.getMyInterviews);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"start" | "join">();

  const handleQuickAction = (title: string) => {
    switch (title) {
      case "New Call":
        setModalType("start");
        setShowModal(true);
        break;
      case "Join Interview":
        setModalType("join");
        setShowModal(true);
        break;
      default:
        router.push(`/${title.toLowerCase()}`);
    }
  };

  if (isLoading) return <LoaderUI />;

  return (
    <div className="container max-w-7xl mx-auto p-6">
      {/* HERO SECTION */}
      <section className="text-center py-16 bg-gradient-to-r from-black-50 to-black-50 rounded-xl mb-12 shadow-md">
        <h1 className="text-5xl font-bold text-amber-700">
          Welcome to Hiresync
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          A modern interview platform where candidates can showcase their coding
          skills in real-time, while interviewers evaluate, assist, and
          collaborate effortlessly.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button
            onClick={() => handleQuickAction("New Call")}
            className=" bg-amber-600 hover:bg-amber-700"
          >
            Start Interview
          </Button>
          <Button
            variant="outline"
            onClick={() => handleQuickAction("Join Interview")}
          >
            Join Interview
          </Button>
        </div>
      </section>

      {/* FEATURE HIGHLIGHTS SECTION */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Why Hiresync?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Real-Time Code Collaboration</CardTitle>
              <CardDescription>
                Built-in code editor and problem solving in sync.
              </CardDescription>
            </CardHeader>
            <CardContent>
              Interviewers can see and interact with the candidate’s code in
              real time.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Seamless Video/Audio Calls</CardTitle>
              <CardDescription>No need for third-party apps.</CardDescription>
            </CardHeader>
            <CardContent>
              Integrated calling ensures everything happens in one place.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Interview Scheduling</CardTitle>
              <CardDescription>
                Manage and track interviews easily.
              </CardDescription>
            </CardHeader>
            <CardContent>
              Organize interviews with reminders and role-based access.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* WELCOME SECTION */}
      <div className="rounded-lg bg-card p-6 border shadow-sm mb-10">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
          Welcome back!
        </h2>
        <p className="text-muted-foreground mt-2">
          {isInterviewer
            ? "Manage your interviews and review candidates effectively"
            : "Access your upcoming interviews and preparations"}
        </p>
      </div>

      {isInterviewer ? (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {QUICK_ACTIONS.map((action) => (
              <ActionCard
                key={action.title}
                action={action}
                onClick={() => handleQuickAction(action.title)}
              />
            ))}
          </div>

          <MeetingModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={modalType === "join" ? "Join Meeting" : "Start Meeting"}
            isJoinMeeting={modalType === "join"}
          />
        </>
      ) : (
        <>
          <div>
            <h2 className="text-3xl font-bold">Your Interviews</h2>
            <p className="text-muted-foreground mt-1">
              View and join your scheduled interviews
            </p>
          </div>

          <div className="mt-8">
            {interviews === undefined ? (
              <div className="flex justify-center py-12">
                <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : interviews.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {interviews.map((interview) => (
                  <MeetingCard key={interview._id} interview={interview} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                You have no scheduled interviews at the moment
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
