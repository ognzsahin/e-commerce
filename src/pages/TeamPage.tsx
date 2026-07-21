import { User } from "lucide-react";
import oguz1 from "../assets/team/oguz1.jpg";
import fighter from "../assets/team/fighter.jpg";
import workintech1 from "../assets/team/workintech1.jpg";
import workintech2 from "../assets/team/workintech2.jpg";


interface TeamMember {
    id: number;
    name: string;
    role: string;
    photo?: string;
}

const teamMembers: TeamMember[] = [
    { id: 1, name: "Yalçın Çetinkaya", role: "Project Manager", photo: workintech1 },
    { id: 2, name: "Oğuz Şahin", role: "Full Stack Developer", photo: oguz1 },
    { id: 3, name: "Oğuz Şahin", role: "Frontend Developer", photo: fighter },
    { id: 4, name: "Workintech", role: "Backend Developer", photo: workintech2 },
];

function TeamPage() {
    return (
        <div className="max-w-[1200px] mx-auto px-[16px] py-[60px] flex flex-col gap-[48px]">

            <div className="flex flex-col items-center text-center gap-3">
                <h1 className="text-2xl font-bold text-[#252B42]">Ekibimiz</h1>
                <p className="text-[#737373] max-w-[500px]">
                    Bu projeyi hayata geçiren ekip üyelerimizle tanışın.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member) => (
                    <div
                        key={member.id}
                        className="flex flex-col items-center text-center gap-3 border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                        {member.photo ? (
                            <img
                                src={member.photo}
                                alt={member.name}
                                className="w-24 h-32 rounded-lg object-cover"
                            />
                        ) : (
                            <div className="w-24 h-32 rounded-lg bg-[#23A6F0] flex items-center justify-center">
                                <User size={40} className="text-white" />
                            </div>
                        )}
                        <h3 className="font-bold text-[#252B42]">{member.name}</h3>
                        <p className="text-sm text-[#737373]">{member.role}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default TeamPage;