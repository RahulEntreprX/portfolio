import Image from "next/image";
import { getProfile } from "@/data";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  const profile = getProfile();
  return (
    <div className="grid gap-8 md:grid-cols-[280px,1fr]">
      <div className="relative">
        <div className="glass rounded-full overflow-hidden w-64 h-64 mx-auto shadow-2xl backdrop-blur-xl border-0">
          <div className="relative w-full h-full group">
            <Image 
              src={profile.avatar} 
              alt={profile.name} 
              fill 
              className="object-cover scale-110 feather-mask transition-all duration-500 group-hover:scale-125" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">About</h1>
          <p className="mt-3 text-gray-700">{profile.bio}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Skills</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <li key={skill} className="px-3 py-1 rounded bg-gray-100 text-gray-800 text-sm">{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}


