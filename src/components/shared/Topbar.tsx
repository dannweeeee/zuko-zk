import Image from "next/image";
import Link from "next/link";

function Topbar() {
    return (
        <nav className="topbar">
            <Link href="/" className="flex items-center gap-4">
                <Image src="/assets/logo-name.png" alt="logo" width={110} height={110} />
            </Link>

            <div className="flex items-center gap-1">
                <div className="block md:hidden">
                </div>
            </div>
        </nav>
    )
}

export default Topbar;