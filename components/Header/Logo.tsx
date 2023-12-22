import Link from "next/link";
import { AspectRatio } from "../ui/aspect-ratio";

export default function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center w-[250px] h-14 m-2">
        <AspectRatio
          ratio={16 / 9}
          className="flex items-center justify-center"
        >
          <h2 className="font-mono text-4xl font-bold dark:filter dark:text-white">
            wikiChat
          </h2>
        </AspectRatio>
      </div>
    </Link>
  );
}
