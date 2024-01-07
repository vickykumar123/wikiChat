import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function ChatPermissionError() {
  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4 text-red-500" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="flex">
        <p className="flex-1 font-semibold">
          No such room or you dont have permission to access it.
        </p>
        <Link href="/chat" replace>
          <Button variant={"destructive"}>Dismiss</Button>
        </Link>
      </AlertDescription>
    </Alert>
  );
}
