import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Accountability Court
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Select your role to continue
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    <Button asChild className="h-12 w-full text-lg" variant="default">
                        <Link href="/facilitator/login">
                            Facilitator Access
                        </Link>
                    </Button>
                    <Button asChild className="h-12 w-full text-lg" variant="outline">
                        <Link href="/participant/login">
                            Participant Portal
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
