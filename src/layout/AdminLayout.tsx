import React, { ReactNode } from 'react'
import { Navigation } from '@/navigation/Navigation'

interface ComponentProps {
    children: ReactNode
}

export const AdminLayout: React.FC<ComponentProps> = ({ children }) => {
    return (
        <>
            <Navigation />
            <div className="flex p-8">{children}</div>
        </>
    )
}
