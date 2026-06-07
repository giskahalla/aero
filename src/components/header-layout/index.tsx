

export default function HeaderLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex justify-between items-center">
            {children}
        </div>
    )
}