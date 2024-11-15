import Image from "next/image";
import { Button } from "../components/buttons/Button";
import Link from "next/link";

export default function Profile() {
  return (
    <div className=" w-64 h-40 shadow-sm shadow-gray-600 top-16 absolute right-28">
      <div className="p-4 flex flex-col gap-4">
        <div className="userimageandname flex items-center gap-4">
          <Image
            src="/images/user.jpeg"
            alt="user"
            height={50}
            width={50}
            className="rounded-full border-[1px] p-1 h-[60px] w-[60px]"
          />
          <h4 className="font-medium">Rahman khattak</h4>
        </div>

        <Link href={"/view-profile"} >
          <Button size="xs" as="a" variant="outline">
            View Profile
          </Button>
        </Link>
      </div>
    </div>
  );
}
