import Link from "next/link";
import Image from "next/image";
import errorImg from "@/assets/images/404.svg";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="relative w-full max-w-[500px] mb-8">
        <Image
          src={errorImg}
          alt="404 Error"
          width={500}
          height={350}
          className="mx-auto"
        />
      </div>
      <h1 className="text-[40px] font-black text-[#1A1A1A] mb-4">
        Page Not Found
      </h1>
      <p className="max-w-md text-gray-500 text-lg mb-10 leading-relaxed font-medium">
        Oops! The page you are looking for doesn't exist or has been moved.
        Let's get you back on track.
      </p>
      <Link
        href="/"
        className="px-10 py-4 bg-[#00B207] text-white rounded-xl font-black shadow-lg shadow-[#00B207]/20 hover:bg-[#009606] transition-all active:scale-95"
      >
        Go Back Home
      </Link>
    </main>
  );
}
