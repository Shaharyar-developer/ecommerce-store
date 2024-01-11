"use client";
import { Card, CardContent } from "./ui/card";
export default function Footer() {
  return (
    <footer className="">
      <Card className="rounded-none w-full bg-primary text-background">
        <CardContent className="grid text-lg grid-cols-2 relative justify-items-center ">
          <div className="mt-5">
            <p>
              This website was made with{" "}
              <span className="font-bold">NextJs</span>, styled with{" "}
              <span className="font-bold">Tailwindcss</span> and deployed on{" "}
              <span className="font-bold">Vercel</span>.
            </p>
          </div>
          <span className="h-full absolute left-1/2 -translate-x-1/2 w-[1px] bg-background"></span>
          <div className=" mt-5">
            Contact Me{" "}
            <a href="" className="underline font-bold">
              Here
            </a>
          </div>
        </CardContent>
      </Card>
    </footer>
  );
}
