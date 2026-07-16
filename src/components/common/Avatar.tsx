import * as LucideIcons from "lucide-react";

export interface AvatarConfig {
    bgColor: string;
    icon: string; // lucide-react ikon adı, örn. "Cat", "Star", "Heart"
}

interface AvatarProps {
    config: AvatarConfig | null;
    email: string;
    size?: number;
}

function Avatar({ config, email, size = 32 }: AvatarProps) {

    if (!config) {

        return (
            <img
                src={`https://www.gravatar.com/avatar/${email.trim().toLowerCase()}?d=identicon&s=${size}`}
                alt="avatar"
                className="rounded-full"
                style={{ width: size, height: size }}
            />
        );
    }

    const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[config.icon];

    return (
        <div
            className="rounded-full flex items-center justify-center"
            style={{ backgroundColor: config.bgColor, width: size, height: size }}
        >
            {IconComponent && <IconComponent size={size * 0.6} className="text-white" />}
        </div>
    );
}

export default Avatar;