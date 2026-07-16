import * as LucideIcons from "lucide-react";
import type { AvatarConfig } from "./Avatar";

const COLORS = ["#23A6F0", "#E74C3C", "#2ECC71", "#F39C12", "#9B59B6", "#1ABC9C", "#34495E", "#E91E63"];
const ICONS = ["User", "Cat", "Dog", "Star", "Heart", "Smile", "Rocket", "Ghost"];

interface AvatarPickerProps {
    value: AvatarConfig;
    onChange: (config: AvatarConfig) => void;
}

function AvatarPicker({ value, onChange }: AvatarPickerProps) {

    return (
        <div className="flex flex-col gap-4">

            <div>
                <p className="text-sm font-medium mb-2">Renk</p>
                <div className="flex gap-2 flex-wrap">
                    {COLORS.map((color) => (
                        <button
                            key={color}
                            type="button"
                            onClick={() => onChange({ ...value, bgColor: color })}
                            className={`w-8 h-8 rounded-full border-2 ${value.bgColor === color ? "border-black" : "border-transparent"}`}
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
            </div>

            <div>
                <p className="text-sm font-medium mb-2">Simge</p>
                <div className="flex gap-2 flex-wrap">
                    {ICONS.map((iconName) => {
                        const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number }>>)[iconName];
                        return (
                            <button
                                key={iconName}
                                type="button"
                                onClick={() => onChange({ ...value, icon: iconName })}
                                className={`w-10 h-10 flex items-center justify-center rounded border-2
                                    ${value.icon === iconName ? "border-[#23A6F0] bg-blue-50" : "border-gray-200"}`}
                            >
                                {IconComponent && <IconComponent size={20} />}
                            </button>
                        );
                    })}
                </div>
            </div>

        </div>
    );
}

export default AvatarPicker;