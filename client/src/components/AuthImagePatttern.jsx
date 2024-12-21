function AuthImagePatttern({ title, subtitle }) {
    return (
        <div className="hidden lg:flex items-center justify-center p-12">
            <div className="max-w-md text-center">
                <div className="grid grid-cols-4 gap-3 mb-8">
                    {[...Array(16)].map((_, i) => (
                        <div
                            key={i}
                            className={`aspect-square rounded-2xl bg-gray-700 ${i % 3 == 0 ? "animate-pulse" : ""}`}
                        >
                        </div>
                    ))}
                </div>
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <p className="text-gray-300">{subtitle}</p>
            </div>
        </div>
    )
}

export default AuthImagePatttern
