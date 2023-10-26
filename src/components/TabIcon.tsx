import {ReactNode} from 'react'
function TabIcon({ icon, iconText }: { icon: ReactNode; iconText?: string }) {
    return (
        <div className="flex items-center gap-1">
            <span className="text-xl">{icon}</span>
            {iconText}
        </div>
    );
}
export default TabIcon